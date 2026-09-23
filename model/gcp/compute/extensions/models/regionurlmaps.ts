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

// Auto-generated extension model for @swamp/gcp/compute/regionurlmaps
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RegionUrlMaps.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.regionUrlMaps.get",
  "path": "projects/{project}/regions/{region}/urlMaps/{urlMap}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "urlMap",
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
    "urlMap": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.regionUrlMaps.insert",
  "path": "projects/{project}/regions/{region}/urlMaps",
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

const UPDATE_CONFIG = {
  "id": "compute.regionUrlMaps.update",
  "path": "projects/{project}/regions/{region}/urlMaps/{urlMap}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "region",
    "urlMap",
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
    "urlMap": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.regionUrlMaps.delete",
  "path": "projects/{project}/regions/{region}/urlMaps/{urlMap}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "urlMap",
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
    "urlMap": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.regionUrlMaps.list",
  "path": "projects/{project}/regions/{region}/urlMaps",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
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
    "defaultCustomErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. This policy takes effect at the load balancer level and applies only when no policy has been defined for the error code at lower levels like PathMatcher, RouteRule and PathRule within this UrlMap. For example, consider a UrlMap with the following configuration: - defaultCustomErrorResponsePolicy containing policies for responding to 5xx and 4xx errors - A PathMatcher configured for *.example.com has defaultCustomErrorResponsePolicy for 4xx. If a request for http://www.example.com/ encounters a404, the policy inpathMatcher.defaultCustomErrorResponsePolicy will be enforced. When the request for http://www.example.com/ encounters a502, the policy inUrlMap.defaultCustomErrorResponsePolicy will be enforced. When a request that does not match any host in *.example.com such as http://www.myotherexample.com/, encounters a404, UrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withdefaultRouteAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thedefaultCustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the defaultCustomErrorResponsePolicy is ignored and the response from the service is returned to the client. defaultCustomErrorResponsePolicy is supported only for global external Application Load Balancers.",
  ).optional(),
  defaultRouteAction: z.object({
    cachePolicy: z.object({
      cacheBypassRequestHeaderNames: z.array(z.string()).describe(
        "Bypass the cache when the specified request headers are matched by name, e.g. Pragma or Authorization headers. Values are case-insensitive. Up to 5 header names can be specified. The cache is bypassed for all `cacheMode` values.",
      ).optional(),
      cacheKeyPolicy: z.object({
        excludedQueryParameters: z.array(z.string()).describe(
          "Names of query string parameters to exclude in cache keys. All other parameters will be included. Either specify `excludedQueryParameters` or `includedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key.",
        ).optional(),
        includeHost: z.boolean().describe(
          "If true, requests to different hosts will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the host is never included in a Backend Bucket's cache key. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error.",
        ).optional(),
        includeProtocol: z.boolean().describe(
          "If true, http and https requests will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the protocol is never included in a Backend Bucket's cache key. Attempting to set on a route that points exclusively to Backend Buckets will result in a configuration error.",
        ).optional(),
        includeQueryString: z.boolean().describe(
          "If true, include query string parameters in the cache key according to `includedQueryParameters` and `excludedQueryParameters`. If neither is set, the entire query string will be included. If false, the query string will be excluded from the cache key entirely. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key.",
        ).optional(),
        includedCookieNames: z.array(z.string()).describe(
          "Allows HTTP cookies (by name) to be used in the cache key. The name=value pair will be used in the cache key Cloud CDN generates. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. Up to 5 cookie names can be specified.",
        ).optional(),
        includedHeaderNames: z.array(z.string()).describe(
          "Allows HTTP request headers (by name) to be used in the cache key.",
        ).optional(),
        includedQueryParameters: z.array(z.string()).describe(
          "Names of query string parameters to include in cache keys. All other parameters will be excluded. Either specify `includedQueryParameters` or `excludedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters.",
        ).optional(),
      }).describe(
        "The cache key configuration. If not specified, the default behavior depends on the backend type: for Backend Services, the complete request URI is used; for Backend Buckets, the request URI is used without the protocol or host, and only query parameters known to Cloud Storage are included.",
      ).optional(),
      cacheMode: z.enum([
        "CACHE_ALL_STATIC",
        "FORCE_CACHE_ALL",
        "USE_ORIGIN_HEADERS",
      ]).describe(
        "Specifies the cache setting for all responses from this route. If not specified, Cloud CDN uses `CACHE_ALL_STATIC` mode.",
      ).optional(),
      clientTtl: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'Specifies a separate client (e.g. browser client) maximum TTL for cached content. This is used to clamp the max-age (or Expires) value sent to the client. With `FORCE_CACHE_ALL`, the lesser of `clientTtl` and `defaultTtl` is used for the response max-age directive, along with a "public" directive. For cacheable content in `CACHE_ALL_STATIC` mode, `clientTtl` clamps the max-age from the origin (if specified), or else sets the response max-age directive to the lesser of the `clientTtl` and `defaultTtl`, and also ensures a "public" cache-control directive is present. The maximum allowed value is 31,622,400s (1 year). If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` mode. Cannot exceed `maxTtl`. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`.',
      ).optional(),
      defaultTtl: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'Specifies the default TTL for cached content for responses that do not have an existing valid TTL (max-age or s-maxage). Setting a TTL of "0" means "always revalidate". The value of `defaultTtl` cannot be set to a value greater than that of `maxTtl`. When the `cacheMode` is set to `FORCE_CACHE_ALL`, the `defaultTtl` will overwrite the TTL set in all responses. The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` and `FORCE_CACHE_ALL` modes. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`.',
      ).optional(),
      maxTtl: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'Specifies the maximum allowed TTL for cached content. Cache directives that attempt to set a max-age or s-maxage higher than this, or an Expires header more than `maxTtl` seconds in the future will be capped at the value of `maxTtl`, as if it were the value of an s-maxage Cache-Control directive. Headers sent to the client will not be modified. Setting a TTL of "0" means "always revalidate". The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 86400s (1 day) for `CACHE_ALL_STATIC` mode. Can be specified only for `CACHE_ALL_STATIC` cache mode.',
      ).optional(),
      negativeCaching: z.boolean().describe(
        "Negative caching allows per-status code TTLs to be set, in order to apply fine-grained caching for common errors or redirects. This can reduce the load on your origin and improve end-user experience by reducing response latency. When the `cacheMode` is set to `CACHE_ALL_STATIC` or `USE_ORIGIN_HEADERS`, negative caching applies to responses with the specified response code that lack any Cache-Control, Expires, or Pragma: no-cache directives. When the `cacheMode` is set to `FORCE_CACHE_ALL`, negative caching applies to all responses with the specified response code, and overrides any caching headers. By default, Cloud CDN applies the following TTLs to these HTTP status codes: * 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m * 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal Reasons): 120s * 405 (Method Not Found), 501 (Not Implemented): 60s These defaults can be overridden in `negativeCachingPolicy`. If not specified, Cloud CDN applies negative caching by default.",
      ).optional(),
      negativeCachingPolicy: z.array(z.object({
        code: z.number().int().describe(
          "The HTTP status code to define a TTL against. Only HTTP status codes 300, 301, 302, 307, 308, 404, 405, 410, 421, 451 and 501 can be specified as values, and you cannot specify a status code more than once.",
        ).optional(),
        ttl: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          "The TTL (in seconds) for which to cache responses with the corresponding status code. The maximum allowed value is 1800s (30 minutes). Infrequently accessed objects may be evicted from the cache before the defined TTL.",
        ).optional(),
      })).describe(
        "Sets a cache TTL for the specified HTTP status code. `negativeCaching` must be enabled to configure `negativeCachingPolicy`. Omitting the policy and leaving `negativeCaching` enabled will use Cloud CDN's default cache TTLs. Note that when specifying an explicit `negativeCachingPolicy`, you should take care to specify a cache TTL for all response codes that you wish to cache. Cloud CDN will not apply any default negative caching when a policy exists.",
      ).optional(),
      requestCoalescing: z.boolean().describe(
        "If true then Cloud CDN will combine multiple concurrent cache fill requests into a small number of requests to the origin. If not specified, Cloud CDN applies request coalescing by default.",
      ).optional(),
      serveWhileStale: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'Serve existing content from the cache (if available) when revalidating content with the origin, or when an error is encountered when refreshing the cache. This setting defines the default "max-stale" duration for any cached responses that do not specify a max-stale directive. Stale responses that exceed the TTL configured here will not be served. The default limit (max-stale) is 86400s (1 day), which will allow stale content to be served up to this limit beyond the max-age (or s-maxage) of a cached response. The maximum allowed value is 604800 (1 week). Set this to zero (0) to disable serve-while-stale.',
      ).optional(),
    }).describe(
      "Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled.",
    ).optional(),
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
      "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy.",
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
        "The specification for how client requests are aborted as part of fault injection.",
      ).optional(),
      delay: z.object({
        fixedDelay: z.object({
          nanos: z.number().int().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.string().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe("Specifies the value of the fixed delay interval.")
          .optional(),
        percentage: z.number().describe(
          "The percentage of traffic for connections, operations, or requests for which a delay is introduced as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
        ).optional(),
      }).describe(
        "The specification for how client requests are delayed as part of fault injection, before being sent to a backend service.",
      ).optional(),
    }).describe(
      "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer. To see which load balancers support fault injection, see Load balancing: Routing and traffic management features.",
    ).optional(),
    maxStreamDuration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      "Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as*end-of-stream*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
    ).optional(),
    requestMirrorPolicy: z.object({
      backendService: z.string().describe(
        "The full or partial URL to the BackendService resource being mirrored to. The backend service configured for a mirroring policy must reference backends that are of the same type as the original backend service matched in the URL map. Serverless NEG backends are not currently supported as a mirrored backend service.",
      ).optional(),
      mirrorPercent: z.number().describe(
        "The percentage of requests to be mirrored to `backend_service`.",
      ).optional(),
    }).describe(
      "Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
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
        "Specifies a non-zero timeout per retry attempt. If not specified, will use the timeout set in theHttpRouteAction field. If timeout in the HttpRouteAction field is not set, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
      ).optional(),
      retryConditions: z.array(z.string()).describe(
        "Specifies one or more conditions when this retry policy applies. Valid values are: - 5xx: retry is attempted if the instance or endpoint responds with any 5xx response code, or if the instance or endpoint does not respond at all. For example, disconnects, reset, read timeout, connection failure, and refused streams. - gateway-error: Similar to 5xx, but only applies to response codes 502, 503 or504. - connect-failure: a retry is attempted on failures connecting to the instance or endpoint. For example, connection timeouts. - retriable-4xx: a retry is attempted if the instance or endpoint responds with a 4xx response code. The only error that you can retry is error code 409. - refused-stream: a retry is attempted if the instance or endpoint resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: a retry is attempted if the gRPC status code in the response header is set to cancelled. - deadline-exceeded: a retry is attempted if the gRPC status code in the response header is set todeadline-exceeded. - internal: a retry is attempted if the gRPC status code in the response header is set tointernal. - resource-exhausted: a retry is attempted if the gRPC status code in the response header is set toresource-exhausted. - unavailable: a retry is attempted if the gRPC status code in the response header is set tounavailable. Only the following codes are supported when the URL map is bound to target gRPC proxy that has validateForProxyless field set to true. - cancelled - deadline-exceeded - internal - resource-exhausted - unavailable",
      ).optional(),
    }).describe("Specifies the retry policy associated with this route.")
      .optional(),
    timeout: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      "Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as *end-of-stream*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
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
      regexRewrite: z.object({
        pathPattern: z.string().describe(
          "Required. The regular expression used to match against the URL path. It uses RE2 syntax with the following constraints: - Any single character operators - Groups are allowed to have only submatch operator inside - Groups are allowed only without any char repetition, e.g..* - Any char repetition, e.g..*, is only allowed to be used in a single regex together with: - Empty string operators - Other repetitions - Ranges - Repetitions of ranges - Ranges are only allowed to have: - Character range - Digits range - Symbols listed in characters allowed for ranges",
        ).optional(),
        pathSubstitution: z.string().describe(
          "Required. Required when path pattern is specified. Used to rewrite matching parts of the path.",
        ).optional(),
      }).describe(
        "The regex rewrite to be applied to the URL. Only one ofpathPrefixRewrite, pathTemplateRewrite, orregexRewrite may be specified.",
      ).optional(),
    }).describe(
      "The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
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
        "Specifies changes to request and response headers that need to take effect for the selected backendService. headerAction specified here take effect beforeheaderAction in the enclosing HttpRouteRule,PathMatcher and UrlMap. headerAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
      ).optional(),
      weight: z.number().int().describe(
        "Specifies the fraction of traffic sent to a backend service, computed asweight / (sum of all weightedBackendService weights in routeAction). The selection of a backend service is determined only for new traffic. Once a user's request has been directed to a backend service, subsequent requests are sent to the same backend service as determined by the backend service's session affinity policy. Don't configure session affinity if you're using weighted traffic splitting. If you do, the weighted traffic splitting configuration takes precedence. The value must be from 0 to 1000.",
      ).optional(),
    })).describe(
      "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
    ).optional(),
  }).describe(
    "defaultRouteAction takes effect when none of the hostRules match. The load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within defaultRouteAction. defaultRouteAction has no effect when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
  ).optional(),
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
  }).describe(
    "When none of the specified hostRules match, the request is redirected to a URL specified by defaultUrlRedirect. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy.",
  ).optional(),
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
    "Specifies changes to request and response headers that need to take effect for the selected backendService. The headerAction specified here take effect afterheaderAction specified under pathMatcher. headerAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
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
      "defaultCustomErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. This policy takes effect at the PathMatcher level and applies only when no policy has been defined for the error code at lower levels likeRouteRule and PathRule within thisPathMatcher. If an error code does not have a policy defined in defaultCustomErrorResponsePolicy, then a policy defined for the error code in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy is configured with policies for 5xx and 4xx errors - A RouteRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in RouteRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withpathMatcher.defaultRouteAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thedefaultCustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the defaultCustomErrorResponsePolicy is ignored and the response from the service is returned to the client. defaultCustomErrorResponsePolicy is supported only for global external Application Load Balancers.",
    ).optional(),
    defaultRouteAction: z.object({
      cachePolicy: z.object({
        cacheBypassRequestHeaderNames: z.array(z.unknown()).describe(
          "Bypass the cache when the specified request headers are matched by name, e.g. Pragma or Authorization headers. Values are case-insensitive. Up to 5 header names can be specified. The cache is bypassed for all `cacheMode` values.",
        ).optional(),
        cacheKeyPolicy: z.object({
          excludedQueryParameters: z.unknown().describe(
            "Names of query string parameters to exclude in cache keys. All other parameters will be included. Either specify `excludedQueryParameters` or `includedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key.",
          ).optional(),
          includeHost: z.unknown().describe(
            "If true, requests to different hosts will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the host is never included in a Backend Bucket's cache key. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error.",
          ).optional(),
          includeProtocol: z.unknown().describe(
            "If true, http and https requests will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the protocol is never included in a Backend Bucket's cache key. Attempting to set on a route that points exclusively to Backend Buckets will result in a configuration error.",
          ).optional(),
          includeQueryString: z.unknown().describe(
            "If true, include query string parameters in the cache key according to `includedQueryParameters` and `excludedQueryParameters`. If neither is set, the entire query string will be included. If false, the query string will be excluded from the cache key entirely. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key.",
          ).optional(),
          includedCookieNames: z.unknown().describe(
            "Allows HTTP cookies (by name) to be used in the cache key. The name=value pair will be used in the cache key Cloud CDN generates. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. Up to 5 cookie names can be specified.",
          ).optional(),
          includedHeaderNames: z.unknown().describe(
            "Allows HTTP request headers (by name) to be used in the cache key.",
          ).optional(),
          includedQueryParameters: z.unknown().describe(
            "Names of query string parameters to include in cache keys. All other parameters will be excluded. Either specify `includedQueryParameters` or `excludedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters.",
          ).optional(),
        }).describe(
          "The cache key configuration. If not specified, the default behavior depends on the backend type: for Backend Services, the complete request URI is used; for Backend Buckets, the request URI is used without the protocol or host, and only query parameters known to Cloud Storage are included.",
        ).optional(),
        cacheMode: z.enum([
          "CACHE_ALL_STATIC",
          "FORCE_CACHE_ALL",
          "USE_ORIGIN_HEADERS",
        ]).describe(
          "Specifies the cache setting for all responses from this route. If not specified, Cloud CDN uses `CACHE_ALL_STATIC` mode.",
        ).optional(),
        clientTtl: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'Specifies a separate client (e.g. browser client) maximum TTL for cached content. This is used to clamp the max-age (or Expires) value sent to the client. With `FORCE_CACHE_ALL`, the lesser of `clientTtl` and `defaultTtl` is used for the response max-age directive, along with a "public" directive. For cacheable content in `CACHE_ALL_STATIC` mode, `clientTtl` clamps the max-age from the origin (if specified), or else sets the response max-age directive to the lesser of the `clientTtl` and `defaultTtl`, and also ensures a "public" cache-control directive is present. The maximum allowed value is 31,622,400s (1 year). If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` mode. Cannot exceed `maxTtl`. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`.',
        ).optional(),
        defaultTtl: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'Specifies the default TTL for cached content for responses that do not have an existing valid TTL (max-age or s-maxage). Setting a TTL of "0" means "always revalidate". The value of `defaultTtl` cannot be set to a value greater than that of `maxTtl`. When the `cacheMode` is set to `FORCE_CACHE_ALL`, the `defaultTtl` will overwrite the TTL set in all responses. The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` and `FORCE_CACHE_ALL` modes. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`.',
        ).optional(),
        maxTtl: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'Specifies the maximum allowed TTL for cached content. Cache directives that attempt to set a max-age or s-maxage higher than this, or an Expires header more than `maxTtl` seconds in the future will be capped at the value of `maxTtl`, as if it were the value of an s-maxage Cache-Control directive. Headers sent to the client will not be modified. Setting a TTL of "0" means "always revalidate". The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 86400s (1 day) for `CACHE_ALL_STATIC` mode. Can be specified only for `CACHE_ALL_STATIC` cache mode.',
        ).optional(),
        negativeCaching: z.boolean().describe(
          "Negative caching allows per-status code TTLs to be set, in order to apply fine-grained caching for common errors or redirects. This can reduce the load on your origin and improve end-user experience by reducing response latency. When the `cacheMode` is set to `CACHE_ALL_STATIC` or `USE_ORIGIN_HEADERS`, negative caching applies to responses with the specified response code that lack any Cache-Control, Expires, or Pragma: no-cache directives. When the `cacheMode` is set to `FORCE_CACHE_ALL`, negative caching applies to all responses with the specified response code, and overrides any caching headers. By default, Cloud CDN applies the following TTLs to these HTTP status codes: * 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m * 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal Reasons): 120s * 405 (Method Not Found), 501 (Not Implemented): 60s These defaults can be overridden in `negativeCachingPolicy`. If not specified, Cloud CDN applies negative caching by default.",
        ).optional(),
        negativeCachingPolicy: z.array(z.unknown()).describe(
          "Sets a cache TTL for the specified HTTP status code. `negativeCaching` must be enabled to configure `negativeCachingPolicy`. Omitting the policy and leaving `negativeCaching` enabled will use Cloud CDN's default cache TTLs. Note that when specifying an explicit `negativeCachingPolicy`, you should take care to specify a cache TTL for all response codes that you wish to cache. Cloud CDN will not apply any default negative caching when a policy exists.",
        ).optional(),
        requestCoalescing: z.boolean().describe(
          "If true then Cloud CDN will combine multiple concurrent cache fill requests into a small number of requests to the origin. If not specified, Cloud CDN applies request coalescing by default.",
        ).optional(),
        serveWhileStale: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'Serve existing content from the cache (if available) when revalidating content with the origin, or when an error is encountered when refreshing the cache. This setting defines the default "max-stale" duration for any cached responses that do not specify a max-stale directive. Stale responses that exceed the TTL configured here will not be served. The default limit (max-stale) is 86400s (1 day), which will allow stale content to be served up to this limit beyond the max-age (or s-maxage) of a cached response. The maximum allowed value is 604800 (1 week). Set this to zero (0) to disable serve-while-stale.',
        ).optional(),
      }).describe(
        "Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled.",
      ).optional(),
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
        "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy.",
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
          "The specification for how client requests are aborted as part of fault injection.",
        ).optional(),
        delay: z.object({
          fixedDelay: z.unknown().describe(
            "Specifies the value of the fixed delay interval.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic for connections, operations, or requests for which a delay is introduced as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
          ).optional(),
        }).describe(
          "The specification for how client requests are delayed as part of fault injection, before being sent to a backend service.",
        ).optional(),
      }).describe(
        "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer. To see which load balancers support fault injection, see Load balancing: Routing and traffic management features.",
      ).optional(),
      maxStreamDuration: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        "Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as*end-of-stream*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
      ).optional(),
      requestMirrorPolicy: z.object({
        backendService: z.string().describe(
          "The full or partial URL to the BackendService resource being mirrored to. The backend service configured for a mirroring policy must reference backends that are of the same type as the original backend service matched in the URL map. Serverless NEG backends are not currently supported as a mirrored backend service.",
        ).optional(),
        mirrorPercent: z.number().describe(
          "The percentage of requests to be mirrored to `backend_service`.",
        ).optional(),
      }).describe(
        "Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
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
          "Specifies a non-zero timeout per retry attempt. If not specified, will use the timeout set in theHttpRouteAction field. If timeout in the HttpRouteAction field is not set, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        retryConditions: z.array(z.unknown()).describe(
          "Specifies one or more conditions when this retry policy applies. Valid values are: - 5xx: retry is attempted if the instance or endpoint responds with any 5xx response code, or if the instance or endpoint does not respond at all. For example, disconnects, reset, read timeout, connection failure, and refused streams. - gateway-error: Similar to 5xx, but only applies to response codes 502, 503 or504. - connect-failure: a retry is attempted on failures connecting to the instance or endpoint. For example, connection timeouts. - retriable-4xx: a retry is attempted if the instance or endpoint responds with a 4xx response code. The only error that you can retry is error code 409. - refused-stream: a retry is attempted if the instance or endpoint resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: a retry is attempted if the gRPC status code in the response header is set to cancelled. - deadline-exceeded: a retry is attempted if the gRPC status code in the response header is set todeadline-exceeded. - internal: a retry is attempted if the gRPC status code in the response header is set tointernal. - resource-exhausted: a retry is attempted if the gRPC status code in the response header is set toresource-exhausted. - unavailable: a retry is attempted if the gRPC status code in the response header is set tounavailable. Only the following codes are supported when the URL map is bound to target gRPC proxy that has validateForProxyless field set to true. - cancelled - deadline-exceeded - internal - resource-exhausted - unavailable",
        ).optional(),
      }).describe("Specifies the retry policy associated with this route.")
        .optional(),
      timeout: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        "Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as *end-of-stream*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
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
        regexRewrite: z.object({
          pathPattern: z.unknown().describe(
            "Required. The regular expression used to match against the URL path. It uses RE2 syntax with the following constraints: - Any single character operators - Groups are allowed to have only submatch operator inside - Groups are allowed only without any char repetition, e.g..* - Any char repetition, e.g..*, is only allowed to be used in a single regex together with: - Empty string operators - Other repetitions - Ranges - Repetitions of ranges - Ranges are only allowed to have: - Character range - Digits range - Symbols listed in characters allowed for ranges",
          ).optional(),
          pathSubstitution: z.unknown().describe(
            "Required. Required when path pattern is specified. Used to rewrite matching parts of the path.",
          ).optional(),
        }).describe(
          "The regex rewrite to be applied to the URL. Only one ofpathPrefixRewrite, pathTemplateRewrite, orregexRewrite may be specified.",
        ).optional(),
      }).describe(
        "The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
      ).optional(),
      weightedBackendServices: z.array(z.object({
        backendService: z.unknown().describe(
          "The full or partial URL to the default BackendService resource. Before forwarding the request to backendService, the load balancer applies any relevant headerActions specified as part of thisbackendServiceWeight.",
        ).optional(),
        headerAction: z.unknown().describe(
          "Specifies changes to request and response headers that need to take effect for the selected backendService. headerAction specified here take effect beforeheaderAction in the enclosing HttpRouteRule,PathMatcher and UrlMap. headerAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
        ).optional(),
        weight: z.unknown().describe(
          "Specifies the fraction of traffic sent to a backend service, computed asweight / (sum of all weightedBackendService weights in routeAction). The selection of a backend service is determined only for new traffic. Once a user's request has been directed to a backend service, subsequent requests are sent to the same backend service as determined by the backend service's session affinity policy. Don't configure session affinity if you're using weighted traffic splitting. If you do, the weighted traffic splitting configuration takes precedence. The value must be from 0 to 1000.",
        ).optional(),
      })).describe(
        "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
      ).optional(),
    }).describe(
      "defaultRouteAction takes effect when none of the pathRules or routeRules match. The load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a path matcher'sdefaultRouteAction.",
    ).optional(),
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
    }).describe(
      "When none of the specified pathRules orrouteRules match, the request is redirected to a URL specified by defaultUrlRedirect. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy.",
    ).optional(),
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
      "Specifies changes to request and response headers that need to take effect for the selected backend service. HeaderAction specified here are applied after the matchingHttpRouteRule HeaderAction and before theHeaderAction in the UrlMap HeaderAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
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
        "customErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. If a policy for an error code is not configured for the PathRule, a policy for the error code configured inpathMatcher.defaultCustomErrorResponsePolicy is applied. If one is not specified inpathMatcher.defaultCustomErrorResponsePolicy, the policy configured in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy are configured with policies for 5xx and 4xx errors - A PathRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in PathRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. customErrorResponsePolicy is supported only for global external Application Load Balancers.",
      ).optional(),
      paths: z.array(z.unknown()).describe(
        "The list of path patterns to match. Each must start with / and the only place a * is allowed is at the end following a /. The string fed to the path matcher does not include any text after the first? or #, and those chars are not allowed here.",
      ).optional(),
      routeAction: z.object({
        cachePolicy: z.unknown().describe(
          "Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled.",
        ).optional(),
        corsPolicy: z.unknown().describe(
          "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy.",
        ).optional(),
        faultInjectionPolicy: z.unknown().describe(
          "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer. To see which load balancers support fault injection, see Load balancing: Routing and traffic management features.",
        ).optional(),
        maxStreamDuration: z.unknown().describe(
          "Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as*end-of-stream*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
        ).optional(),
        requestMirrorPolicy: z.unknown().describe(
          "Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        retryPolicy: z.unknown().describe(
          "Specifies the retry policy associated with this route.",
        ).optional(),
        timeout: z.unknown().describe(
          "Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as *end-of-stream*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
        ).optional(),
        urlRewrite: z.unknown().describe(
          "The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        weightedBackendServices: z.unknown().describe(
          "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
        ).optional(),
      }).describe(
        "In response to a matching path, the load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a path rule'srouteAction.",
      ).optional(),
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
      }).describe(
        "When a path pattern is matched, the request is redirected to a URL specified by urlRedirect. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy.",
      ).optional(),
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
        "customErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. If a policy for an error code is not configured for the RouteRule, a policy for the error code configured inpathMatcher.defaultCustomErrorResponsePolicy is applied. If one is not specified inpathMatcher.defaultCustomErrorResponsePolicy, the policy configured in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy are configured with policies for 5xx and 4xx errors - A RouteRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in RouteRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withrouteRules.routeAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thecustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the customErrorResponsePolicy is ignored and the response from the service is returned to the client. customErrorResponsePolicy is supported only for global external Application Load Balancers.",
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
        "Specifies changes to request and response headers that need to take effect for the selected backendService. The headerAction value specified here is applied before the matching pathMatchers[].headerAction and afterpathMatchers[].routeRules[].routeAction.weightedBackendService.backendServiceWeightAction[].headerAction HeaderAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
      ).optional(),
      matchRules: z.array(z.unknown()).describe(
        "The list of criteria for matching attributes of a request to thisrouteRule. This list has OR semantics: the request matches this routeRule when any of thematchRules are satisfied. However predicates within a given matchRule have AND semantics. All predicates within a matchRule must match for the request to match the rule.",
      ).optional(),
      priority: z.number().int().describe(
        "For routeRules within a given pathMatcher, priority determines the order in which a load balancer interpretsrouteRules. RouteRules are evaluated in order of priority, from the lowest to highest number. The priority of a rule decreases as its number increases (1, 2, 3, N+1). The first rule that matches the request is applied. You cannot configure two or more routeRules with the same priority. Priority for each rule must be set to a number from 0 to 2147483647 inclusive. Priority numbers can have gaps, which enable you to add or remove rules in the future without affecting the rest of the rules. For example, 1, 2, 3, 4, 5, 9, 12, 16 is a valid series of priority numbers to which you could add rules numbered from 6 to 8, 10 to 11, and 13 to 15 in the future without any impact on existing rules.",
      ).optional(),
      routeAction: z.object({
        cachePolicy: z.unknown().describe(
          "Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled.",
        ).optional(),
        corsPolicy: z.unknown().describe(
          "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy.",
        ).optional(),
        faultInjectionPolicy: z.unknown().describe(
          "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer. To see which load balancers support fault injection, see Load balancing: Routing and traffic management features.",
        ).optional(),
        maxStreamDuration: z.unknown().describe(
          "Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as*end-of-stream*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
        ).optional(),
        requestMirrorPolicy: z.unknown().describe(
          "Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        retryPolicy: z.unknown().describe(
          "Specifies the retry policy associated with this route.",
        ).optional(),
        timeout: z.unknown().describe(
          "Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as *end-of-stream*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
        ).optional(),
        urlRewrite: z.unknown().describe(
          "The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        weightedBackendServices: z.unknown().describe(
          "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
        ).optional(),
      }).describe(
        "In response to a matching matchRule, the load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a route rule'srouteAction.",
      ).optional(),
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
      }).describe(
        "When this rule is matched, the request is redirected to a URL specified by urlRedirect. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy.",
      ).optional(),
    })).describe(
      "The list of HTTP route rules. Use this list instead ofpathRules when advanced route matching and routing actions are desired. routeRules are evaluated in order of priority, from the lowest to highest number. Within a given pathMatcher, you can set only one ofpathRules or routeRules.",
    ).optional(),
  })).describe("The list of named PathMatchers to use against the URL.")
    .optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the regional URL map resides. This field is not applicable to global URL maps. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
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
    "begin_interface: MixerMutationRequestBuilder Request ID to support idempotency.",
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
    cachePolicy: z.object({
      cacheBypassRequestHeaderNames: z.array(z.string()),
      cacheKeyPolicy: z.object({
        excludedQueryParameters: z.array(z.string()),
        includeHost: z.boolean(),
        includeProtocol: z.boolean(),
        includeQueryString: z.boolean(),
        includedCookieNames: z.array(z.string()),
        includedHeaderNames: z.array(z.string()),
        includedQueryParameters: z.array(z.string()),
      }),
      cacheMode: z.string(),
      clientTtl: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      defaultTtl: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      maxTtl: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      negativeCaching: z.boolean(),
      negativeCachingPolicy: z.array(z.object({
        code: z.number(),
        ttl: z.object({
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
      })),
      requestCoalescing: z.boolean(),
      serveWhileStale: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
    }),
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
      regexRewrite: z.object({
        pathPattern: z.string(),
        pathSubstitution: z.string(),
      }),
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
      cachePolicy: z.object({
        cacheBypassRequestHeaderNames: z.array(z.unknown()),
        cacheKeyPolicy: z.object({
          excludedQueryParameters: z.unknown(),
          includeHost: z.unknown(),
          includeProtocol: z.unknown(),
          includeQueryString: z.unknown(),
          includedCookieNames: z.unknown(),
          includedHeaderNames: z.unknown(),
          includedQueryParameters: z.unknown(),
        }),
        cacheMode: z.string(),
        clientTtl: z.object({
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        defaultTtl: z.object({
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        maxTtl: z.object({
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        negativeCaching: z.boolean(),
        negativeCachingPolicy: z.array(z.unknown()),
        requestCoalescing: z.boolean(),
        serveWhileStale: z.object({
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
      }),
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
        regexRewrite: z.object({
          pathPattern: z.unknown(),
          pathSubstitution: z.unknown(),
        }),
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
        cachePolicy: z.unknown(),
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
        cachePolicy: z.unknown(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
    "defaultCustomErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. This policy takes effect at the load balancer level and applies only when no policy has been defined for the error code at lower levels like PathMatcher, RouteRule and PathRule within this UrlMap. For example, consider a UrlMap with the following configuration: - defaultCustomErrorResponsePolicy containing policies for responding to 5xx and 4xx errors - A PathMatcher configured for *.example.com has defaultCustomErrorResponsePolicy for 4xx. If a request for http://www.example.com/ encounters a404, the policy inpathMatcher.defaultCustomErrorResponsePolicy will be enforced. When the request for http://www.example.com/ encounters a502, the policy inUrlMap.defaultCustomErrorResponsePolicy will be enforced. When a request that does not match any host in *.example.com such as http://www.myotherexample.com/, encounters a404, UrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withdefaultRouteAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thedefaultCustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the defaultCustomErrorResponsePolicy is ignored and the response from the service is returned to the client. defaultCustomErrorResponsePolicy is supported only for global external Application Load Balancers.",
  ).optional(),
  defaultRouteAction: z.object({
    cachePolicy: z.object({
      cacheBypassRequestHeaderNames: z.array(z.string()).describe(
        "Bypass the cache when the specified request headers are matched by name, e.g. Pragma or Authorization headers. Values are case-insensitive. Up to 5 header names can be specified. The cache is bypassed for all `cacheMode` values.",
      ).optional(),
      cacheKeyPolicy: z.object({
        excludedQueryParameters: z.array(z.string()).describe(
          "Names of query string parameters to exclude in cache keys. All other parameters will be included. Either specify `excludedQueryParameters` or `includedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key.",
        ).optional(),
        includeHost: z.boolean().describe(
          "If true, requests to different hosts will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the host is never included in a Backend Bucket's cache key. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error.",
        ).optional(),
        includeProtocol: z.boolean().describe(
          "If true, http and https requests will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the protocol is never included in a Backend Bucket's cache key. Attempting to set on a route that points exclusively to Backend Buckets will result in a configuration error.",
        ).optional(),
        includeQueryString: z.boolean().describe(
          "If true, include query string parameters in the cache key according to `includedQueryParameters` and `excludedQueryParameters`. If neither is set, the entire query string will be included. If false, the query string will be excluded from the cache key entirely. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key.",
        ).optional(),
        includedCookieNames: z.array(z.string()).describe(
          "Allows HTTP cookies (by name) to be used in the cache key. The name=value pair will be used in the cache key Cloud CDN generates. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. Up to 5 cookie names can be specified.",
        ).optional(),
        includedHeaderNames: z.array(z.string()).describe(
          "Allows HTTP request headers (by name) to be used in the cache key.",
        ).optional(),
        includedQueryParameters: z.array(z.string()).describe(
          "Names of query string parameters to include in cache keys. All other parameters will be excluded. Either specify `includedQueryParameters` or `excludedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters.",
        ).optional(),
      }).describe(
        "The cache key configuration. If not specified, the default behavior depends on the backend type: for Backend Services, the complete request URI is used; for Backend Buckets, the request URI is used without the protocol or host, and only query parameters known to Cloud Storage are included.",
      ).optional(),
      cacheMode: z.enum([
        "CACHE_ALL_STATIC",
        "FORCE_CACHE_ALL",
        "USE_ORIGIN_HEADERS",
      ]).describe(
        "Specifies the cache setting for all responses from this route. If not specified, Cloud CDN uses `CACHE_ALL_STATIC` mode.",
      ).optional(),
      clientTtl: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'Specifies a separate client (e.g. browser client) maximum TTL for cached content. This is used to clamp the max-age (or Expires) value sent to the client. With `FORCE_CACHE_ALL`, the lesser of `clientTtl` and `defaultTtl` is used for the response max-age directive, along with a "public" directive. For cacheable content in `CACHE_ALL_STATIC` mode, `clientTtl` clamps the max-age from the origin (if specified), or else sets the response max-age directive to the lesser of the `clientTtl` and `defaultTtl`, and also ensures a "public" cache-control directive is present. The maximum allowed value is 31,622,400s (1 year). If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` mode. Cannot exceed `maxTtl`. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`.',
      ).optional(),
      defaultTtl: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'Specifies the default TTL for cached content for responses that do not have an existing valid TTL (max-age or s-maxage). Setting a TTL of "0" means "always revalidate". The value of `defaultTtl` cannot be set to a value greater than that of `maxTtl`. When the `cacheMode` is set to `FORCE_CACHE_ALL`, the `defaultTtl` will overwrite the TTL set in all responses. The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` and `FORCE_CACHE_ALL` modes. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`.',
      ).optional(),
      maxTtl: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'Specifies the maximum allowed TTL for cached content. Cache directives that attempt to set a max-age or s-maxage higher than this, or an Expires header more than `maxTtl` seconds in the future will be capped at the value of `maxTtl`, as if it were the value of an s-maxage Cache-Control directive. Headers sent to the client will not be modified. Setting a TTL of "0" means "always revalidate". The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 86400s (1 day) for `CACHE_ALL_STATIC` mode. Can be specified only for `CACHE_ALL_STATIC` cache mode.',
      ).optional(),
      negativeCaching: z.boolean().describe(
        "Negative caching allows per-status code TTLs to be set, in order to apply fine-grained caching for common errors or redirects. This can reduce the load on your origin and improve end-user experience by reducing response latency. When the `cacheMode` is set to `CACHE_ALL_STATIC` or `USE_ORIGIN_HEADERS`, negative caching applies to responses with the specified response code that lack any Cache-Control, Expires, or Pragma: no-cache directives. When the `cacheMode` is set to `FORCE_CACHE_ALL`, negative caching applies to all responses with the specified response code, and overrides any caching headers. By default, Cloud CDN applies the following TTLs to these HTTP status codes: * 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m * 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal Reasons): 120s * 405 (Method Not Found), 501 (Not Implemented): 60s These defaults can be overridden in `negativeCachingPolicy`. If not specified, Cloud CDN applies negative caching by default.",
      ).optional(),
      negativeCachingPolicy: z.array(z.object({
        code: z.number().int().describe(
          "The HTTP status code to define a TTL against. Only HTTP status codes 300, 301, 302, 307, 308, 404, 405, 410, 421, 451 and 501 can be specified as values, and you cannot specify a status code more than once.",
        ).optional(),
        ttl: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          "The TTL (in seconds) for which to cache responses with the corresponding status code. The maximum allowed value is 1800s (30 minutes). Infrequently accessed objects may be evicted from the cache before the defined TTL.",
        ).optional(),
      })).describe(
        "Sets a cache TTL for the specified HTTP status code. `negativeCaching` must be enabled to configure `negativeCachingPolicy`. Omitting the policy and leaving `negativeCaching` enabled will use Cloud CDN's default cache TTLs. Note that when specifying an explicit `negativeCachingPolicy`, you should take care to specify a cache TTL for all response codes that you wish to cache. Cloud CDN will not apply any default negative caching when a policy exists.",
      ).optional(),
      requestCoalescing: z.boolean().describe(
        "If true then Cloud CDN will combine multiple concurrent cache fill requests into a small number of requests to the origin. If not specified, Cloud CDN applies request coalescing by default.",
      ).optional(),
      serveWhileStale: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'Serve existing content from the cache (if available) when revalidating content with the origin, or when an error is encountered when refreshing the cache. This setting defines the default "max-stale" duration for any cached responses that do not specify a max-stale directive. Stale responses that exceed the TTL configured here will not be served. The default limit (max-stale) is 86400s (1 day), which will allow stale content to be served up to this limit beyond the max-age (or s-maxage) of a cached response. The maximum allowed value is 604800 (1 week). Set this to zero (0) to disable serve-while-stale.',
      ).optional(),
    }).describe(
      "Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled.",
    ).optional(),
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
      "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy.",
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
        "The specification for how client requests are aborted as part of fault injection.",
      ).optional(),
      delay: z.object({
        fixedDelay: z.object({
          nanos: z.number().int().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.string().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe("Specifies the value of the fixed delay interval.")
          .optional(),
        percentage: z.number().describe(
          "The percentage of traffic for connections, operations, or requests for which a delay is introduced as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
        ).optional(),
      }).describe(
        "The specification for how client requests are delayed as part of fault injection, before being sent to a backend service.",
      ).optional(),
    }).describe(
      "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer. To see which load balancers support fault injection, see Load balancing: Routing and traffic management features.",
    ).optional(),
    maxStreamDuration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      "Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as*end-of-stream*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
    ).optional(),
    requestMirrorPolicy: z.object({
      backendService: z.string().describe(
        "The full or partial URL to the BackendService resource being mirrored to. The backend service configured for a mirroring policy must reference backends that are of the same type as the original backend service matched in the URL map. Serverless NEG backends are not currently supported as a mirrored backend service.",
      ).optional(),
      mirrorPercent: z.number().describe(
        "The percentage of requests to be mirrored to `backend_service`.",
      ).optional(),
    }).describe(
      "Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
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
        "Specifies a non-zero timeout per retry attempt. If not specified, will use the timeout set in theHttpRouteAction field. If timeout in the HttpRouteAction field is not set, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
      ).optional(),
      retryConditions: z.array(z.string()).describe(
        "Specifies one or more conditions when this retry policy applies. Valid values are: - 5xx: retry is attempted if the instance or endpoint responds with any 5xx response code, or if the instance or endpoint does not respond at all. For example, disconnects, reset, read timeout, connection failure, and refused streams. - gateway-error: Similar to 5xx, but only applies to response codes 502, 503 or504. - connect-failure: a retry is attempted on failures connecting to the instance or endpoint. For example, connection timeouts. - retriable-4xx: a retry is attempted if the instance or endpoint responds with a 4xx response code. The only error that you can retry is error code 409. - refused-stream: a retry is attempted if the instance or endpoint resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: a retry is attempted if the gRPC status code in the response header is set to cancelled. - deadline-exceeded: a retry is attempted if the gRPC status code in the response header is set todeadline-exceeded. - internal: a retry is attempted if the gRPC status code in the response header is set tointernal. - resource-exhausted: a retry is attempted if the gRPC status code in the response header is set toresource-exhausted. - unavailable: a retry is attempted if the gRPC status code in the response header is set tounavailable. Only the following codes are supported when the URL map is bound to target gRPC proxy that has validateForProxyless field set to true. - cancelled - deadline-exceeded - internal - resource-exhausted - unavailable",
      ).optional(),
    }).describe("Specifies the retry policy associated with this route.")
      .optional(),
    timeout: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      "Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as *end-of-stream*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
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
      regexRewrite: z.object({
        pathPattern: z.string().describe(
          "Required. The regular expression used to match against the URL path. It uses RE2 syntax with the following constraints: - Any single character operators - Groups are allowed to have only submatch operator inside - Groups are allowed only without any char repetition, e.g..* - Any char repetition, e.g..*, is only allowed to be used in a single regex together with: - Empty string operators - Other repetitions - Ranges - Repetitions of ranges - Ranges are only allowed to have: - Character range - Digits range - Symbols listed in characters allowed for ranges",
        ).optional(),
        pathSubstitution: z.string().describe(
          "Required. Required when path pattern is specified. Used to rewrite matching parts of the path.",
        ).optional(),
      }).describe(
        "The regex rewrite to be applied to the URL. Only one ofpathPrefixRewrite, pathTemplateRewrite, orregexRewrite may be specified.",
      ).optional(),
    }).describe(
      "The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
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
        "Specifies changes to request and response headers that need to take effect for the selected backendService. headerAction specified here take effect beforeheaderAction in the enclosing HttpRouteRule,PathMatcher and UrlMap. headerAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
      ).optional(),
      weight: z.number().int().describe(
        "Specifies the fraction of traffic sent to a backend service, computed asweight / (sum of all weightedBackendService weights in routeAction). The selection of a backend service is determined only for new traffic. Once a user's request has been directed to a backend service, subsequent requests are sent to the same backend service as determined by the backend service's session affinity policy. Don't configure session affinity if you're using weighted traffic splitting. If you do, the weighted traffic splitting configuration takes precedence. The value must be from 0 to 1000.",
      ).optional(),
    })).describe(
      "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
    ).optional(),
  }).describe(
    "defaultRouteAction takes effect when none of the hostRules match. The load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within defaultRouteAction. defaultRouteAction has no effect when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
  ).optional(),
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
  }).describe(
    "When none of the specified hostRules match, the request is redirected to a URL specified by defaultUrlRedirect. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy.",
  ).optional(),
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
    "Specifies changes to request and response headers that need to take effect for the selected backendService. The headerAction specified here take effect afterheaderAction specified under pathMatcher. headerAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
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
      "defaultCustomErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. This policy takes effect at the PathMatcher level and applies only when no policy has been defined for the error code at lower levels likeRouteRule and PathRule within thisPathMatcher. If an error code does not have a policy defined in defaultCustomErrorResponsePolicy, then a policy defined for the error code in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy is configured with policies for 5xx and 4xx errors - A RouteRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in RouteRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withpathMatcher.defaultRouteAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thedefaultCustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the defaultCustomErrorResponsePolicy is ignored and the response from the service is returned to the client. defaultCustomErrorResponsePolicy is supported only for global external Application Load Balancers.",
    ).optional(),
    defaultRouteAction: z.object({
      cachePolicy: z.object({
        cacheBypassRequestHeaderNames: z.array(z.unknown()).describe(
          "Bypass the cache when the specified request headers are matched by name, e.g. Pragma or Authorization headers. Values are case-insensitive. Up to 5 header names can be specified. The cache is bypassed for all `cacheMode` values.",
        ).optional(),
        cacheKeyPolicy: z.object({
          excludedQueryParameters: z.unknown().describe(
            "Names of query string parameters to exclude in cache keys. All other parameters will be included. Either specify `excludedQueryParameters` or `includedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key.",
          ).optional(),
          includeHost: z.unknown().describe(
            "If true, requests to different hosts will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the host is never included in a Backend Bucket's cache key. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error.",
          ).optional(),
          includeProtocol: z.unknown().describe(
            "If true, http and https requests will be cached separately. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket, as the protocol is never included in a Backend Bucket's cache key. Attempting to set on a route that points exclusively to Backend Buckets will result in a configuration error.",
          ).optional(),
          includeQueryString: z.unknown().describe(
            "If true, include query string parameters in the cache key according to `includedQueryParameters` and `excludedQueryParameters`. If neither is set, the entire query string will be included. If false, the query string will be excluded from the cache key entirely. Note: This field applies to routes that use backend services. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. For routes that point to a Backend Bucket, use `includedQueryParameters` to define which parameters should be part of the cache key.",
          ).optional(),
          includedCookieNames: z.unknown().describe(
            "Allows HTTP cookies (by name) to be used in the cache key. The name=value pair will be used in the cache key Cloud CDN generates. Note: This setting is only applicable to routes that use a Backend Service. It does not affect requests served by a Backend Bucket. Attempting to set it on a route that points exclusively to Backend Buckets will result in a configuration error. Up to 5 cookie names can be specified.",
          ).optional(),
          includedHeaderNames: z.unknown().describe(
            "Allows HTTP request headers (by name) to be used in the cache key.",
          ).optional(),
          includedQueryParameters: z.unknown().describe(
            "Names of query string parameters to include in cache keys. All other parameters will be excluded. Either specify `includedQueryParameters` or `excludedQueryParameters`, not both. '&' and '=' will be percent encoded and not treated as delimiters.",
          ).optional(),
        }).describe(
          "The cache key configuration. If not specified, the default behavior depends on the backend type: for Backend Services, the complete request URI is used; for Backend Buckets, the request URI is used without the protocol or host, and only query parameters known to Cloud Storage are included.",
        ).optional(),
        cacheMode: z.enum([
          "CACHE_ALL_STATIC",
          "FORCE_CACHE_ALL",
          "USE_ORIGIN_HEADERS",
        ]).describe(
          "Specifies the cache setting for all responses from this route. If not specified, Cloud CDN uses `CACHE_ALL_STATIC` mode.",
        ).optional(),
        clientTtl: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'Specifies a separate client (e.g. browser client) maximum TTL for cached content. This is used to clamp the max-age (or Expires) value sent to the client. With `FORCE_CACHE_ALL`, the lesser of `clientTtl` and `defaultTtl` is used for the response max-age directive, along with a "public" directive. For cacheable content in `CACHE_ALL_STATIC` mode, `clientTtl` clamps the max-age from the origin (if specified), or else sets the response max-age directive to the lesser of the `clientTtl` and `defaultTtl`, and also ensures a "public" cache-control directive is present. The maximum allowed value is 31,622,400s (1 year). If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` mode. Cannot exceed `maxTtl`. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`.',
        ).optional(),
        defaultTtl: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'Specifies the default TTL for cached content for responses that do not have an existing valid TTL (max-age or s-maxage). Setting a TTL of "0" means "always revalidate". The value of `defaultTtl` cannot be set to a value greater than that of `maxTtl`. When the `cacheMode` is set to `FORCE_CACHE_ALL`, the `defaultTtl` will overwrite the TTL set in all responses. The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 3600s (1 hour) for `CACHE_ALL_STATIC` and `FORCE_CACHE_ALL` modes. Cannot be specified when `cacheMode` is `USE_ORIGIN_HEADERS`.',
        ).optional(),
        maxTtl: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'Specifies the maximum allowed TTL for cached content. Cache directives that attempt to set a max-age or s-maxage higher than this, or an Expires header more than `maxTtl` seconds in the future will be capped at the value of `maxTtl`, as if it were the value of an s-maxage Cache-Control directive. Headers sent to the client will not be modified. Setting a TTL of "0" means "always revalidate". The maximum allowed value is 31,622,400s (1 year). Infrequently accessed objects may be evicted from the cache before the defined TTL. If not specified, Cloud CDN uses 86400s (1 day) for `CACHE_ALL_STATIC` mode. Can be specified only for `CACHE_ALL_STATIC` cache mode.',
        ).optional(),
        negativeCaching: z.boolean().describe(
          "Negative caching allows per-status code TTLs to be set, in order to apply fine-grained caching for common errors or redirects. This can reduce the load on your origin and improve end-user experience by reducing response latency. When the `cacheMode` is set to `CACHE_ALL_STATIC` or `USE_ORIGIN_HEADERS`, negative caching applies to responses with the specified response code that lack any Cache-Control, Expires, or Pragma: no-cache directives. When the `cacheMode` is set to `FORCE_CACHE_ALL`, negative caching applies to all responses with the specified response code, and overrides any caching headers. By default, Cloud CDN applies the following TTLs to these HTTP status codes: * 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m * 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal Reasons): 120s * 405 (Method Not Found), 501 (Not Implemented): 60s These defaults can be overridden in `negativeCachingPolicy`. If not specified, Cloud CDN applies negative caching by default.",
        ).optional(),
        negativeCachingPolicy: z.array(z.unknown()).describe(
          "Sets a cache TTL for the specified HTTP status code. `negativeCaching` must be enabled to configure `negativeCachingPolicy`. Omitting the policy and leaving `negativeCaching` enabled will use Cloud CDN's default cache TTLs. Note that when specifying an explicit `negativeCachingPolicy`, you should take care to specify a cache TTL for all response codes that you wish to cache. Cloud CDN will not apply any default negative caching when a policy exists.",
        ).optional(),
        requestCoalescing: z.boolean().describe(
          "If true then Cloud CDN will combine multiple concurrent cache fill requests into a small number of requests to the origin. If not specified, Cloud CDN applies request coalescing by default.",
        ).optional(),
        serveWhileStale: z.object({
          nanos: z.unknown().describe(
            "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'Serve existing content from the cache (if available) when revalidating content with the origin, or when an error is encountered when refreshing the cache. This setting defines the default "max-stale" duration for any cached responses that do not specify a max-stale directive. Stale responses that exceed the TTL configured here will not be served. The default limit (max-stale) is 86400s (1 day), which will allow stale content to be served up to this limit beyond the max-age (or s-maxage) of a cached response. The maximum allowed value is 604800 (1 week). Set this to zero (0) to disable serve-while-stale.',
        ).optional(),
      }).describe(
        "Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled.",
      ).optional(),
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
        "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy.",
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
          "The specification for how client requests are aborted as part of fault injection.",
        ).optional(),
        delay: z.object({
          fixedDelay: z.unknown().describe(
            "Specifies the value of the fixed delay interval.",
          ).optional(),
          percentage: z.unknown().describe(
            "The percentage of traffic for connections, operations, or requests for which a delay is introduced as part of fault injection. The value must be from 0.0 to 100.0 inclusive.",
          ).optional(),
        }).describe(
          "The specification for how client requests are delayed as part of fault injection, before being sent to a backend service.",
        ).optional(),
      }).describe(
        "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer. To see which load balancers support fault injection, see Load balancing: Routing and traffic management features.",
      ).optional(),
      maxStreamDuration: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        "Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as*end-of-stream*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
      ).optional(),
      requestMirrorPolicy: z.object({
        backendService: z.string().describe(
          "The full or partial URL to the BackendService resource being mirrored to. The backend service configured for a mirroring policy must reference backends that are of the same type as the original backend service matched in the URL map. Serverless NEG backends are not currently supported as a mirrored backend service.",
        ).optional(),
        mirrorPercent: z.number().describe(
          "The percentage of requests to be mirrored to `backend_service`.",
        ).optional(),
      }).describe(
        "Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
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
          "Specifies a non-zero timeout per retry attempt. If not specified, will use the timeout set in theHttpRouteAction field. If timeout in the HttpRouteAction field is not set, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        retryConditions: z.array(z.unknown()).describe(
          "Specifies one or more conditions when this retry policy applies. Valid values are: - 5xx: retry is attempted if the instance or endpoint responds with any 5xx response code, or if the instance or endpoint does not respond at all. For example, disconnects, reset, read timeout, connection failure, and refused streams. - gateway-error: Similar to 5xx, but only applies to response codes 502, 503 or504. - connect-failure: a retry is attempted on failures connecting to the instance or endpoint. For example, connection timeouts. - retriable-4xx: a retry is attempted if the instance or endpoint responds with a 4xx response code. The only error that you can retry is error code 409. - refused-stream: a retry is attempted if the instance or endpoint resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: a retry is attempted if the gRPC status code in the response header is set to cancelled. - deadline-exceeded: a retry is attempted if the gRPC status code in the response header is set todeadline-exceeded. - internal: a retry is attempted if the gRPC status code in the response header is set tointernal. - resource-exhausted: a retry is attempted if the gRPC status code in the response header is set toresource-exhausted. - unavailable: a retry is attempted if the gRPC status code in the response header is set tounavailable. Only the following codes are supported when the URL map is bound to target gRPC proxy that has validateForProxyless field set to true. - cancelled - deadline-exceeded - internal - resource-exhausted - unavailable",
        ).optional(),
      }).describe("Specifies the retry policy associated with this route.")
        .optional(),
      timeout: z.object({
        nanos: z.number().int().describe(
          "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        "Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as *end-of-stream*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
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
        regexRewrite: z.object({
          pathPattern: z.unknown().describe(
            "Required. The regular expression used to match against the URL path. It uses RE2 syntax with the following constraints: - Any single character operators - Groups are allowed to have only submatch operator inside - Groups are allowed only without any char repetition, e.g..* - Any char repetition, e.g..*, is only allowed to be used in a single regex together with: - Empty string operators - Other repetitions - Ranges - Repetitions of ranges - Ranges are only allowed to have: - Character range - Digits range - Symbols listed in characters allowed for ranges",
          ).optional(),
          pathSubstitution: z.unknown().describe(
            "Required. Required when path pattern is specified. Used to rewrite matching parts of the path.",
          ).optional(),
        }).describe(
          "The regex rewrite to be applied to the URL. Only one ofpathPrefixRewrite, pathTemplateRewrite, orregexRewrite may be specified.",
        ).optional(),
      }).describe(
        "The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
      ).optional(),
      weightedBackendServices: z.array(z.object({
        backendService: z.unknown().describe(
          "The full or partial URL to the default BackendService resource. Before forwarding the request to backendService, the load balancer applies any relevant headerActions specified as part of thisbackendServiceWeight.",
        ).optional(),
        headerAction: z.unknown().describe(
          "Specifies changes to request and response headers that need to take effect for the selected backendService. headerAction specified here take effect beforeheaderAction in the enclosing HttpRouteRule,PathMatcher and UrlMap. headerAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
        ).optional(),
        weight: z.unknown().describe(
          "Specifies the fraction of traffic sent to a backend service, computed asweight / (sum of all weightedBackendService weights in routeAction). The selection of a backend service is determined only for new traffic. Once a user's request has been directed to a backend service, subsequent requests are sent to the same backend service as determined by the backend service's session affinity policy. Don't configure session affinity if you're using weighted traffic splitting. If you do, the weighted traffic splitting configuration takes precedence. The value must be from 0 to 1000.",
        ).optional(),
      })).describe(
        "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
      ).optional(),
    }).describe(
      "defaultRouteAction takes effect when none of the pathRules or routeRules match. The load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a path matcher'sdefaultRouteAction.",
    ).optional(),
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
    }).describe(
      "When none of the specified pathRules orrouteRules match, the request is redirected to a URL specified by defaultUrlRedirect. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy.",
    ).optional(),
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
      "Specifies changes to request and response headers that need to take effect for the selected backend service. HeaderAction specified here are applied after the matchingHttpRouteRule HeaderAction and before theHeaderAction in the UrlMap HeaderAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
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
        "customErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. If a policy for an error code is not configured for the PathRule, a policy for the error code configured inpathMatcher.defaultCustomErrorResponsePolicy is applied. If one is not specified inpathMatcher.defaultCustomErrorResponsePolicy, the policy configured in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy are configured with policies for 5xx and 4xx errors - A PathRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in PathRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. customErrorResponsePolicy is supported only for global external Application Load Balancers.",
      ).optional(),
      paths: z.array(z.unknown()).describe(
        "The list of path patterns to match. Each must start with / and the only place a * is allowed is at the end following a /. The string fed to the path matcher does not include any text after the first? or #, and those chars are not allowed here.",
      ).optional(),
      routeAction: z.object({
        cachePolicy: z.unknown().describe(
          "Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled.",
        ).optional(),
        corsPolicy: z.unknown().describe(
          "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy.",
        ).optional(),
        faultInjectionPolicy: z.unknown().describe(
          "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer. To see which load balancers support fault injection, see Load balancing: Routing and traffic management features.",
        ).optional(),
        maxStreamDuration: z.unknown().describe(
          "Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as*end-of-stream*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
        ).optional(),
        requestMirrorPolicy: z.unknown().describe(
          "Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        retryPolicy: z.unknown().describe(
          "Specifies the retry policy associated with this route.",
        ).optional(),
        timeout: z.unknown().describe(
          "Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as *end-of-stream*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
        ).optional(),
        urlRewrite: z.unknown().describe(
          "The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        weightedBackendServices: z.unknown().describe(
          "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
        ).optional(),
      }).describe(
        "In response to a matching path, the load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a path rule'srouteAction.",
      ).optional(),
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
      }).describe(
        "When a path pattern is matched, the request is redirected to a URL specified by urlRedirect. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy.",
      ).optional(),
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
        "customErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. If a policy for an error code is not configured for the RouteRule, a policy for the error code configured inpathMatcher.defaultCustomErrorResponsePolicy is applied. If one is not specified inpathMatcher.defaultCustomErrorResponsePolicy, the policy configured in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy are configured with policies for 5xx and 4xx errors - A RouteRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in RouteRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withrouteRules.routeAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thecustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the customErrorResponsePolicy is ignored and the response from the service is returned to the client. customErrorResponsePolicy is supported only for global external Application Load Balancers.",
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
        "Specifies changes to request and response headers that need to take effect for the selected backendService. The headerAction value specified here is applied before the matching pathMatchers[].headerAction and afterpathMatchers[].routeRules[].routeAction.weightedBackendService.backendServiceWeightAction[].headerAction HeaderAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
      ).optional(),
      matchRules: z.array(z.unknown()).describe(
        "The list of criteria for matching attributes of a request to thisrouteRule. This list has OR semantics: the request matches this routeRule when any of thematchRules are satisfied. However predicates within a given matchRule have AND semantics. All predicates within a matchRule must match for the request to match the rule.",
      ).optional(),
      priority: z.number().int().describe(
        "For routeRules within a given pathMatcher, priority determines the order in which a load balancer interpretsrouteRules. RouteRules are evaluated in order of priority, from the lowest to highest number. The priority of a rule decreases as its number increases (1, 2, 3, N+1). The first rule that matches the request is applied. You cannot configure two or more routeRules with the same priority. Priority for each rule must be set to a number from 0 to 2147483647 inclusive. Priority numbers can have gaps, which enable you to add or remove rules in the future without affecting the rest of the rules. For example, 1, 2, 3, 4, 5, 9, 12, 16 is a valid series of priority numbers to which you could add rules numbered from 6 to 8, 10 to 11, and 13 to 15 in the future without any impact on existing rules.",
      ).optional(),
      routeAction: z.object({
        cachePolicy: z.unknown().describe(
          "Specifies the cache policy configuration for matched traffic. Available only for Global `EXTERNAL_MANAGED` load balancer schemes. At least one property must be specified. This policy cannot be specified if any target backend has Identity-Aware Proxy enabled.",
        ).optional(),
        corsPolicy: z.unknown().describe(
          "The specification for allowing client-side cross-origin requests. For more information about the W3C recommendation for cross-origin resource sharing (CORS), see Fetch API Living Standard. Not supported when the URL map is bound to a target gRPC proxy.",
        ).optional(),
        faultInjectionPolicy: z.unknown().describe(
          "The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced by a load balancer on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted by the load balancer for a percentage of requests.timeout and retry_policy is ignored by clients that are configured with a fault_injection_policy if: 1. The traffic is generated by fault injection AND 2. The fault injection is not a delay fault injection. Fault injection is not supported with the classic Application Load Balancer. To see which load balancers support fault injection, see Load balancing: Routing and traffic management features.",
        ).optional(),
        maxStreamDuration: z.unknown().describe(
          "Specifies the maximum duration (timeout) for streams on the selected route. Unlike the timeout field where the timeout duration starts from the time the request has been fully processed (known as*end-of-stream*), the duration in this field is computed from the beginning of the stream until the response has been processed, including all retries. A stream that does not complete in this duration is closed. If not specified, this field uses the maximummaxStreamDuration value among all backend services associated with the route. This field is only allowed if the Url map is used with backend services with loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
        ).optional(),
        requestMirrorPolicy: z.unknown().describe(
          "Specifies the policy on how requests intended for the route's backends are shadowed to a separate mirrored backend service. The load balancer does not wait for responses from the shadow service. Before sending traffic to the shadow service, the host / authority header is suffixed with-shadow. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        retryPolicy: z.unknown().describe(
          "Specifies the retry policy associated with this route.",
        ).optional(),
        timeout: z.unknown().describe(
          "Specifies the timeout for the selected route. Timeout is computed from the time the request has been fully processed (known as *end-of-stream*) up until the response has been processed. Timeout includes all retries. If not specified, this field uses the largest timeout among all backend services associated with the route. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true.",
        ).optional(),
        urlRewrite: z.unknown().describe(
          "The spec to modify the URL of the request, before forwarding the request to the matched service. urlRewrite is the only action supported in UrlMaps for classic Application Load Balancers. Not supported when the URL map is bound to a target gRPC proxy that has the validateForProxyless field set to true.",
        ).optional(),
        weightedBackendServices: z.unknown().describe(
          "A list of weighted backend services to send traffic to when a route match occurs. The weights determine the fraction of traffic that flows to their corresponding backend service. If all traffic needs to go to a single backend service, there must be oneweightedBackendService with weight set to a non-zero number. After a backend service is identified and before forwarding the request to the backend service, advanced routing actions such as URL rewrites and header transformations are applied depending on additional settings specified in this HttpRouteAction.",
        ).optional(),
      }).describe(
        "In response to a matching matchRule, the load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a route rule'srouteAction.",
      ).optional(),
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
      }).describe(
        "When this rule is matched, the request is redirected to a URL specified by urlRedirect. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy.",
      ).optional(),
    })).describe(
      "The list of HTTP route rules. Use this list instead ofpathRules when advanced route matching and routing actions are desired. routeRules are evaluated in order of priority, from the lowest to highest number. Within a given pathMatcher, you can set only one ofpathRules or routeRules.",
    ).optional(),
  })).describe("The list of named PathMatchers to use against the URL.")
    .optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the regional URL map resides. This field is not applicable to global URL maps. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
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
    "begin_interface: MixerMutationRequestBuilder Request ID to support idempotency.",
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

/** Swamp extension model for Google Cloud Compute Engine RegionUrlMaps. Registered at `@swamp/gcp/compute/regionurlmaps`. */
export const model = {
  type: "@swamp/gcp/compute/regionurlmaps",
  version: "2026.09.23.1",
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
      toVersion: "2026.05.26.1",
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
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
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
      toVersion: "2026.07.21.4",
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
      toVersion: "2026.08.16.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.23.1",
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
      description: "Create a regionUrlMaps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["name"] !== undefined) params["urlMap"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
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
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a regionUrlMaps",
      arguments: z.object({
        identifier: z.string().describe("The name of the regionUrlMaps"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["urlMap"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update regionUrlMaps attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific regionUrlMaps by name (e.g. one discovered by list)",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
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
      description: "Delete the regionUrlMaps",
      arguments: z.object({
        identifier: z.string().describe("The name of the regionUrlMaps"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["urlMap"] = args.identifier;
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
      description: "Sync regionUrlMaps state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific regionUrlMaps by name (e.g. one discovered by list)",
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
          params["urlMap"] = identifier;
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
      description: "List regionUrlMaps resources",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "items",
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
    validate: {
      description: "validate",
      arguments: z.object({
        resource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["urlMap"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["resource"] !== undefined) body["resource"] = args["resource"];
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.regionUrlMaps.validate",
            "path":
              "projects/{project}/regions/{region}/urlMaps/{urlMap}/validate",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "urlMap"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "urlMap": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
