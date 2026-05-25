// Auto-generated extension model for @swamp/gcp/compute/urlmaps
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine UrlMaps.
 *
 * Represents a URL Map resource. Compute Engine has two URL Map resources: * [Global](/compute/docs/reference/rest/v1/urlMaps) * [Regional](/compute/docs/reference/rest/v1/regionUrlMaps) A URL map resource is a component of certain types of cloud load balancers and Traffic Director: * urlMaps are used by global external Application Load Balancers, classic Application Load Balancers, and cross-region internal Application Load Balancers. * regionUrlMaps are used by internal Application Load Balancers, regional external Application Load Balancers and regional internal Application Load Balancers. For a list of supported URL map features by the load balancer type, see the Load balancing features: Routing and traffic management table. For a list of supported URL map features for Traffic Director, see the Traffic Director features: Routing and traffic management table. This resource defines mappings from hostnames and URL paths to either a backend service or a backend bucket. To use the global urlMaps resource, the backend service must have a loadBalancingScheme of either EXTERNAL,EXTERNAL_MANAGED, or INTERNAL_SELF_MANAGED. To use the regionUrlMaps resource, the backend service must have aloadBalancingScheme of INTERNAL_MANAGED. For more information, read URL Map Concepts.
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
  "id": "compute.urlMaps.get",
  "path": "projects/{project}/global/urlMaps/{urlMap}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "urlMap",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "urlMap": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.urlMaps.insert",
  "path": "projects/{project}/global/urlMaps",
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
  "id": "compute.urlMaps.update",
  "path": "projects/{project}/global/urlMaps/{urlMap}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "urlMap",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "urlMap": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.urlMaps.delete",
  "path": "projects/{project}/global/urlMaps/{urlMap}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "urlMap",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "urlMap": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.urlMaps.list",
  "path": "projects/{project}/global/urlMaps",
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
  defaultCustomErrorResponsePolicy: z.object({
    errorResponseRules: z.array(z.object({
      matchResponseCodes: z.array(z.string()).describe(
        "Valid values include: - A number between 400 and 599: For example 401 or 503, in which case the load balancer applies the policy if the error code exactly matches this value. - 5xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 500 to 599. - 4xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 400 to 499. Values must be unique within matchResponseCodes and across allerrorResponseRules ofCustomErrorResponsePolicy.",
      ).optional(),
      overrideResponseCode: z.number().int().describe(
        "The HTTP status code returned with the response containing the custom error content. If overrideResponseCode is not supplied, the same response code returned by the original backend bucket or backend service is returned to the client.",
      ).optional(),
      path: z.string().describe(
        "The full path to a file within backendBucket. For example:/errors/defaultError.html path must start with a leading slash. path cannot have trailing slashes. If the file is not available in backendBucket or the load balancer cannot reach the BackendBucket, a simpleNot Found Error is returned to the client. The value must be from 1 to 1024 characters",
      ).optional(),
    })).describe(
      "Specifies rules for returning error responses. In a given policy, if you specify rules for both a range of error codes as well as rules for specific error codes then rules with specific error codes have a higher priority. For example, assume that you configure a rule for 401 (Un-authorized) code, and another for all 4 series error codes (4XX). If the backend service returns a401, then the rule for 401 will be applied. However if the backend service returns a 403, the rule for4xx takes effect.",
    ).optional(),
    errorService: z.string().describe(
      "The full or partial URL to the BackendBucket resource that contains the custom error content. Examples are: - https://www.googleapis.com/compute/v1/projects/project/global/backendBuckets/myBackendBucket - compute/v1/projects/project/global/backendBuckets/myBackendBucket - global/backendBuckets/myBackendBucket If errorService is not specified at lower levels likepathMatcher, pathRule and routeRule, an errorService specified at a higher level in theUrlMap will be used. IfUrlMap.defaultCustomErrorResponsePolicy contains one or moreerrorResponseRules[], it must specifyerrorService. If load balancer cannot reach the backendBucket, a simple Not Found Error will be returned, with the original response code (oroverrideResponseCode if configured). errorService is not supported for internal or regionalHTTP/HTTPS load balancers.",
    ).optional(),
  }).describe(
    "Specifies the custom error response policy that must be applied when the backend service or backend bucket responds with an error.",
  ).optional(),
  defaultRouteAction: z.object({
    corsPolicy: z.object({
      allowCredentials: z.boolean().describe(
        "In response to a preflight request, setting this to true indicates that the actual request can include user credentials. This field translates to the Access-Control-Allow-Credentials header. Default is false.",
      ).optional(),
      allowHeaders: z.array(z.string()).describe(
        "Specifies the content for the Access-Control-Allow-Headers header.",
      ).optional(),
      allowMethods: z.array(z.string()).describe(
        "Specifies the content for the Access-Control-Allow-Methods header.",
      ).optional(),
      allowOriginRegexes: z.array(z.string()).describe(
        "Specifies a regular expression that matches allowed origins. For more information, see regular expression syntax. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes. Regular expressions can only be used when the loadBalancingScheme is set to INTERNAL_SELF_MANAGED.",
      ).optional(),
      allowOrigins: z.array(z.string()).describe(
        "Specifies the list of origins that is allowed to do CORS requests. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes.",
      ).optional(),
      disabled: z.boolean().describe(
        "If true, disables the CORS policy. The default value is false, which indicates that the CORS policy is in effect.",
      ).optional(),
      exposeHeaders: z.array(z.string()).describe(
        "Specifies the content for the Access-Control-Expose-Headers header.",
      ).optional(),
      maxAge: z.number().int().describe(
        "Specifies how long results of a preflight request can be cached in seconds. This field translates to the Access-Control-Max-Age header.",
      ).optional(),
    }).describe(
      "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard.",
    ).optional(),
    faultInjectionPolicy: z.object({
      abort: z.object({
        httpStatus: z.number().int().describe(
          "The HTTP status code used to abort the request. The value must be from 200 to 599 inclusive. For gRPC protocol, the gRPC status code is mapped to HTTP status code according to this mapping table. HTTP status 200 is mapped to gRPC status UNKNOWN. Injecting an OK status is currently not supported by Traffic Director.",
        ).optional(),
        percentage: z.number().describe(
          "The percentage of traffic for connections, operations, or requests that is aborted as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
        ).optional(),
      }).describe(
        "Specification for how requests are aborted as part of fault injection.",
      ).optional(),
      delay: z.object({
        fixedDelay: z.object({
          nanos: z.number().int().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.string().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        percentage: z.number().describe(
          "The percentage of traffic for connections, operations, or requests for which a delay is introduced as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
        ).optional(),
      }).describe(
        "Specifies the delay introduced by the load balancer before forwarding the request to the backend service as part of fault injection.",
      ).optional(),
    }).describe(
      "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by the load balancer on a percentage of requests before sending those request to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.",
    ).optional(),
    maxStreamDuration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    requestMirrorPolicy: z.object({
      backendService: z.string().describe(
        "The full or partial URL to the BackendService resource being mirrored to. The backend service configured for a mirroring policy must reference backends that are of the same type as the original backend service matched in the URL map. Serverless NEG backends are not currently supported as a mirrored backend service.",
      ).optional(),
      mirrorPercent: z.number().describe(
        "The percentage of requests to be mirrored to `backend_service`.",
      ).optional(),
    }).describe(
      "A policy that specifies how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer doesn't wait for responses from the shadow service. Before sending traffic to the shadow service, the host or authority header is suffixed with-shadow.",
    ).optional(),
    retryPolicy: z.object({
      numRetries: z.number().int().describe(
        "Specifies the allowed number retries. This number must be > 0. If not specified, defaults to 1.",
      ).optional(),
      perTryTimeout: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
      ).optional(),
      retryConditions: z.array(z.string()).describe(
        "Specifies one or more conditions when this retry policy applies. Valid values are: - 5xx: retry is attempted if the instance or endpoint responds with any 5xx response code, or if the instance or endpoint does not respond at all. For example, disconnects, reset, read timeout, connection failure, and refused streams. - gateway-error: Similar to 5xx, but only applies to response codes 502, 503 or504. - connect-failure: a retry is attempted on failures connecting to the instance or endpoint. For example, connection timeouts. - retriable-4xx: a retry is attempted if the instance or endpoint responds with a 4xx response code. The only error that you can retry is error code 409. - refused-stream: a retry is attempted if the instance or endpoint resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: a retry is attempted if the gRPC status code in the response header is set to cancelled. - deadline-exceeded: a retry is attempted if the gRPC status code in the response header is set todeadline-exceeded. - internal: a retry is attempted if the gRPC status code in the response header is set tointernal. - resource-exhausted: a retry is attempted if the gRPC status code in the response header is set toresource-exhausted. - unavailable: a retry is attempted if the gRPC status code in the response header is set tounavailable. Only the following codes are supported when the URL map is bound to target gRPC proxy that has validateForProxyless field set to true. - cancelled - deadline-exceeded - internal - resource-exhausted - unavailable",
      ).optional(),
    }).describe("The retry policy associates with HttpRouteRule").optional(),
    timeout: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    urlRewrite: z.object({
      hostRewrite: z.string().describe(
        "Before forwarding the request to the selected service, the request's host header is replaced with contents of hostRewrite. The value must be from 1 to 255 characters.",
      ).optional(),
      pathPrefixRewrite: z.string().describe(
        "Before forwarding the request to the selected backend service, the matching portion of the request's path is replaced bypathPrefixRewrite. The value must be from 1 to 1024 characters.",
      ).optional(),
      pathTemplateRewrite: z.string().describe(
        "If specified, the pattern rewrites the URL path (based on the:path header) using the HTTP template syntax. A corresponding path_template_match must be specified. Any template variables must exist in the path_template_match field. - -At least one variable must be specified in the path_template_match field - You can omit variables from the rewritten URL - The * and ** operators cannot be matched unless they have a corresponding variable name - e.g. {format=*} or {var=**}. For example, a path_template_match of /static/{format=**} could be rewritten as /static/content/{format} to prefix/content to the URL. Variables can also be re-ordered in a rewrite, so that /{country}/{format}/{suffix=**} can be rewritten as /content/{format}/{country}/{suffix}. At least one non-empty routeRules[].matchRules[].path_template_match is required. Only one of path_prefix_rewrite orpath_template_rewrite may be specified.",
      ).optional(),
    }).describe(
      "The spec for modifying the path before sending the request to the matched backend service.",
    ).optional(),
    weightedBackendServices: z.array(z.object({
      backendService: z.string().describe(
        "The full or partial URL to the default BackendService resource. Before forwarding the request to backendService, the load balancer applies any relevant headerActions specified as part of thisbackendServiceWeight.",
      ).optional(),
      headerAction: z.object({
        requestHeadersToAdd: z.array(z.unknown()).describe(
          "Headers to add to a matching request before forwarding the request to thebackendService.",
        ).optional(),
        requestHeadersToRemove: z.array(z.unknown()).describe(
          "A list of header names for headers that need to be removed from the request before forwarding the request to the backendService.",
        ).optional(),
        responseHeadersToAdd: z.array(z.unknown()).describe(
          "Headers to add the response before sending the response back to the client.",
        ).optional(),
        responseHeadersToRemove: z.array(z.unknown()).describe(
          "A list of header names for headers that need to be removed from the response before sending the response back to the client.",
        ).optional(),
      }).describe(
        "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
      ).optional(),
      weight: z.number().int().describe(
        "Specifies the fraction of traffic sent to a backend service, computed asweight / (sum of all weightedBackendService weights in routeAction). The selection of a backend service is determined only for new traffic. Once a user's request has been directed to a backend service, subsequent requests are sent to the same backend service as determined by the backend service's session affinity policy. Don't configure session affinity if you're using weighted traffic splitting. If you do, the weighted traffic splitting configuration takes precedence. The value must be from 0 to 1000.",
      ).optional(),
    })).describe(
      "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
    ).optional(),
  }).optional(),
  defaultService: z.string().describe(
    "The full or partial URL of the defaultService resource to which traffic is directed if none of the hostRules match. If defaultRouteAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. defaultService has no effect when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
  ).optional(),
  defaultUrlRedirect: z.object({
    hostRedirect: z.string().describe(
      "The host that is used in the redirect response instead of the one that was supplied in the request. The value must be from 1 to 255 characters.",
    ).optional(),
    httpsRedirect: z.boolean().describe(
      "If set to true, the URL scheme in the redirected request is set to HTTPS. If set to false, the URL scheme of the redirected request remains the same as that of the request. This must only be set for URL maps used inTargetHttpProxys. Setting this true forTargetHttpsProxy is not permitted. The default is set to false.",
    ).optional(),
    pathRedirect: z.string().describe(
      "The path that is used in the redirect response instead of the one that was supplied in the request. pathRedirect cannot be supplied together withprefixRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
    ).optional(),
    prefixRedirect: z.string().describe(
      "The prefix that replaces the prefixMatch specified in the HttpRouteRuleMatch, retaining the remaining portion of the URL before redirecting the request. prefixRedirect cannot be supplied together withpathRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
    ).optional(),
    redirectResponseCode: z.enum([
      "FOUND",
      "MOVED_PERMANENTLY_DEFAULT",
      "PERMANENT_REDIRECT",
      "SEE_OTHER",
      "TEMPORARY_REDIRECT",
    ]).describe(
      "The HTTP Status code to use for this RedirectAction. Supported values are: - MOVED_PERMANENTLY_DEFAULT, which is the default value and corresponds to 301. - FOUND, which corresponds to 302. - SEE_OTHER which corresponds to 303. - TEMPORARY_REDIRECT, which corresponds to 307. In this case, the request method is retained. - PERMANENT_REDIRECT, which corresponds to 308. In this case, the request method is retained.",
    ).optional(),
    stripQuery: z.boolean().describe(
      "If set to true, any accompanying query portion of the original URL is removed before redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
    ).optional(),
  }).describe("Specifies settings for an HTTP redirect.").optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field is ignored when inserting a UrlMap. An up-to-date fingerprint must be provided in order to update the UrlMap, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a UrlMap.",
  ).optional(),
  headerAction: z.object({
    requestHeadersToAdd: z.array(z.object({
      headerName: z.string().describe("The name of the header.").optional(),
      headerValue: z.string().describe("The value of the header to add.")
        .optional(),
      replace: z.boolean().describe(
        "If false, headerValue is appended to any values that already exist for the header. If true, headerValue is set for the header, discarding any values that were set for that header. The default value is true, unless a variable is present in headerValue, in which case the default value is false..",
      ).optional(),
    })).describe(
      "Headers to add to a matching request before forwarding the request to thebackendService.",
    ).optional(),
    requestHeadersToRemove: z.array(z.string()).describe(
      "A list of header names for headers that need to be removed from the request before forwarding the request to the backendService.",
    ).optional(),
    responseHeadersToAdd: z.array(z.object({
      headerName: z.string().describe("The name of the header.").optional(),
      headerValue: z.string().describe("The value of the header to add.")
        .optional(),
      replace: z.boolean().describe(
        "If false, headerValue is appended to any values that already exist for the header. If true, headerValue is set for the header, discarding any values that were set for that header. The default value is true, unless a variable is present in headerValue, in which case the default value is false..",
      ).optional(),
    })).describe(
      "Headers to add the response before sending the response back to the client.",
    ).optional(),
    responseHeadersToRemove: z.array(z.string()).describe(
      "A list of header names for headers that need to be removed from the response before sending the response back to the client.",
    ).optional(),
  }).describe(
    "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
  ).optional(),
  hostRules: z.array(z.object({
    description: z.string().describe(
      "An optional description of this resource. Provide this property when you create the resource.",
    ).optional(),
    hosts: z.array(z.string()).describe(
      "The list of host patterns to match. They must be valid hostnames with optional port numbers in the format host:port.* matches any string of ([a-z0-9-.]*). In that case, * must be the first character, and if followed by anything, the immediate following character must be either - or.. * based matching is not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
    ).optional(),
    pathMatcher: z.string().describe(
      "The name of the PathMatcher to use to match the path portion of the URL if the hostRule matches the URL's host portion.",
    ).optional(),
  })).describe("The list of host rules to use against the URL.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  pathMatchers: z.array(z.object({
    defaultCustomErrorResponsePolicy: z.object({
      errorResponseRules: z.array(z.object({
        matchResponseCodes: z.unknown().describe(
          "Valid values include: - A number between 400 and 599: For example 401 or 503, in which case the load balancer applies the policy if the error code exactly matches this value. - 5xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 500 to 599. - 4xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 400 to 499. Values must be unique within matchResponseCodes and across allerrorResponseRules ofCustomErrorResponsePolicy.",
        ).optional(),
        overrideResponseCode: z.unknown().describe(
          "The HTTP status code returned with the response containing the custom error content. If overrideResponseCode is not supplied, the same response code returned by the original backend bucket or backend service is returned to the client.",
        ).optional(),
        path: z.unknown().describe(
          "The full path to a file within backendBucket. For example:/errors/defaultError.html path must start with a leading slash. path cannot have trailing slashes. If the file is not available in backendBucket or the load balancer cannot reach the BackendBucket, a simpleNot Found Error is returned to the client. The value must be from 1 to 1024 characters",
        ).optional(),
      })).describe(
        "Specifies rules for returning error responses. In a given policy, if you specify rules for both a range of error codes as well as rules for specific error codes then rules with specific error codes have a higher priority. For example, assume that you configure a rule for 401 (Un-authorized) code, and another for all 4 series error codes (4XX). If the backend service returns a401, then the rule for 401 will be applied. However if the backend service returns a 403, the rule for4xx takes effect.",
      ).optional(),
      errorService: z.string().describe(
        "The full or partial URL to the BackendBucket resource that contains the custom error content. Examples are: - https://www.googleapis.com/compute/v1/projects/project/global/backendBuckets/myBackendBucket - compute/v1/projects/project/global/backendBuckets/myBackendBucket - global/backendBuckets/myBackendBucket If errorService is not specified at lower levels likepathMatcher, pathRule and routeRule, an errorService specified at a higher level in theUrlMap will be used. IfUrlMap.defaultCustomErrorResponsePolicy contains one or moreerrorResponseRules[], it must specifyerrorService. If load balancer cannot reach the backendBucket, a simple Not Found Error will be returned, with the original response code (oroverrideResponseCode if configured). errorService is not supported for internal or regionalHTTP/HTTPS load balancers.",
      ).optional(),
    }).describe(
      "Specifies the custom error response policy that must be applied when the backend service or backend bucket responds with an error.",
    ).optional(),
    defaultRouteAction: z.object({
      corsPolicy: z.object({
        allowCredentials: z.boolean().describe(
          "In response to a preflight request, setting this to true indicates that the actual request can include user credentials. This field translates to the Access-Control-Allow-Credentials header. Default is false.",
        ).optional(),
        allowHeaders: z.array(z.unknown()).describe(
          "Specifies the content for the Access-Control-Allow-Headers header.",
        ).optional(),
        allowMethods: z.array(z.unknown()).describe(
          "Specifies the content for the Access-Control-Allow-Methods header.",
        ).optional(),
        allowOriginRegexes: z.array(z.unknown()).describe(
          "Specifies a regular expression that matches allowed origins. For more information, see regular expression syntax. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes. Regular expressions can only be used when the loadBalancingScheme is set to INTERNAL_SELF_MANAGED.",
        ).optional(),
        allowOrigins: z.array(z.unknown()).describe(
          "Specifies the list of origins that is allowed to do CORS requests. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes.",
        ).optional(),
        disabled: z.boolean().describe(
          "If true, disables the CORS policy. The default value is false, which indicates that the CORS policy is in effect.",
        ).optional(),
        exposeHeaders: z.array(z.unknown()).describe(
          "Specifies the content for the Access-Control-Expose-Headers header.",
        ).optional(),
        maxAge: z.number().int().describe(
          "Specifies how long results of a preflight request can be cached in seconds. This field translates to the Access-Control-Max-Age header.",
        ).optional(),
      }).describe(
        "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard.",
      ).optional(),
      faultInjectionPolicy: z.object({
        abort: z.object({
          httpStatus: z.unknown().describe(
            "The HTTP status code used to abort the request. The value must be from 200 to 599 inclusive. For gRPC protocol, the gRPC status code is mapped to HTTP status code according to this mapping table. HTTP status 200 is mapped to gRPC status UNKNOWN. Injecting an OK status is currently not supported by Traffic Director.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic for connections, operations, or requests that is aborted as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
          ).optional(),
        }).describe(
          "Specification for how requests are aborted as part of fault injection.",
        ).optional(),
        delay: z.object({
          fixedDelay: z.unknown().describe(
            'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic for connections, operations, or requests for which a delay is introduced as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
          ).optional(),
        }).describe(
          "Specifies the delay introduced by the load balancer before forwarding the request to the backend service as part of fault injection.",
        ).optional(),
      }).describe(
        "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by the load balancer on a percentage of requests before sending those request to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.",
      ).optional(),
      maxStreamDuration: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
      ).optional(),
      requestMirrorPolicy: z.object({
        backendService: z.string().describe(
          "The full or partial URL to the BackendService resource being mirrored to. The backend service configured for a mirroring policy must reference backends that are of the same type as the original backend service matched in the URL map. Serverless NEG backends are not currently supported as a mirrored backend service.",
        ).optional(),
        mirrorPercent: z.number().describe(
          "The percentage of requests to be mirrored to `backend_service`.",
        ).optional(),
      }).describe(
        "A policy that specifies how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer doesn't wait for responses from the shadow service. Before sending traffic to the shadow service, the host or authority header is suffixed with-shadow.",
      ).optional(),
      retryPolicy: z.object({
        numRetries: z.number().int().describe(
          "Specifies the allowed number retries. This number must be > 0. If not specified, defaults to 1.",
        ).optional(),
        perTryTimeout: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        retryConditions: z.array(z.unknown()).describe(
          "Specifies one or more conditions when this retry policy applies. Valid values are: - 5xx: retry is attempted if the instance or endpoint responds with any 5xx response code, or if the instance or endpoint does not respond at all. For example, disconnects, reset, read timeout, connection failure, and refused streams. - gateway-error: Similar to 5xx, but only applies to response codes 502, 503 or504. - connect-failure: a retry is attempted on failures connecting to the instance or endpoint. For example, connection timeouts. - retriable-4xx: a retry is attempted if the instance or endpoint responds with a 4xx response code. The only error that you can retry is error code 409. - refused-stream: a retry is attempted if the instance or endpoint resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: a retry is attempted if the gRPC status code in the response header is set to cancelled. - deadline-exceeded: a retry is attempted if the gRPC status code in the response header is set todeadline-exceeded. - internal: a retry is attempted if the gRPC status code in the response header is set tointernal. - resource-exhausted: a retry is attempted if the gRPC status code in the response header is set toresource-exhausted. - unavailable: a retry is attempted if the gRPC status code in the response header is set tounavailable. Only the following codes are supported when the URL map is bound to target gRPC proxy that has validateForProxyless field set to true. - cancelled - deadline-exceeded - internal - resource-exhausted - unavailable",
        ).optional(),
      }).describe("The retry policy associates with HttpRouteRule").optional(),
      timeout: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
      ).optional(),
      urlRewrite: z.object({
        hostRewrite: z.string().describe(
          "Before forwarding the request to the selected service, the request's host header is replaced with contents of hostRewrite. The value must be from 1 to 255 characters.",
        ).optional(),
        pathPrefixRewrite: z.string().describe(
          "Before forwarding the request to the selected backend service, the matching portion of the request's path is replaced bypathPrefixRewrite. The value must be from 1 to 1024 characters.",
        ).optional(),
        pathTemplateRewrite: z.string().describe(
          "If specified, the pattern rewrites the URL path (based on the:path header) using the HTTP template syntax. A corresponding path_template_match must be specified. Any template variables must exist in the path_template_match field. - -At least one variable must be specified in the path_template_match field - You can omit variables from the rewritten URL - The * and ** operators cannot be matched unless they have a corresponding variable name - e.g. {format=*} or {var=**}. For example, a path_template_match of /static/{format=**} could be rewritten as /static/content/{format} to prefix/content to the URL. Variables can also be re-ordered in a rewrite, so that /{country}/{format}/{suffix=**} can be rewritten as /content/{format}/{country}/{suffix}. At least one non-empty routeRules[].matchRules[].path_template_match is required. Only one of path_prefix_rewrite orpath_template_rewrite may be specified.",
        ).optional(),
      }).describe(
        "The spec for modifying the path before sending the request to the matched backend service.",
      ).optional(),
      weightedBackendServices: z.array(z.object({
        backendService: z.unknown().describe(
          "The full or partial URL to the default BackendService resource. Before forwarding the request to backendService, the load balancer applies any relevant headerActions specified as part of thisbackendServiceWeight.",
        ).optional(),
        headerAction: z.unknown().describe(
          "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
        ).optional(),
        weight: z.unknown().describe(
          "Specifies the fraction of traffic sent to a backend service, computed asweight / (sum of all weightedBackendService weights in routeAction). The selection of a backend service is determined only for new traffic. Once a user's request has been directed to a backend service, subsequent requests are sent to the same backend service as determined by the backend service's session affinity policy. Don't configure session affinity if you're using weighted traffic splitting. If you do, the weighted traffic splitting configuration takes precedence. The value must be from 0 to 1000.",
        ).optional(),
      })).describe(
        "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
      ).optional(),
    }).optional(),
    defaultService: z.string().describe(
      "The full or partial URL to the BackendService resource. This URL is used if none of the pathRules orrouteRules defined by this PathMatcher are matched. For example, the following are all valid URLs to a BackendService resource: - https://www.googleapis.com/compute/v1/projects/project/global/backendServices/backendService - compute/v1/projects/project/global/backendServices/backendService - global/backendServices/backendService If defaultRouteAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Authorization requires one or more of the following Google IAM permissions on the specified resource default_service: - compute.backendBuckets.use - compute.backendServices.use",
    ).optional(),
    defaultUrlRedirect: z.object({
      hostRedirect: z.string().describe(
        "The host that is used in the redirect response instead of the one that was supplied in the request. The value must be from 1 to 255 characters.",
      ).optional(),
      httpsRedirect: z.boolean().describe(
        "If set to true, the URL scheme in the redirected request is set to HTTPS. If set to false, the URL scheme of the redirected request remains the same as that of the request. This must only be set for URL maps used inTargetHttpProxys. Setting this true forTargetHttpsProxy is not permitted. The default is set to false.",
      ).optional(),
      pathRedirect: z.string().describe(
        "The path that is used in the redirect response instead of the one that was supplied in the request. pathRedirect cannot be supplied together withprefixRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
      ).optional(),
      prefixRedirect: z.string().describe(
        "The prefix that replaces the prefixMatch specified in the HttpRouteRuleMatch, retaining the remaining portion of the URL before redirecting the request. prefixRedirect cannot be supplied together withpathRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
      ).optional(),
      redirectResponseCode: z.enum([
        "FOUND",
        "MOVED_PERMANENTLY_DEFAULT",
        "PERMANENT_REDIRECT",
        "SEE_OTHER",
        "TEMPORARY_REDIRECT",
      ]).describe(
        "The HTTP Status code to use for this RedirectAction. Supported values are: - MOVED_PERMANENTLY_DEFAULT, which is the default value and corresponds to 301. - FOUND, which corresponds to 302. - SEE_OTHER which corresponds to 303. - TEMPORARY_REDIRECT, which corresponds to 307. In this case, the request method is retained. - PERMANENT_REDIRECT, which corresponds to 308. In this case, the request method is retained.",
      ).optional(),
      stripQuery: z.boolean().describe(
        "If set to true, any accompanying query portion of the original URL is removed before redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
      ).optional(),
    }).describe("Specifies settings for an HTTP redirect.").optional(),
    description: z.string().describe(
      "An optional description of this resource. Provide this property when you create the resource.",
    ).optional(),
    headerAction: z.object({
      requestHeadersToAdd: z.array(z.object({
        headerName: z.unknown().describe("The name of the header.").optional(),
        headerValue: z.unknown().describe("The value of the header to add.")
          .optional(),
        replace: z.unknown().describe(
          "If false, headerValue is appended to any values that already exist for the header. If true, headerValue is set for the header, discarding any values that were set for that header. The default value is true, unless a variable is present in headerValue, in which case the default value is false..",
        ).optional(),
      })).describe(
        "Headers to add to a matching request before forwarding the request to thebackendService.",
      ).optional(),
      requestHeadersToRemove: z.array(z.string()).describe(
        "A list of header names for headers that need to be removed from the request before forwarding the request to the backendService.",
      ).optional(),
      responseHeadersToAdd: z.array(z.object({
        headerName: z.unknown().describe("The name of the header.").optional(),
        headerValue: z.unknown().describe("The value of the header to add.")
          .optional(),
        replace: z.unknown().describe(
          "If false, headerValue is appended to any values that already exist for the header. If true, headerValue is set for the header, discarding any values that were set for that header. The default value is true, unless a variable is present in headerValue, in which case the default value is false..",
        ).optional(),
      })).describe(
        "Headers to add the response before sending the response back to the client.",
      ).optional(),
      responseHeadersToRemove: z.array(z.string()).describe(
        "A list of header names for headers that need to be removed from the response before sending the response back to the client.",
      ).optional(),
    }).describe(
      "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
    ).optional(),
    name: z.string().describe(
      "The name to which this PathMatcher is referred by theHostRule.",
    ).optional(),
    pathRules: z.array(z.object({
      customErrorResponsePolicy: z.object({
        errorResponseRules: z.unknown().describe(
          "Specifies rules for returning error responses. In a given policy, if you specify rules for both a range of error codes as well as rules for specific error codes then rules with specific error codes have a higher priority. For example, assume that you configure a rule for 401 (Un-authorized) code, and another for all 4 series error codes (4XX). If the backend service returns a401, then the rule for 401 will be applied. However if the backend service returns a 403, the rule for4xx takes effect.",
        ).optional(),
        errorService: z.unknown().describe(
          "The full or partial URL to the BackendBucket resource that contains the custom error content. Examples are: - https://www.googleapis.com/compute/v1/projects/project/global/backendBuckets/myBackendBucket - compute/v1/projects/project/global/backendBuckets/myBackendBucket - global/backendBuckets/myBackendBucket If errorService is not specified at lower levels likepathMatcher, pathRule and routeRule, an errorService specified at a higher level in theUrlMap will be used. IfUrlMap.defaultCustomErrorResponsePolicy contains one or moreerrorResponseRules[], it must specifyerrorService. If load balancer cannot reach the backendBucket, a simple Not Found Error will be returned, with the original response code (oroverrideResponseCode if configured). errorService is not supported for internal or regionalHTTP/HTTPS load balancers.",
        ).optional(),
      }).describe(
        "Specifies the custom error response policy that must be applied when the backend service or backend bucket responds with an error.",
      ).optional(),
      paths: z.array(z.unknown()).describe(
        "The list of path patterns to match. Each must start with / and the only place a * is allowed is at the end following a /. The string fed to the path matcher does not include any text after the first? or #, and those chars are not allowed here.",
      ).optional(),
      routeAction: z.object({
        corsPolicy: z.unknown().describe(
          "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard.",
        ).optional(),
        faultInjectionPolicy: z.unknown().describe(
          "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by the load balancer on a percentage of requests before sending those request to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.",
        ).optional(),
        maxStreamDuration: z.unknown().describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        requestMirrorPolicy: z.unknown().describe(
          "A policy that specifies how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer doesn't wait for responses from the shadow service. Before sending traffic to the shadow service, the host or authority header is suffixed with-shadow.",
        ).optional(),
        retryPolicy: z.unknown().describe(
          "The retry policy associates with HttpRouteRule",
        ).optional(),
        timeout: z.unknown().describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        urlRewrite: z.unknown().describe(
          "The spec for modifying the path before sending the request to the matched backend service.",
        ).optional(),
        weightedBackendServices: z.unknown().describe(
          "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
        ).optional(),
      }).optional(),
      service: z.string().describe(
        "The full or partial URL of the backend service resource to which traffic is directed if this rule is matched. If routeAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set.",
      ).optional(),
      urlRedirect: z.object({
        hostRedirect: z.unknown().describe(
          "The host that is used in the redirect response instead of the one that was supplied in the request. The value must be from 1 to 255 characters.",
        ).optional(),
        httpsRedirect: z.unknown().describe(
          "If set to true, the URL scheme in the redirected request is set to HTTPS. If set to false, the URL scheme of the redirected request remains the same as that of the request. This must only be set for URL maps used inTargetHttpProxys. Setting this true forTargetHttpsProxy is not permitted. The default is set to false.",
        ).optional(),
        pathRedirect: z.unknown().describe(
          "The path that is used in the redirect response instead of the one that was supplied in the request. pathRedirect cannot be supplied together withprefixRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
        ).optional(),
        prefixRedirect: z.unknown().describe(
          "The prefix that replaces the prefixMatch specified in the HttpRouteRuleMatch, retaining the remaining portion of the URL before redirecting the request. prefixRedirect cannot be supplied together withpathRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
        ).optional(),
        redirectResponseCode: z.unknown().describe(
          "The HTTP Status code to use for this RedirectAction. Supported values are: - MOVED_PERMANENTLY_DEFAULT, which is the default value and corresponds to 301. - FOUND, which corresponds to 302. - SEE_OTHER which corresponds to 303. - TEMPORARY_REDIRECT, which corresponds to 307. In this case, the request method is retained. - PERMANENT_REDIRECT, which corresponds to 308. In this case, the request method is retained.",
        ).optional(),
        stripQuery: z.unknown().describe(
          "If set to true, any accompanying query portion of the original URL is removed before redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
        ).optional(),
      }).describe("Specifies settings for an HTTP redirect.").optional(),
    })).describe(
      'The list of path rules. Use this list instead of routeRules when routing based on simple path matching is all that\'s required. A path rule can only include a wildcard character (*) after a forward slash character ("/"). The order by which path rules are specified does not matter. Matches are always done on the longest-path-first basis. For example: a pathRule with a path /a/b/c/* will match before /a/b/* irrespective of the order in which those paths appear in this list. Within a given pathMatcher, only one ofpathRules or routeRules must be set.',
    ).optional(),
    routeRules: z.array(z.object({
      customErrorResponsePolicy: z.object({
        errorResponseRules: z.unknown().describe(
          "Specifies rules for returning error responses. In a given policy, if you specify rules for both a range of error codes as well as rules for specific error codes then rules with specific error codes have a higher priority. For example, assume that you configure a rule for 401 (Un-authorized) code, and another for all 4 series error codes (4XX). If the backend service returns a401, then the rule for 401 will be applied. However if the backend service returns a 403, the rule for4xx takes effect.",
        ).optional(),
        errorService: z.unknown().describe(
          "The full or partial URL to the BackendBucket resource that contains the custom error content. Examples are: - https://www.googleapis.com/compute/v1/projects/project/global/backendBuckets/myBackendBucket - compute/v1/projects/project/global/backendBuckets/myBackendBucket - global/backendBuckets/myBackendBucket If errorService is not specified at lower levels likepathMatcher, pathRule and routeRule, an errorService specified at a higher level in theUrlMap will be used. IfUrlMap.defaultCustomErrorResponsePolicy contains one or moreerrorResponseRules[], it must specifyerrorService. If load balancer cannot reach the backendBucket, a simple Not Found Error will be returned, with the original response code (oroverrideResponseCode if configured). errorService is not supported for internal or regionalHTTP/HTTPS load balancers.",
        ).optional(),
      }).describe(
        "Specifies the custom error response policy that must be applied when the backend service or backend bucket responds with an error.",
      ).optional(),
      description: z.string().describe(
        "The short description conveying the intent of this routeRule. The description can have a maximum length of 1024 characters.",
      ).optional(),
      headerAction: z.object({
        requestHeadersToAdd: z.unknown().describe(
          "Headers to add to a matching request before forwarding the request to thebackendService.",
        ).optional(),
        requestHeadersToRemove: z.unknown().describe(
          "A list of header names for headers that need to be removed from the request before forwarding the request to the backendService.",
        ).optional(),
        responseHeadersToAdd: z.unknown().describe(
          "Headers to add the response before sending the response back to the client.",
        ).optional(),
        responseHeadersToRemove: z.unknown().describe(
          "A list of header names for headers that need to be removed from the response before sending the response back to the client.",
        ).optional(),
      }).describe(
        "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
      ).optional(),
      matchRules: z.array(z.unknown()).describe(
        "The list of criteria for matching attributes of a request to thisrouteRule. This list has OR semantics: the request matches this routeRule when any of thematchRules are satisfied. However predicates within a given matchRule have AND semantics. All predicates within a matchRule must match for the request to match the rule.",
      ).optional(),
      priority: z.number().int().describe(
        "For routeRules within a given pathMatcher, priority determines the order in which a load balancer interpretsrouteRules. RouteRules are evaluated in order of priority, from the lowest to highest number. The priority of a rule decreases as its number increases (1, 2, 3, N+1). The first rule that matches the request is applied. You cannot configure two or more routeRules with the same priority. Priority for each rule must be set to a number from 0 to 2147483647 inclusive. Priority numbers can have gaps, which enable you to add or remove rules in the future without affecting the rest of the rules. For example, 1, 2, 3, 4, 5, 9, 12, 16 is a valid series of priority numbers to which you could add rules numbered from 6 to 8, 10 to 11, and 13 to 15 in the future without any impact on existing rules.",
      ).optional(),
      routeAction: z.object({
        corsPolicy: z.unknown().describe(
          "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard.",
        ).optional(),
        faultInjectionPolicy: z.unknown().describe(
          "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by the load balancer on a percentage of requests before sending those request to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.",
        ).optional(),
        maxStreamDuration: z.unknown().describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        requestMirrorPolicy: z.unknown().describe(
          "A policy that specifies how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer doesn't wait for responses from the shadow service. Before sending traffic to the shadow service, the host or authority header is suffixed with-shadow.",
        ).optional(),
        retryPolicy: z.unknown().describe(
          "The retry policy associates with HttpRouteRule",
        ).optional(),
        timeout: z.unknown().describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        urlRewrite: z.unknown().describe(
          "The spec for modifying the path before sending the request to the matched backend service.",
        ).optional(),
        weightedBackendServices: z.unknown().describe(
          "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
        ).optional(),
      }).optional(),
      service: z.string().describe(
        "The full or partial URL of the backend service resource to which traffic is directed if this rule is matched. If routeAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set.",
      ).optional(),
      urlRedirect: z.object({
        hostRedirect: z.unknown().describe(
          "The host that is used in the redirect response instead of the one that was supplied in the request. The value must be from 1 to 255 characters.",
        ).optional(),
        httpsRedirect: z.unknown().describe(
          "If set to true, the URL scheme in the redirected request is set to HTTPS. If set to false, the URL scheme of the redirected request remains the same as that of the request. This must only be set for URL maps used inTargetHttpProxys. Setting this true forTargetHttpsProxy is not permitted. The default is set to false.",
        ).optional(),
        pathRedirect: z.unknown().describe(
          "The path that is used in the redirect response instead of the one that was supplied in the request. pathRedirect cannot be supplied together withprefixRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
        ).optional(),
        prefixRedirect: z.unknown().describe(
          "The prefix that replaces the prefixMatch specified in the HttpRouteRuleMatch, retaining the remaining portion of the URL before redirecting the request. prefixRedirect cannot be supplied together withpathRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
        ).optional(),
        redirectResponseCode: z.unknown().describe(
          "The HTTP Status code to use for this RedirectAction. Supported values are: - MOVED_PERMANENTLY_DEFAULT, which is the default value and corresponds to 301. - FOUND, which corresponds to 302. - SEE_OTHER which corresponds to 303. - TEMPORARY_REDIRECT, which corresponds to 307. In this case, the request method is retained. - PERMANENT_REDIRECT, which corresponds to 308. In this case, the request method is retained.",
        ).optional(),
        stripQuery: z.unknown().describe(
          "If set to true, any accompanying query portion of the original URL is removed before redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
        ).optional(),
      }).describe("Specifies settings for an HTTP redirect.").optional(),
    })).describe(
      "The list of HTTP route rules. Use this list instead ofpathRules when advanced route matching and routing actions are desired. routeRules are evaluated in order of priority, from the lowest to highest number. Within a given pathMatcher, you can set only one ofpathRules or routeRules.",
    ).optional(),
  })).describe("The list of named PathMatchers to use against the URL.")
    .optional(),
  tests: z.array(z.object({
    description: z.string().describe("Description of this test case.")
      .optional(),
    expectedOutputUrl: z.string().describe(
      "The expected output URL evaluated by the load balancer containing the scheme, host, path and query parameters. For rules that forward requests to backends, the test passes only whenexpectedOutputUrl matches the request forwarded by the load balancer to backends. For rules with urlRewrite, the test verifies that the forwarded request matcheshostRewrite and pathPrefixRewrite in theurlRewrite action. When service is specified,expectedOutputUrl`s scheme is ignored. For rules with urlRedirect, the test passes only ifexpectedOutputUrl matches the URL in the load balancer's redirect response. If urlRedirect specifieshttps_redirect, the test passes only if the scheme inexpectedOutputUrl is also set to HTTPS. If urlRedirect specifies strip_query, the test passes only if expectedOutputUrl does not contain any query parameters. expectedOutputUrl is optional whenservice is specified.",
    ).optional(),
    expectedRedirectResponseCode: z.number().int().describe(
      "For rules with urlRedirect, the test passes only ifexpectedRedirectResponseCode matches the HTTP status code in load balancer's redirect response. expectedRedirectResponseCode cannot be set whenservice is set.",
    ).optional(),
    headers: z.array(z.object({
      name: z.string().describe("Header name.").optional(),
      value: z.string().describe("Header value.").optional(),
    })).describe(
      "HTTP headers for this request. If headers contains a host header, then host must also match the header value.",
    ).optional(),
    host: z.string().describe(
      "Host portion of the URL. If headers contains a host header, then host must also match the header value.",
    ).optional(),
    path: z.string().describe("Path portion of the URL.").optional(),
    service: z.string().describe(
      "Expected BackendService or BackendBucket resource the given URL should be mapped to. The service field cannot be set if expectedRedirectResponseCode is set.",
    ).optional(),
  })).describe(
    "The list of expected URL mapping tests. Request to update theUrlMap succeeds only if all test cases pass. You can specify a maximum of 100 tests per UrlMap. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  creationTimestamp: z.string().optional(),
  defaultCustomErrorResponsePolicy: z.object({
    errorResponseRules: z.array(z.object({
      matchResponseCodes: z.array(z.string()),
      overrideResponseCode: z.number(),
      path: z.string(),
    })),
    errorService: z.string(),
  }).optional(),
  defaultRouteAction: z.object({
    corsPolicy: z.object({
      allowCredentials: z.boolean(),
      allowHeaders: z.array(z.string()),
      allowMethods: z.array(z.string()),
      allowOriginRegexes: z.array(z.string()),
      allowOrigins: z.array(z.string()),
      disabled: z.boolean(),
      exposeHeaders: z.array(z.string()),
      maxAge: z.number(),
    }),
    faultInjectionPolicy: z.object({
      abort: z.object({
        httpStatus: z.number(),
        percentage: z.number(),
      }),
      delay: z.object({
        fixedDelay: z.object({
          nanos: z.number(),
          seconds: z.string(),
        }),
        percentage: z.number(),
      }),
    }),
    maxStreamDuration: z.object({
      nanos: z.number(),
      seconds: z.string(),
    }),
    requestMirrorPolicy: z.object({
      backendService: z.string(),
      mirrorPercent: z.number(),
    }),
    retryPolicy: z.object({
      numRetries: z.number(),
      perTryTimeout: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      retryConditions: z.array(z.string()),
    }),
    timeout: z.object({
      nanos: z.number(),
      seconds: z.string(),
    }),
    urlRewrite: z.object({
      hostRewrite: z.string(),
      pathPrefixRewrite: z.string(),
      pathTemplateRewrite: z.string(),
    }),
    weightedBackendServices: z.array(z.object({
      backendService: z.string(),
      headerAction: z.object({
        requestHeadersToAdd: z.array(z.unknown()),
        requestHeadersToRemove: z.array(z.unknown()),
        responseHeadersToAdd: z.array(z.unknown()),
        responseHeadersToRemove: z.array(z.unknown()),
      }),
      weight: z.number(),
    })),
  }).optional(),
  defaultService: z.string().optional(),
  defaultUrlRedirect: z.object({
    hostRedirect: z.string(),
    httpsRedirect: z.boolean(),
    pathRedirect: z.string(),
    prefixRedirect: z.string(),
    redirectResponseCode: z.string(),
    stripQuery: z.boolean(),
  }).optional(),
  description: z.string().optional(),
  fingerprint: z.string().optional(),
  headerAction: z.object({
    requestHeadersToAdd: z.array(z.object({
      headerName: z.string(),
      headerValue: z.string(),
      replace: z.boolean(),
    })),
    requestHeadersToRemove: z.array(z.string()),
    responseHeadersToAdd: z.array(z.object({
      headerName: z.string(),
      headerValue: z.string(),
      replace: z.boolean(),
    })),
    responseHeadersToRemove: z.array(z.string()),
  }).optional(),
  hostRules: z.array(z.object({
    description: z.string(),
    hosts: z.array(z.string()),
    pathMatcher: z.string(),
  })).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  pathMatchers: z.array(z.object({
    defaultCustomErrorResponsePolicy: z.object({
      errorResponseRules: z.array(z.object({
        matchResponseCodes: z.unknown(),
        overrideResponseCode: z.unknown(),
        path: z.unknown(),
      })),
      errorService: z.string(),
    }),
    defaultRouteAction: z.object({
      corsPolicy: z.object({
        allowCredentials: z.boolean(),
        allowHeaders: z.array(z.unknown()),
        allowMethods: z.array(z.unknown()),
        allowOriginRegexes: z.array(z.unknown()),
        allowOrigins: z.array(z.unknown()),
        disabled: z.boolean(),
        exposeHeaders: z.array(z.unknown()),
        maxAge: z.number(),
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
      maxStreamDuration: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      requestMirrorPolicy: z.object({
        backendService: z.string(),
        mirrorPercent: z.number(),
      }),
      retryPolicy: z.object({
        numRetries: z.number(),
        perTryTimeout: z.object({
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        retryConditions: z.array(z.unknown()),
      }),
      timeout: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      urlRewrite: z.object({
        hostRewrite: z.string(),
        pathPrefixRewrite: z.string(),
        pathTemplateRewrite: z.string(),
      }),
      weightedBackendServices: z.array(z.object({
        backendService: z.unknown(),
        headerAction: z.unknown(),
        weight: z.unknown(),
      })),
    }),
    defaultService: z.string(),
    defaultUrlRedirect: z.object({
      hostRedirect: z.string(),
      httpsRedirect: z.boolean(),
      pathRedirect: z.string(),
      prefixRedirect: z.string(),
      redirectResponseCode: z.string(),
      stripQuery: z.boolean(),
    }),
    description: z.string(),
    headerAction: z.object({
      requestHeadersToAdd: z.array(z.object({
        headerName: z.unknown(),
        headerValue: z.unknown(),
        replace: z.unknown(),
      })),
      requestHeadersToRemove: z.array(z.string()),
      responseHeadersToAdd: z.array(z.object({
        headerName: z.unknown(),
        headerValue: z.unknown(),
        replace: z.unknown(),
      })),
      responseHeadersToRemove: z.array(z.string()),
    }),
    name: z.string(),
    pathRules: z.array(z.object({
      customErrorResponsePolicy: z.object({
        errorResponseRules: z.unknown(),
        errorService: z.unknown(),
      }),
      paths: z.array(z.unknown()),
      routeAction: z.object({
        corsPolicy: z.unknown(),
        faultInjectionPolicy: z.unknown(),
        maxStreamDuration: z.unknown(),
        requestMirrorPolicy: z.unknown(),
        retryPolicy: z.unknown(),
        timeout: z.unknown(),
        urlRewrite: z.unknown(),
        weightedBackendServices: z.unknown(),
      }),
      service: z.string(),
      urlRedirect: z.object({
        hostRedirect: z.unknown(),
        httpsRedirect: z.unknown(),
        pathRedirect: z.unknown(),
        prefixRedirect: z.unknown(),
        redirectResponseCode: z.unknown(),
        stripQuery: z.unknown(),
      }),
    })),
    routeRules: z.array(z.object({
      customErrorResponsePolicy: z.object({
        errorResponseRules: z.unknown(),
        errorService: z.unknown(),
      }),
      description: z.string(),
      headerAction: z.object({
        requestHeadersToAdd: z.unknown(),
        requestHeadersToRemove: z.unknown(),
        responseHeadersToAdd: z.unknown(),
        responseHeadersToRemove: z.unknown(),
      }),
      matchRules: z.array(z.unknown()),
      priority: z.number(),
      routeAction: z.object({
        corsPolicy: z.unknown(),
        faultInjectionPolicy: z.unknown(),
        maxStreamDuration: z.unknown(),
        requestMirrorPolicy: z.unknown(),
        retryPolicy: z.unknown(),
        timeout: z.unknown(),
        urlRewrite: z.unknown(),
        weightedBackendServices: z.unknown(),
      }),
      service: z.string(),
      urlRedirect: z.object({
        hostRedirect: z.unknown(),
        httpsRedirect: z.unknown(),
        pathRedirect: z.unknown(),
        prefixRedirect: z.unknown(),
        redirectResponseCode: z.unknown(),
        stripQuery: z.unknown(),
      }),
    })),
  })).optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  tests: z.array(z.object({
    description: z.string(),
    expectedOutputUrl: z.string(),
    expectedRedirectResponseCode: z.number(),
    headers: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
    host: z.string(),
    path: z.string(),
    service: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  defaultCustomErrorResponsePolicy: z.object({
    errorResponseRules: z.array(z.object({
      matchResponseCodes: z.array(z.string()).describe(
        "Valid values include: - A number between 400 and 599: For example 401 or 503, in which case the load balancer applies the policy if the error code exactly matches this value. - 5xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 500 to 599. - 4xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 400 to 499. Values must be unique within matchResponseCodes and across allerrorResponseRules ofCustomErrorResponsePolicy.",
      ).optional(),
      overrideResponseCode: z.number().int().describe(
        "The HTTP status code returned with the response containing the custom error content. If overrideResponseCode is not supplied, the same response code returned by the original backend bucket or backend service is returned to the client.",
      ).optional(),
      path: z.string().describe(
        "The full path to a file within backendBucket. For example:/errors/defaultError.html path must start with a leading slash. path cannot have trailing slashes. If the file is not available in backendBucket or the load balancer cannot reach the BackendBucket, a simpleNot Found Error is returned to the client. The value must be from 1 to 1024 characters",
      ).optional(),
    })).describe(
      "Specifies rules for returning error responses. In a given policy, if you specify rules for both a range of error codes as well as rules for specific error codes then rules with specific error codes have a higher priority. For example, assume that you configure a rule for 401 (Un-authorized) code, and another for all 4 series error codes (4XX). If the backend service returns a401, then the rule for 401 will be applied. However if the backend service returns a 403, the rule for4xx takes effect.",
    ).optional(),
    errorService: z.string().describe(
      "The full or partial URL to the BackendBucket resource that contains the custom error content. Examples are: - https://www.googleapis.com/compute/v1/projects/project/global/backendBuckets/myBackendBucket - compute/v1/projects/project/global/backendBuckets/myBackendBucket - global/backendBuckets/myBackendBucket If errorService is not specified at lower levels likepathMatcher, pathRule and routeRule, an errorService specified at a higher level in theUrlMap will be used. IfUrlMap.defaultCustomErrorResponsePolicy contains one or moreerrorResponseRules[], it must specifyerrorService. If load balancer cannot reach the backendBucket, a simple Not Found Error will be returned, with the original response code (oroverrideResponseCode if configured). errorService is not supported for internal or regionalHTTP/HTTPS load balancers.",
    ).optional(),
  }).describe(
    "Specifies the custom error response policy that must be applied when the backend service or backend bucket responds with an error.",
  ).optional(),
  defaultRouteAction: z.object({
    corsPolicy: z.object({
      allowCredentials: z.boolean().describe(
        "In response to a preflight request, setting this to true indicates that the actual request can include user credentials. This field translates to the Access-Control-Allow-Credentials header. Default is false.",
      ).optional(),
      allowHeaders: z.array(z.string()).describe(
        "Specifies the content for the Access-Control-Allow-Headers header.",
      ).optional(),
      allowMethods: z.array(z.string()).describe(
        "Specifies the content for the Access-Control-Allow-Methods header.",
      ).optional(),
      allowOriginRegexes: z.array(z.string()).describe(
        "Specifies a regular expression that matches allowed origins. For more information, see regular expression syntax. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes. Regular expressions can only be used when the loadBalancingScheme is set to INTERNAL_SELF_MANAGED.",
      ).optional(),
      allowOrigins: z.array(z.string()).describe(
        "Specifies the list of origins that is allowed to do CORS requests. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes.",
      ).optional(),
      disabled: z.boolean().describe(
        "If true, disables the CORS policy. The default value is false, which indicates that the CORS policy is in effect.",
      ).optional(),
      exposeHeaders: z.array(z.string()).describe(
        "Specifies the content for the Access-Control-Expose-Headers header.",
      ).optional(),
      maxAge: z.number().int().describe(
        "Specifies how long results of a preflight request can be cached in seconds. This field translates to the Access-Control-Max-Age header.",
      ).optional(),
    }).describe(
      "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard.",
    ).optional(),
    faultInjectionPolicy: z.object({
      abort: z.object({
        httpStatus: z.number().int().describe(
          "The HTTP status code used to abort the request. The value must be from 200 to 599 inclusive. For gRPC protocol, the gRPC status code is mapped to HTTP status code according to this mapping table. HTTP status 200 is mapped to gRPC status UNKNOWN. Injecting an OK status is currently not supported by Traffic Director.",
        ).optional(),
        percentage: z.number().describe(
          "The percentage of traffic for connections, operations, or requests that is aborted as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
        ).optional(),
      }).describe(
        "Specification for how requests are aborted as part of fault injection.",
      ).optional(),
      delay: z.object({
        fixedDelay: z.object({
          nanos: z.number().int().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.string().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        percentage: z.number().describe(
          "The percentage of traffic for connections, operations, or requests for which a delay is introduced as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
        ).optional(),
      }).describe(
        "Specifies the delay introduced by the load balancer before forwarding the request to the backend service as part of fault injection.",
      ).optional(),
    }).describe(
      "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by the load balancer on a percentage of requests before sending those request to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.",
    ).optional(),
    maxStreamDuration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    requestMirrorPolicy: z.object({
      backendService: z.string().describe(
        "The full or partial URL to the BackendService resource being mirrored to. The backend service configured for a mirroring policy must reference backends that are of the same type as the original backend service matched in the URL map. Serverless NEG backends are not currently supported as a mirrored backend service.",
      ).optional(),
      mirrorPercent: z.number().describe(
        "The percentage of requests to be mirrored to `backend_service`.",
      ).optional(),
    }).describe(
      "A policy that specifies how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer doesn't wait for responses from the shadow service. Before sending traffic to the shadow service, the host or authority header is suffixed with-shadow.",
    ).optional(),
    retryPolicy: z.object({
      numRetries: z.number().int().describe(
        "Specifies the allowed number retries. This number must be > 0. If not specified, defaults to 1.",
      ).optional(),
      perTryTimeout: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
      ).optional(),
      retryConditions: z.array(z.string()).describe(
        "Specifies one or more conditions when this retry policy applies. Valid values are: - 5xx: retry is attempted if the instance or endpoint responds with any 5xx response code, or if the instance or endpoint does not respond at all. For example, disconnects, reset, read timeout, connection failure, and refused streams. - gateway-error: Similar to 5xx, but only applies to response codes 502, 503 or504. - connect-failure: a retry is attempted on failures connecting to the instance or endpoint. For example, connection timeouts. - retriable-4xx: a retry is attempted if the instance or endpoint responds with a 4xx response code. The only error that you can retry is error code 409. - refused-stream: a retry is attempted if the instance or endpoint resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: a retry is attempted if the gRPC status code in the response header is set to cancelled. - deadline-exceeded: a retry is attempted if the gRPC status code in the response header is set todeadline-exceeded. - internal: a retry is attempted if the gRPC status code in the response header is set tointernal. - resource-exhausted: a retry is attempted if the gRPC status code in the response header is set toresource-exhausted. - unavailable: a retry is attempted if the gRPC status code in the response header is set tounavailable. Only the following codes are supported when the URL map is bound to target gRPC proxy that has validateForProxyless field set to true. - cancelled - deadline-exceeded - internal - resource-exhausted - unavailable",
      ).optional(),
    }).describe("The retry policy associates with HttpRouteRule").optional(),
    timeout: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    urlRewrite: z.object({
      hostRewrite: z.string().describe(
        "Before forwarding the request to the selected service, the request's host header is replaced with contents of hostRewrite. The value must be from 1 to 255 characters.",
      ).optional(),
      pathPrefixRewrite: z.string().describe(
        "Before forwarding the request to the selected backend service, the matching portion of the request's path is replaced bypathPrefixRewrite. The value must be from 1 to 1024 characters.",
      ).optional(),
      pathTemplateRewrite: z.string().describe(
        "If specified, the pattern rewrites the URL path (based on the:path header) using the HTTP template syntax. A corresponding path_template_match must be specified. Any template variables must exist in the path_template_match field. - -At least one variable must be specified in the path_template_match field - You can omit variables from the rewritten URL - The * and ** operators cannot be matched unless they have a corresponding variable name - e.g. {format=*} or {var=**}. For example, a path_template_match of /static/{format=**} could be rewritten as /static/content/{format} to prefix/content to the URL. Variables can also be re-ordered in a rewrite, so that /{country}/{format}/{suffix=**} can be rewritten as /content/{format}/{country}/{suffix}. At least one non-empty routeRules[].matchRules[].path_template_match is required. Only one of path_prefix_rewrite orpath_template_rewrite may be specified.",
      ).optional(),
    }).describe(
      "The spec for modifying the path before sending the request to the matched backend service.",
    ).optional(),
    weightedBackendServices: z.array(z.object({
      backendService: z.string().describe(
        "The full or partial URL to the default BackendService resource. Before forwarding the request to backendService, the load balancer applies any relevant headerActions specified as part of thisbackendServiceWeight.",
      ).optional(),
      headerAction: z.object({
        requestHeadersToAdd: z.array(z.unknown()).describe(
          "Headers to add to a matching request before forwarding the request to thebackendService.",
        ).optional(),
        requestHeadersToRemove: z.array(z.unknown()).describe(
          "A list of header names for headers that need to be removed from the request before forwarding the request to the backendService.",
        ).optional(),
        responseHeadersToAdd: z.array(z.unknown()).describe(
          "Headers to add the response before sending the response back to the client.",
        ).optional(),
        responseHeadersToRemove: z.array(z.unknown()).describe(
          "A list of header names for headers that need to be removed from the response before sending the response back to the client.",
        ).optional(),
      }).describe(
        "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
      ).optional(),
      weight: z.number().int().describe(
        "Specifies the fraction of traffic sent to a backend service, computed asweight / (sum of all weightedBackendService weights in routeAction). The selection of a backend service is determined only for new traffic. Once a user's request has been directed to a backend service, subsequent requests are sent to the same backend service as determined by the backend service's session affinity policy. Don't configure session affinity if you're using weighted traffic splitting. If you do, the weighted traffic splitting configuration takes precedence. The value must be from 0 to 1000.",
      ).optional(),
    })).describe(
      "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
    ).optional(),
  }).optional(),
  defaultService: z.string().describe(
    "The full or partial URL of the defaultService resource to which traffic is directed if none of the hostRules match. If defaultRouteAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. defaultService has no effect when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
  ).optional(),
  defaultUrlRedirect: z.object({
    hostRedirect: z.string().describe(
      "The host that is used in the redirect response instead of the one that was supplied in the request. The value must be from 1 to 255 characters.",
    ).optional(),
    httpsRedirect: z.boolean().describe(
      "If set to true, the URL scheme in the redirected request is set to HTTPS. If set to false, the URL scheme of the redirected request remains the same as that of the request. This must only be set for URL maps used inTargetHttpProxys. Setting this true forTargetHttpsProxy is not permitted. The default is set to false.",
    ).optional(),
    pathRedirect: z.string().describe(
      "The path that is used in the redirect response instead of the one that was supplied in the request. pathRedirect cannot be supplied together withprefixRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
    ).optional(),
    prefixRedirect: z.string().describe(
      "The prefix that replaces the prefixMatch specified in the HttpRouteRuleMatch, retaining the remaining portion of the URL before redirecting the request. prefixRedirect cannot be supplied together withpathRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
    ).optional(),
    redirectResponseCode: z.enum([
      "FOUND",
      "MOVED_PERMANENTLY_DEFAULT",
      "PERMANENT_REDIRECT",
      "SEE_OTHER",
      "TEMPORARY_REDIRECT",
    ]).describe(
      "The HTTP Status code to use for this RedirectAction. Supported values are: - MOVED_PERMANENTLY_DEFAULT, which is the default value and corresponds to 301. - FOUND, which corresponds to 302. - SEE_OTHER which corresponds to 303. - TEMPORARY_REDIRECT, which corresponds to 307. In this case, the request method is retained. - PERMANENT_REDIRECT, which corresponds to 308. In this case, the request method is retained.",
    ).optional(),
    stripQuery: z.boolean().describe(
      "If set to true, any accompanying query portion of the original URL is removed before redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
    ).optional(),
  }).describe("Specifies settings for an HTTP redirect.").optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field is ignored when inserting a UrlMap. An up-to-date fingerprint must be provided in order to update the UrlMap, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a UrlMap.",
  ).optional(),
  headerAction: z.object({
    requestHeadersToAdd: z.array(z.object({
      headerName: z.string().describe("The name of the header.").optional(),
      headerValue: z.string().describe("The value of the header to add.")
        .optional(),
      replace: z.boolean().describe(
        "If false, headerValue is appended to any values that already exist for the header. If true, headerValue is set for the header, discarding any values that were set for that header. The default value is true, unless a variable is present in headerValue, in which case the default value is false..",
      ).optional(),
    })).describe(
      "Headers to add to a matching request before forwarding the request to thebackendService.",
    ).optional(),
    requestHeadersToRemove: z.array(z.string()).describe(
      "A list of header names for headers that need to be removed from the request before forwarding the request to the backendService.",
    ).optional(),
    responseHeadersToAdd: z.array(z.object({
      headerName: z.string().describe("The name of the header.").optional(),
      headerValue: z.string().describe("The value of the header to add.")
        .optional(),
      replace: z.boolean().describe(
        "If false, headerValue is appended to any values that already exist for the header. If true, headerValue is set for the header, discarding any values that were set for that header. The default value is true, unless a variable is present in headerValue, in which case the default value is false..",
      ).optional(),
    })).describe(
      "Headers to add the response before sending the response back to the client.",
    ).optional(),
    responseHeadersToRemove: z.array(z.string()).describe(
      "A list of header names for headers that need to be removed from the response before sending the response back to the client.",
    ).optional(),
  }).describe(
    "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
  ).optional(),
  hostRules: z.array(z.object({
    description: z.string().describe(
      "An optional description of this resource. Provide this property when you create the resource.",
    ).optional(),
    hosts: z.array(z.string()).describe(
      "The list of host patterns to match. They must be valid hostnames with optional port numbers in the format host:port.* matches any string of ([a-z0-9-.]*). In that case, * must be the first character, and if followed by anything, the immediate following character must be either - or.. * based matching is not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
    ).optional(),
    pathMatcher: z.string().describe(
      "The name of the PathMatcher to use to match the path portion of the URL if the hostRule matches the URL's host portion.",
    ).optional(),
  })).describe("The list of host rules to use against the URL.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  pathMatchers: z.array(z.object({
    defaultCustomErrorResponsePolicy: z.object({
      errorResponseRules: z.array(z.object({
        matchResponseCodes: z.unknown().describe(
          "Valid values include: - A number between 400 and 599: For example 401 or 503, in which case the load balancer applies the policy if the error code exactly matches this value. - 5xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 500 to 599. - 4xx: Load Balancer will apply the policy if the backend service responds with any response code in the range of 400 to 499. Values must be unique within matchResponseCodes and across allerrorResponseRules ofCustomErrorResponsePolicy.",
        ).optional(),
        overrideResponseCode: z.unknown().describe(
          "The HTTP status code returned with the response containing the custom error content. If overrideResponseCode is not supplied, the same response code returned by the original backend bucket or backend service is returned to the client.",
        ).optional(),
        path: z.unknown().describe(
          "The full path to a file within backendBucket. For example:/errors/defaultError.html path must start with a leading slash. path cannot have trailing slashes. If the file is not available in backendBucket or the load balancer cannot reach the BackendBucket, a simpleNot Found Error is returned to the client. The value must be from 1 to 1024 characters",
        ).optional(),
      })).describe(
        "Specifies rules for returning error responses. In a given policy, if you specify rules for both a range of error codes as well as rules for specific error codes then rules with specific error codes have a higher priority. For example, assume that you configure a rule for 401 (Un-authorized) code, and another for all 4 series error codes (4XX). If the backend service returns a401, then the rule for 401 will be applied. However if the backend service returns a 403, the rule for4xx takes effect.",
      ).optional(),
      errorService: z.string().describe(
        "The full or partial URL to the BackendBucket resource that contains the custom error content. Examples are: - https://www.googleapis.com/compute/v1/projects/project/global/backendBuckets/myBackendBucket - compute/v1/projects/project/global/backendBuckets/myBackendBucket - global/backendBuckets/myBackendBucket If errorService is not specified at lower levels likepathMatcher, pathRule and routeRule, an errorService specified at a higher level in theUrlMap will be used. IfUrlMap.defaultCustomErrorResponsePolicy contains one or moreerrorResponseRules[], it must specifyerrorService. If load balancer cannot reach the backendBucket, a simple Not Found Error will be returned, with the original response code (oroverrideResponseCode if configured). errorService is not supported for internal or regionalHTTP/HTTPS load balancers.",
      ).optional(),
    }).describe(
      "Specifies the custom error response policy that must be applied when the backend service or backend bucket responds with an error.",
    ).optional(),
    defaultRouteAction: z.object({
      corsPolicy: z.object({
        allowCredentials: z.boolean().describe(
          "In response to a preflight request, setting this to true indicates that the actual request can include user credentials. This field translates to the Access-Control-Allow-Credentials header. Default is false.",
        ).optional(),
        allowHeaders: z.array(z.unknown()).describe(
          "Specifies the content for the Access-Control-Allow-Headers header.",
        ).optional(),
        allowMethods: z.array(z.unknown()).describe(
          "Specifies the content for the Access-Control-Allow-Methods header.",
        ).optional(),
        allowOriginRegexes: z.array(z.unknown()).describe(
          "Specifies a regular expression that matches allowed origins. For more information, see regular expression syntax. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes. Regular expressions can only be used when the loadBalancingScheme is set to INTERNAL_SELF_MANAGED.",
        ).optional(),
        allowOrigins: z.array(z.unknown()).describe(
          "Specifies the list of origins that is allowed to do CORS requests. An origin is allowed if it matches either an item inallowOrigins or an item inallowOriginRegexes.",
        ).optional(),
        disabled: z.boolean().describe(
          "If true, disables the CORS policy. The default value is false, which indicates that the CORS policy is in effect.",
        ).optional(),
        exposeHeaders: z.array(z.unknown()).describe(
          "Specifies the content for the Access-Control-Expose-Headers header.",
        ).optional(),
        maxAge: z.number().int().describe(
          "Specifies how long results of a preflight request can be cached in seconds. This field translates to the Access-Control-Max-Age header.",
        ).optional(),
      }).describe(
        "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard.",
      ).optional(),
      faultInjectionPolicy: z.object({
        abort: z.object({
          httpStatus: z.unknown().describe(
            "The HTTP status code used to abort the request. The value must be from 200 to 599 inclusive. For gRPC protocol, the gRPC status code is mapped to HTTP status code according to this mapping table. HTTP status 200 is mapped to gRPC status UNKNOWN. Injecting an OK status is currently not supported by Traffic Director.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic for connections, operations, or requests that is aborted as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
          ).optional(),
        }).describe(
          "Specification for how requests are aborted as part of fault injection.",
        ).optional(),
        delay: z.object({
          fixedDelay: z.unknown().describe(
            'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic for connections, operations, or requests for which a delay is introduced as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
          ).optional(),
        }).describe(
          "Specifies the delay introduced by the load balancer before forwarding the request to the backend service as part of fault injection.",
        ).optional(),
      }).describe(
        "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by the load balancer on a percentage of requests before sending those request to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.",
      ).optional(),
      maxStreamDuration: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
      ).optional(),
      requestMirrorPolicy: z.object({
        backendService: z.string().describe(
          "The full or partial URL to the BackendService resource being mirrored to. The backend service configured for a mirroring policy must reference backends that are of the same type as the original backend service matched in the URL map. Serverless NEG backends are not currently supported as a mirrored backend service.",
        ).optional(),
        mirrorPercent: z.number().describe(
          "The percentage of requests to be mirrored to `backend_service`.",
        ).optional(),
      }).describe(
        "A policy that specifies how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer doesn't wait for responses from the shadow service. Before sending traffic to the shadow service, the host or authority header is suffixed with-shadow.",
      ).optional(),
      retryPolicy: z.object({
        numRetries: z.number().int().describe(
          "Specifies the allowed number retries. This number must be > 0. If not specified, defaults to 1.",
        ).optional(),
        perTryTimeout: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        retryConditions: z.array(z.unknown()).describe(
          "Specifies one or more conditions when this retry policy applies. Valid values are: - 5xx: retry is attempted if the instance or endpoint responds with any 5xx response code, or if the instance or endpoint does not respond at all. For example, disconnects, reset, read timeout, connection failure, and refused streams. - gateway-error: Similar to 5xx, but only applies to response codes 502, 503 or504. - connect-failure: a retry is attempted on failures connecting to the instance or endpoint. For example, connection timeouts. - retriable-4xx: a retry is attempted if the instance or endpoint responds with a 4xx response code. The only error that you can retry is error code 409. - refused-stream: a retry is attempted if the instance or endpoint resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: a retry is attempted if the gRPC status code in the response header is set to cancelled. - deadline-exceeded: a retry is attempted if the gRPC status code in the response header is set todeadline-exceeded. - internal: a retry is attempted if the gRPC status code in the response header is set tointernal. - resource-exhausted: a retry is attempted if the gRPC status code in the response header is set toresource-exhausted. - unavailable: a retry is attempted if the gRPC status code in the response header is set tounavailable. Only the following codes are supported when the URL map is bound to target gRPC proxy that has validateForProxyless field set to true. - cancelled - deadline-exceeded - internal - resource-exhausted - unavailable",
        ).optional(),
      }).describe("The retry policy associates with HttpRouteRule").optional(),
      timeout: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
      ).optional(),
      urlRewrite: z.object({
        hostRewrite: z.string().describe(
          "Before forwarding the request to the selected service, the request's host header is replaced with contents of hostRewrite. The value must be from 1 to 255 characters.",
        ).optional(),
        pathPrefixRewrite: z.string().describe(
          "Before forwarding the request to the selected backend service, the matching portion of the request's path is replaced bypathPrefixRewrite. The value must be from 1 to 1024 characters.",
        ).optional(),
        pathTemplateRewrite: z.string().describe(
          "If specified, the pattern rewrites the URL path (based on the:path header) using the HTTP template syntax. A corresponding path_template_match must be specified. Any template variables must exist in the path_template_match field. - -At least one variable must be specified in the path_template_match field - You can omit variables from the rewritten URL - The * and ** operators cannot be matched unless they have a corresponding variable name - e.g. {format=*} or {var=**}. For example, a path_template_match of /static/{format=**} could be rewritten as /static/content/{format} to prefix/content to the URL. Variables can also be re-ordered in a rewrite, so that /{country}/{format}/{suffix=**} can be rewritten as /content/{format}/{country}/{suffix}. At least one non-empty routeRules[].matchRules[].path_template_match is required. Only one of path_prefix_rewrite orpath_template_rewrite may be specified.",
        ).optional(),
      }).describe(
        "The spec for modifying the path before sending the request to the matched backend service.",
      ).optional(),
      weightedBackendServices: z.array(z.object({
        backendService: z.unknown().describe(
          "The full or partial URL to the default BackendService resource. Before forwarding the request to backendService, the load balancer applies any relevant headerActions specified as part of thisbackendServiceWeight.",
        ).optional(),
        headerAction: z.unknown().describe(
          "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
        ).optional(),
        weight: z.unknown().describe(
          "Specifies the fraction of traffic sent to a backend service, computed asweight / (sum of all weightedBackendService weights in routeAction). The selection of a backend service is determined only for new traffic. Once a user's request has been directed to a backend service, subsequent requests are sent to the same backend service as determined by the backend service's session affinity policy. Don't configure session affinity if you're using weighted traffic splitting. If you do, the weighted traffic splitting configuration takes precedence. The value must be from 0 to 1000.",
        ).optional(),
      })).describe(
        "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
      ).optional(),
    }).optional(),
    defaultService: z.string().describe(
      "The full or partial URL to the BackendService resource. This URL is used if none of the pathRules orrouteRules defined by this PathMatcher are matched. For example, the following are all valid URLs to a BackendService resource: - https://www.googleapis.com/compute/v1/projects/project/global/backendServices/backendService - compute/v1/projects/project/global/backendServices/backendService - global/backendServices/backendService If defaultRouteAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Authorization requires one or more of the following Google IAM permissions on the specified resource default_service: - compute.backendBuckets.use - compute.backendServices.use",
    ).optional(),
    defaultUrlRedirect: z.object({
      hostRedirect: z.string().describe(
        "The host that is used in the redirect response instead of the one that was supplied in the request. The value must be from 1 to 255 characters.",
      ).optional(),
      httpsRedirect: z.boolean().describe(
        "If set to true, the URL scheme in the redirected request is set to HTTPS. If set to false, the URL scheme of the redirected request remains the same as that of the request. This must only be set for URL maps used inTargetHttpProxys. Setting this true forTargetHttpsProxy is not permitted. The default is set to false.",
      ).optional(),
      pathRedirect: z.string().describe(
        "The path that is used in the redirect response instead of the one that was supplied in the request. pathRedirect cannot be supplied together withprefixRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
      ).optional(),
      prefixRedirect: z.string().describe(
        "The prefix that replaces the prefixMatch specified in the HttpRouteRuleMatch, retaining the remaining portion of the URL before redirecting the request. prefixRedirect cannot be supplied together withpathRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
      ).optional(),
      redirectResponseCode: z.enum([
        "FOUND",
        "MOVED_PERMANENTLY_DEFAULT",
        "PERMANENT_REDIRECT",
        "SEE_OTHER",
        "TEMPORARY_REDIRECT",
      ]).describe(
        "The HTTP Status code to use for this RedirectAction. Supported values are: - MOVED_PERMANENTLY_DEFAULT, which is the default value and corresponds to 301. - FOUND, which corresponds to 302. - SEE_OTHER which corresponds to 303. - TEMPORARY_REDIRECT, which corresponds to 307. In this case, the request method is retained. - PERMANENT_REDIRECT, which corresponds to 308. In this case, the request method is retained.",
      ).optional(),
      stripQuery: z.boolean().describe(
        "If set to true, any accompanying query portion of the original URL is removed before redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
      ).optional(),
    }).describe("Specifies settings for an HTTP redirect.").optional(),
    description: z.string().describe(
      "An optional description of this resource. Provide this property when you create the resource.",
    ).optional(),
    headerAction: z.object({
      requestHeadersToAdd: z.array(z.object({
        headerName: z.unknown().describe("The name of the header.").optional(),
        headerValue: z.unknown().describe("The value of the header to add.")
          .optional(),
        replace: z.unknown().describe(
          "If false, headerValue is appended to any values that already exist for the header. If true, headerValue is set for the header, discarding any values that were set for that header. The default value is true, unless a variable is present in headerValue, in which case the default value is false..",
        ).optional(),
      })).describe(
        "Headers to add to a matching request before forwarding the request to thebackendService.",
      ).optional(),
      requestHeadersToRemove: z.array(z.string()).describe(
        "A list of header names for headers that need to be removed from the request before forwarding the request to the backendService.",
      ).optional(),
      responseHeadersToAdd: z.array(z.object({
        headerName: z.unknown().describe("The name of the header.").optional(),
        headerValue: z.unknown().describe("The value of the header to add.")
          .optional(),
        replace: z.unknown().describe(
          "If false, headerValue is appended to any values that already exist for the header. If true, headerValue is set for the header, discarding any values that were set for that header. The default value is true, unless a variable is present in headerValue, in which case the default value is false..",
        ).optional(),
      })).describe(
        "Headers to add the response before sending the response back to the client.",
      ).optional(),
      responseHeadersToRemove: z.array(z.string()).describe(
        "A list of header names for headers that need to be removed from the response before sending the response back to the client.",
      ).optional(),
    }).describe(
      "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
    ).optional(),
    name: z.string().describe(
      "The name to which this PathMatcher is referred by theHostRule.",
    ).optional(),
    pathRules: z.array(z.object({
      customErrorResponsePolicy: z.object({
        errorResponseRules: z.unknown().describe(
          "Specifies rules for returning error responses. In a given policy, if you specify rules for both a range of error codes as well as rules for specific error codes then rules with specific error codes have a higher priority. For example, assume that you configure a rule for 401 (Un-authorized) code, and another for all 4 series error codes (4XX). If the backend service returns a401, then the rule for 401 will be applied. However if the backend service returns a 403, the rule for4xx takes effect.",
        ).optional(),
        errorService: z.unknown().describe(
          "The full or partial URL to the BackendBucket resource that contains the custom error content. Examples are: - https://www.googleapis.com/compute/v1/projects/project/global/backendBuckets/myBackendBucket - compute/v1/projects/project/global/backendBuckets/myBackendBucket - global/backendBuckets/myBackendBucket If errorService is not specified at lower levels likepathMatcher, pathRule and routeRule, an errorService specified at a higher level in theUrlMap will be used. IfUrlMap.defaultCustomErrorResponsePolicy contains one or moreerrorResponseRules[], it must specifyerrorService. If load balancer cannot reach the backendBucket, a simple Not Found Error will be returned, with the original response code (oroverrideResponseCode if configured). errorService is not supported for internal or regionalHTTP/HTTPS load balancers.",
        ).optional(),
      }).describe(
        "Specifies the custom error response policy that must be applied when the backend service or backend bucket responds with an error.",
      ).optional(),
      paths: z.array(z.unknown()).describe(
        "The list of path patterns to match. Each must start with / and the only place a * is allowed is at the end following a /. The string fed to the path matcher does not include any text after the first? or #, and those chars are not allowed here.",
      ).optional(),
      routeAction: z.object({
        corsPolicy: z.unknown().describe(
          "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard.",
        ).optional(),
        faultInjectionPolicy: z.unknown().describe(
          "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by the load balancer on a percentage of requests before sending those request to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.",
        ).optional(),
        maxStreamDuration: z.unknown().describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        requestMirrorPolicy: z.unknown().describe(
          "A policy that specifies how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer doesn't wait for responses from the shadow service. Before sending traffic to the shadow service, the host or authority header is suffixed with-shadow.",
        ).optional(),
        retryPolicy: z.unknown().describe(
          "The retry policy associates with HttpRouteRule",
        ).optional(),
        timeout: z.unknown().describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        urlRewrite: z.unknown().describe(
          "The spec for modifying the path before sending the request to the matched backend service.",
        ).optional(),
        weightedBackendServices: z.unknown().describe(
          "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
        ).optional(),
      }).optional(),
      service: z.string().describe(
        "The full or partial URL of the backend service resource to which traffic is directed if this rule is matched. If routeAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set.",
      ).optional(),
      urlRedirect: z.object({
        hostRedirect: z.unknown().describe(
          "The host that is used in the redirect response instead of the one that was supplied in the request. The value must be from 1 to 255 characters.",
        ).optional(),
        httpsRedirect: z.unknown().describe(
          "If set to true, the URL scheme in the redirected request is set to HTTPS. If set to false, the URL scheme of the redirected request remains the same as that of the request. This must only be set for URL maps used inTargetHttpProxys. Setting this true forTargetHttpsProxy is not permitted. The default is set to false.",
        ).optional(),
        pathRedirect: z.unknown().describe(
          "The path that is used in the redirect response instead of the one that was supplied in the request. pathRedirect cannot be supplied together withprefixRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
        ).optional(),
        prefixRedirect: z.unknown().describe(
          "The prefix that replaces the prefixMatch specified in the HttpRouteRuleMatch, retaining the remaining portion of the URL before redirecting the request. prefixRedirect cannot be supplied together withpathRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
        ).optional(),
        redirectResponseCode: z.unknown().describe(
          "The HTTP Status code to use for this RedirectAction. Supported values are: - MOVED_PERMANENTLY_DEFAULT, which is the default value and corresponds to 301. - FOUND, which corresponds to 302. - SEE_OTHER which corresponds to 303. - TEMPORARY_REDIRECT, which corresponds to 307. In this case, the request method is retained. - PERMANENT_REDIRECT, which corresponds to 308. In this case, the request method is retained.",
        ).optional(),
        stripQuery: z.unknown().describe(
          "If set to true, any accompanying query portion of the original URL is removed before redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
        ).optional(),
      }).describe("Specifies settings for an HTTP redirect.").optional(),
    })).describe(
      'The list of path rules. Use this list instead of routeRules when routing based on simple path matching is all that\'s required. A path rule can only include a wildcard character (*) after a forward slash character ("/"). The order by which path rules are specified does not matter. Matches are always done on the longest-path-first basis. For example: a pathRule with a path /a/b/c/* will match before /a/b/* irrespective of the order in which those paths appear in this list. Within a given pathMatcher, only one ofpathRules or routeRules must be set.',
    ).optional(),
    routeRules: z.array(z.object({
      customErrorResponsePolicy: z.object({
        errorResponseRules: z.unknown().describe(
          "Specifies rules for returning error responses. In a given policy, if you specify rules for both a range of error codes as well as rules for specific error codes then rules with specific error codes have a higher priority. For example, assume that you configure a rule for 401 (Un-authorized) code, and another for all 4 series error codes (4XX). If the backend service returns a401, then the rule for 401 will be applied. However if the backend service returns a 403, the rule for4xx takes effect.",
        ).optional(),
        errorService: z.unknown().describe(
          "The full or partial URL to the BackendBucket resource that contains the custom error content. Examples are: - https://www.googleapis.com/compute/v1/projects/project/global/backendBuckets/myBackendBucket - compute/v1/projects/project/global/backendBuckets/myBackendBucket - global/backendBuckets/myBackendBucket If errorService is not specified at lower levels likepathMatcher, pathRule and routeRule, an errorService specified at a higher level in theUrlMap will be used. IfUrlMap.defaultCustomErrorResponsePolicy contains one or moreerrorResponseRules[], it must specifyerrorService. If load balancer cannot reach the backendBucket, a simple Not Found Error will be returned, with the original response code (oroverrideResponseCode if configured). errorService is not supported for internal or regionalHTTP/HTTPS load balancers.",
        ).optional(),
      }).describe(
        "Specifies the custom error response policy that must be applied when the backend service or backend bucket responds with an error.",
      ).optional(),
      description: z.string().describe(
        "The short description conveying the intent of this routeRule. The description can have a maximum length of 1024 characters.",
      ).optional(),
      headerAction: z.object({
        requestHeadersToAdd: z.unknown().describe(
          "Headers to add to a matching request before forwarding the request to thebackendService.",
        ).optional(),
        requestHeadersToRemove: z.unknown().describe(
          "A list of header names for headers that need to be removed from the request before forwarding the request to the backendService.",
        ).optional(),
        responseHeadersToAdd: z.unknown().describe(
          "Headers to add the response before sending the response back to the client.",
        ).optional(),
        responseHeadersToRemove: z.unknown().describe(
          "A list of header names for headers that need to be removed from the response before sending the response back to the client.",
        ).optional(),
      }).describe(
        "The request and response header transformations that take effect before the request is passed along to the selected backendService.",
      ).optional(),
      matchRules: z.array(z.unknown()).describe(
        "The list of criteria for matching attributes of a request to thisrouteRule. This list has OR semantics: the request matches this routeRule when any of thematchRules are satisfied. However predicates within a given matchRule have AND semantics. All predicates within a matchRule must match for the request to match the rule.",
      ).optional(),
      priority: z.number().int().describe(
        "For routeRules within a given pathMatcher, priority determines the order in which a load balancer interpretsrouteRules. RouteRules are evaluated in order of priority, from the lowest to highest number. The priority of a rule decreases as its number increases (1, 2, 3, N+1). The first rule that matches the request is applied. You cannot configure two or more routeRules with the same priority. Priority for each rule must be set to a number from 0 to 2147483647 inclusive. Priority numbers can have gaps, which enable you to add or remove rules in the future without affecting the rest of the rules. For example, 1, 2, 3, 4, 5, 9, 12, 16 is a valid series of priority numbers to which you could add rules numbered from 6 to 8, 10 to 11, and 13 to 15 in the future without any impact on existing rules.",
      ).optional(),
      routeAction: z.object({
        corsPolicy: z.unknown().describe(
          "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard.",
        ).optional(),
        faultInjectionPolicy: z.unknown().describe(
          "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by the load balancer on a percentage of requests before sending those request to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.",
        ).optional(),
        maxStreamDuration: z.unknown().describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        requestMirrorPolicy: z.unknown().describe(
          "A policy that specifies how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer doesn't wait for responses from the shadow service. Before sending traffic to the shadow service, the host or authority header is suffixed with-shadow.",
        ).optional(),
        retryPolicy: z.unknown().describe(
          "The retry policy associates with HttpRouteRule",
        ).optional(),
        timeout: z.unknown().describe(
          'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
        ).optional(),
        urlRewrite: z.unknown().describe(
          "The spec for modifying the path before sending the request to the matched backend service.",
        ).optional(),
        weightedBackendServices: z.unknown().describe(
          "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
        ).optional(),
      }).optional(),
      service: z.string().describe(
        "The full or partial URL of the backend service resource to which traffic is directed if this rule is matched. If routeAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set.",
      ).optional(),
      urlRedirect: z.object({
        hostRedirect: z.unknown().describe(
          "The host that is used in the redirect response instead of the one that was supplied in the request. The value must be from 1 to 255 characters.",
        ).optional(),
        httpsRedirect: z.unknown().describe(
          "If set to true, the URL scheme in the redirected request is set to HTTPS. If set to false, the URL scheme of the redirected request remains the same as that of the request. This must only be set for URL maps used inTargetHttpProxys. Setting this true forTargetHttpsProxy is not permitted. The default is set to false.",
        ).optional(),
        pathRedirect: z.unknown().describe(
          "The path that is used in the redirect response instead of the one that was supplied in the request. pathRedirect cannot be supplied together withprefixRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
        ).optional(),
        prefixRedirect: z.unknown().describe(
          "The prefix that replaces the prefixMatch specified in the HttpRouteRuleMatch, retaining the remaining portion of the URL before redirecting the request. prefixRedirect cannot be supplied together withpathRedirect. Supply one alone or neither. If neither is supplied, the path of the original request is used for the redirect. The value must be from 1 to 1024 characters.",
        ).optional(),
        redirectResponseCode: z.unknown().describe(
          "The HTTP Status code to use for this RedirectAction. Supported values are: - MOVED_PERMANENTLY_DEFAULT, which is the default value and corresponds to 301. - FOUND, which corresponds to 302. - SEE_OTHER which corresponds to 303. - TEMPORARY_REDIRECT, which corresponds to 307. In this case, the request method is retained. - PERMANENT_REDIRECT, which corresponds to 308. In this case, the request method is retained.",
        ).optional(),
        stripQuery: z.unknown().describe(
          "If set to true, any accompanying query portion of the original URL is removed before redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false.",
        ).optional(),
      }).describe("Specifies settings for an HTTP redirect.").optional(),
    })).describe(
      "The list of HTTP route rules. Use this list instead ofpathRules when advanced route matching and routing actions are desired. routeRules are evaluated in order of priority, from the lowest to highest number. Within a given pathMatcher, you can set only one ofpathRules or routeRules.",
    ).optional(),
  })).describe("The list of named PathMatchers to use against the URL.")
    .optional(),
  tests: z.array(z.object({
    description: z.string().describe("Description of this test case.")
      .optional(),
    expectedOutputUrl: z.string().describe(
      "The expected output URL evaluated by the load balancer containing the scheme, host, path and query parameters. For rules that forward requests to backends, the test passes only whenexpectedOutputUrl matches the request forwarded by the load balancer to backends. For rules with urlRewrite, the test verifies that the forwarded request matcheshostRewrite and pathPrefixRewrite in theurlRewrite action. When service is specified,expectedOutputUrl`s scheme is ignored. For rules with urlRedirect, the test passes only ifexpectedOutputUrl matches the URL in the load balancer's redirect response. If urlRedirect specifieshttps_redirect, the test passes only if the scheme inexpectedOutputUrl is also set to HTTPS. If urlRedirect specifies strip_query, the test passes only if expectedOutputUrl does not contain any query parameters. expectedOutputUrl is optional whenservice is specified.",
    ).optional(),
    expectedRedirectResponseCode: z.number().int().describe(
      "For rules with urlRedirect, the test passes only ifexpectedRedirectResponseCode matches the HTTP status code in load balancer's redirect response. expectedRedirectResponseCode cannot be set whenservice is set.",
    ).optional(),
    headers: z.array(z.object({
      name: z.string().describe("Header name.").optional(),
      value: z.string().describe("Header value.").optional(),
    })).describe(
      "HTTP headers for this request. If headers contains a host header, then host must also match the header value.",
    ).optional(),
    host: z.string().describe(
      "Host portion of the URL. If headers contains a host header, then host must also match the header value.",
    ).optional(),
    path: z.string().describe("Path portion of the URL.").optional(),
    service: z.string().describe(
      "Expected BackendService or BackendBucket resource the given URL should be mapped to. The service field cannot be set if expectedRedirectResponseCode is set.",
    ).optional(),
  })).describe(
    "The list of expected URL mapping tests. Request to update theUrlMap succeeds only if all test cases pass. You can specify a maximum of 100 tests per UrlMap. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine UrlMaps. Registered at `@swamp/gcp/compute/urlmaps`. */
export const model = {
  type: "@swamp/gcp/compute/urlmaps",
  version: "2026.05.25.2",
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
      toVersion: "2026.04.14.1",
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
    {
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a URL Map resource. Compute Engine has two URL Map resources: * [G...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a urlMaps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["defaultCustomErrorResponsePolicy"] !== undefined) {
          body["defaultCustomErrorResponsePolicy"] =
            g["defaultCustomErrorResponsePolicy"];
        }
        if (g["defaultRouteAction"] !== undefined) {
          body["defaultRouteAction"] = g["defaultRouteAction"];
        }
        if (g["defaultService"] !== undefined) {
          body["defaultService"] = g["defaultService"];
        }
        if (g["defaultUrlRedirect"] !== undefined) {
          body["defaultUrlRedirect"] = g["defaultUrlRedirect"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["headerAction"] !== undefined) {
          body["headerAction"] = g["headerAction"];
        }
        if (g["hostRules"] !== undefined) body["hostRules"] = g["hostRules"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pathMatchers"] !== undefined) {
          body["pathMatchers"] = g["pathMatchers"];
        }
        if (g["tests"] !== undefined) body["tests"] = g["tests"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["urlMap"] = String(g["name"]);
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
      description: "Get a urlMaps",
      arguments: z.object({
        identifier: z.string().describe("The name of the urlMaps"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["urlMap"] = args.identifier;
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
      description: "Update urlMaps attributes",
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
        params["urlMap"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["defaultCustomErrorResponsePolicy"] !== undefined) {
          body["defaultCustomErrorResponsePolicy"] =
            g["defaultCustomErrorResponsePolicy"];
        }
        if (g["defaultRouteAction"] !== undefined) {
          body["defaultRouteAction"] = g["defaultRouteAction"];
        }
        if (g["defaultService"] !== undefined) {
          body["defaultService"] = g["defaultService"];
        }
        if (g["defaultUrlRedirect"] !== undefined) {
          body["defaultUrlRedirect"] = g["defaultUrlRedirect"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["headerAction"] !== undefined) {
          body["headerAction"] = g["headerAction"];
        }
        if (g["hostRules"] !== undefined) body["hostRules"] = g["hostRules"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pathMatchers"] !== undefined) {
          body["pathMatchers"] = g["pathMatchers"];
        }
        if (g["tests"] !== undefined) body["tests"] = g["tests"];
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
      description: "Delete the urlMaps",
      arguments: z.object({
        identifier: z.string().describe("The name of the urlMaps"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["urlMap"] = args.identifier;
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
      description: "Sync urlMaps state from GCP",
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
          params["urlMap"] = identifier;
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
      description: "List urlMaps resources",
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
    invalidate_cache: {
      description: "invalidate cache",
      arguments: z.object({
        cacheTags: z.any().optional(),
        host: z.any().optional(),
        path: z.any().optional(),
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
        params["urlMap"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["cacheTags"] !== undefined) {
          body["cacheTags"] = args["cacheTags"];
        }
        if (args["host"] !== undefined) body["host"] = args["host"];
        if (args["path"] !== undefined) body["path"] = args["path"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.urlMaps.invalidateCache",
            "path":
              "projects/{project}/global/urlMaps/{urlMap}/invalidateCache",
            "httpMethod": "POST",
            "parameterOrder": ["project", "urlMap"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "urlMap": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
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
            "id": "compute.urlMaps.testIamPermissions",
            "path":
              "projects/{project}/global/urlMaps/{resource}/testIamPermissions",
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
    validate: {
      description: "validate",
      arguments: z.object({
        loadBalancingSchemes: z.any().optional(),
        resource: z.any().optional(),
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
        params["urlMap"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["loadBalancingSchemes"] !== undefined) {
          body["loadBalancingSchemes"] = args["loadBalancingSchemes"];
        }
        if (args["resource"] !== undefined) body["resource"] = args["resource"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.urlMaps.validate",
            "path": "projects/{project}/global/urlMaps/{urlMap}/validate",
            "httpMethod": "POST",
            "parameterOrder": ["project", "urlMap"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "urlMap": { "location": "path", "required": true },
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
