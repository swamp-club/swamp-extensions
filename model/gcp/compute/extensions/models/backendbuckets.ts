// Auto-generated extension model for @swamp/gcp/compute/backendbuckets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine BackendBuckets.
 *
 * Represents a Cloud Storage Bucket resource. This Cloud Storage bucket resource is referenced by a URL map of a load balancer. For more information, readBackend Buckets.
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
  "id": "compute.backendBuckets.get",
  "path": "projects/{project}/global/backendBuckets/{backendBucket}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "backendBucket",
  ],
  "parameters": {
    "backendBucket": {
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
  "id": "compute.backendBuckets.insert",
  "path": "projects/{project}/global/backendBuckets",
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
  "id": "compute.backendBuckets.update",
  "path": "projects/{project}/global/backendBuckets/{backendBucket}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "backendBucket",
  ],
  "parameters": {
    "backendBucket": {
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
  "id": "compute.backendBuckets.delete",
  "path": "projects/{project}/global/backendBuckets/{backendBucket}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "backendBucket",
  ],
  "parameters": {
    "backendBucket": {
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

const GlobalArgsSchema = z.object({
  bucketName: z.string().describe("Cloud Storage bucket name.").optional(),
  cdnPolicy: z.object({
    bypassCacheOnRequestHeaders: z.array(z.object({
      headerName: z.string().describe(
        "The header field name to match on when bypassing cache. Values are case-insensitive.",
      ).optional(),
    })).describe(
      "Bypass the cache when the specified request headers are matched - e.g. Pragma or Authorization headers. Up to 5 headers can be specified. The cache is bypassed for all cdnPolicy.cacheMode settings.",
    ).optional(),
    cacheKeyPolicy: z.object({
      includeHttpHeaders: z.array(z.string()).describe(
        "Allows HTTP request headers (by name) to be used in the cache key.",
      ).optional(),
      queryStringWhitelist: z.array(z.string()).describe(
        "Names of query string parameters to include in cache keys. Default parameters are always included. '&' and '=' will be percent encoded and not treated as delimiters.",
      ).optional(),
    }).describe(
      "Message containing what to include in the cache key for a request for Cloud CDN.",
    ).optional(),
    cacheMode: z.enum([
      "CACHE_ALL_STATIC",
      "FORCE_CACHE_ALL",
      "INVALID_CACHE_MODE",
      "USE_ORIGIN_HEADERS",
    ]).describe(
      'Specifies the cache setting for all responses from this backend. The possible values are:USE_ORIGIN_HEADERS Requires the origin to set valid caching headers to cache content. Responses without these headers will not be cached at Google\'s edge, and will require a full trip to the origin on every request, potentially impacting performance and increasing load on the origin server.FORCE_CACHE_ALL Cache all content, ignoring any "private", "no-store" or "no-cache" directives in Cache-Control response headers. Warning: this may result in Cloud CDN caching private, per-user (user identifiable) content.CACHE_ALL_STATIC Automatically cache static content, including common image formats, media (video and audio), and web assets (JavaScript and CSS). Requests and responses that are marked as uncacheable, as well as dynamic content (including HTML), will not be cached. If no value is provided for cdnPolicy.cacheMode, it defaults to CACHE_ALL_STATIC.',
    ).optional(),
    clientTtl: z.number().int().describe(
      'Specifies a separate client (e.g. browser client) maximum TTL. This is used to clamp the max-age (or Expires) value sent to the client. With FORCE_CACHE_ALL, the lesser of client_ttl and default_ttl is used for the response max-age directive, along with a "public" directive. For cacheable content in CACHE_ALL_STATIC mode, client_ttl clamps the max-age from the origin (if specified), or else sets the response max-age directive to the lesser of the client_ttl and default_ttl, and also ensures a "public" cache-control directive is present. If a client TTL is not specified, a default value (1 hour) will be used. The maximum allowed value is 31,622,400s (1 year).',
    ).optional(),
    defaultTtl: z.number().int().describe(
      'Specifies the default TTL for cached content served by this origin for responses that do not have an existing valid TTL (max-age or s-maxage). Setting a TTL of "0" means "always revalidate". The value of defaultTTL cannot be set to a value greater than that of maxTTL, but can be equal. When the cacheMode is set to FORCE_CACHE_ALL, the defaultTTL will overwrite the TTL set in all responses. The maximum allowed value is 31,622,400s (1 year), noting that infrequently accessed objects may be evicted from the cache before the defined TTL.',
    ).optional(),
    maxTtl: z.number().int().describe(
      'Specifies the maximum allowed TTL for cached content served by this origin. Cache directives that attempt to set a max-age or s-maxage higher than this, or an Expires header more than maxTTL seconds in the future will be capped at the value of maxTTL, as if it were the value of an s-maxage Cache-Control directive. Headers sent to the client will not be modified. Setting a TTL of "0" means "always revalidate". The maximum allowed value is 31,622,400s (1 year), noting that infrequently accessed objects may be evicted from the cache before the defined TTL.',
    ).optional(),
    negativeCaching: z.boolean().describe(
      "Negative caching allows per-status code TTLs to be set, in order to apply fine-grained caching for common errors or redirects. This can reduce the load on your origin and improve end-user experience by reducing response latency. When the cache mode is set to CACHE_ALL_STATIC or USE_ORIGIN_HEADERS, negative caching applies to responses with the specified response code that lack any Cache-Control, Expires, or Pragma: no-cache directives. When the cache mode is set to FORCE_CACHE_ALL, negative caching applies to all responses with the specified response code, and override any caching headers. By default, Cloud CDN will apply the following default TTLs to these status codes: HTTP 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m HTTP 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal Reasons): 120s HTTP 405 (Method Not Found), 501 (Not Implemented): 60s. These defaults can be overridden in negative_caching_policy.",
    ).optional(),
    negativeCachingPolicy: z.array(z.object({
      code: z.number().int().describe(
        "The HTTP status code to define a TTL against. Only HTTP status codes 300, 301, 302, 307, 308, 404, 405, 410, 421, 451 and 501 can be specified as values, and you cannot specify a status code more than once.",
      ).optional(),
      ttl: z.number().int().describe(
        "The TTL (in seconds) for which to cache responses with the corresponding status code. The maximum allowed value is 1800s (30 minutes), noting that infrequently accessed objects may be evicted from the cache before the defined TTL.",
      ).optional(),
    })).describe(
      "Sets a cache TTL for the specified HTTP status code. negative_caching must be enabled to configure negative_caching_policy. Omitting the policy and leaving negative_caching enabled will use Cloud CDN's default cache TTLs. Note that when specifying an explicit negative_caching_policy, you should take care to specify a cache TTL for all response codes that you wish to cache. Cloud CDN will not apply any default negative caching when a policy exists.",
    ).optional(),
    requestCoalescing: z.boolean().describe(
      "If true then Cloud CDN will combine multiple concurrent cache fill requests into a small number of requests to the origin.",
    ).optional(),
    serveWhileStale: z.number().int().describe(
      'Serve existing content from the cache (if available) when revalidating content with the origin, or when an error is encountered when refreshing the cache. This setting defines the default "max-stale" duration for any cached responses that do not specify a max-stale directive. Stale responses that exceed the TTL configured here will not be served. The default limit (max-stale) is 86400s (1 day), which will allow stale content to be served up to this limit beyond the max-age (or s-maxage) of a cached response. The maximum allowed value is 604800 (1 week). Set this to zero (0) to disable serve-while-stale.',
    ).optional(),
    signedUrlCacheMaxAgeSec: z.string().describe(
      'Maximum number of seconds the response to a signed URL request will be considered fresh. After this time period, the response will be revalidated before being served. Defaults to 1hr (3600s). When serving responses to signed URL requests, Cloud CDN will internally behave as though all responses from this backend had a "Cache-Control: public, max-age=[TTL]" header, regardless of any existing Cache-Control header. The actual headers served in responses will not be altered.',
    ).optional(),
    signedUrlKeyNames: z.array(z.string()).describe(
      "[Output Only] Names of the keys for signing request URLs.",
    ).optional(),
  }).describe(
    "Message containing Cloud CDN configuration for a backend bucket.",
  ).optional(),
  compressionMode: z.enum(["AUTOMATIC", "DISABLED"]).describe(
    "Compress text responses using Brotli or gzip compression, based on the client's Accept-Encoding header.",
  ).optional(),
  customResponseHeaders: z.array(z.string()).describe(
    "Headers that the Application Load Balancer should add to proxied responses.",
  ).optional(),
  description: z.string().describe(
    "An optional textual description of the resource; provided by the client when the resource is created.",
  ).optional(),
  enableCdn: z.boolean().describe(
    "If true, enable Cloud CDN for this BackendBucket.",
  ).optional(),
  loadBalancingScheme: z.enum(["INTERNAL_MANAGED"]).describe(
    "The value can only be INTERNAL_MANAGED for cross-region internal layer 7 load balancer. If loadBalancingScheme is not specified, the backend bucket can be used by classic global external load balancers, or global application external load balancers, or both.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid.',
    ).optional(),
  }).describe("Additional Backend Bucket parameters.").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  bucketName: z.string().optional(),
  cdnPolicy: z.object({
    bypassCacheOnRequestHeaders: z.array(z.object({
      headerName: z.string(),
    })),
    cacheKeyPolicy: z.object({
      includeHttpHeaders: z.array(z.string()),
      queryStringWhitelist: z.array(z.string()),
    }),
    cacheMode: z.string(),
    clientTtl: z.number(),
    defaultTtl: z.number(),
    maxTtl: z.number(),
    negativeCaching: z.boolean(),
    negativeCachingPolicy: z.array(z.object({
      code: z.number(),
      ttl: z.number(),
    })),
    requestCoalescing: z.boolean(),
    serveWhileStale: z.number(),
    signedUrlCacheMaxAgeSec: z.string(),
    signedUrlKeyNames: z.array(z.string()),
  }).optional(),
  compressionMode: z.string().optional(),
  creationTimestamp: z.string().optional(),
  customResponseHeaders: z.array(z.string()).optional(),
  description: z.string().optional(),
  edgeSecurityPolicy: z.string().optional(),
  enableCdn: z.boolean().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  loadBalancingScheme: z.string().optional(),
  name: z.string(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  selfLink: z.string().optional(),
  usedBy: z.array(z.object({
    reference: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  bucketName: z.string().describe("Cloud Storage bucket name.").optional(),
  cdnPolicy: z.object({
    bypassCacheOnRequestHeaders: z.array(z.object({
      headerName: z.string().describe(
        "The header field name to match on when bypassing cache. Values are case-insensitive.",
      ).optional(),
    })).describe(
      "Bypass the cache when the specified request headers are matched - e.g. Pragma or Authorization headers. Up to 5 headers can be specified. The cache is bypassed for all cdnPolicy.cacheMode settings.",
    ).optional(),
    cacheKeyPolicy: z.object({
      includeHttpHeaders: z.array(z.string()).describe(
        "Allows HTTP request headers (by name) to be used in the cache key.",
      ).optional(),
      queryStringWhitelist: z.array(z.string()).describe(
        "Names of query string parameters to include in cache keys. Default parameters are always included. '&' and '=' will be percent encoded and not treated as delimiters.",
      ).optional(),
    }).describe(
      "Message containing what to include in the cache key for a request for Cloud CDN.",
    ).optional(),
    cacheMode: z.enum([
      "CACHE_ALL_STATIC",
      "FORCE_CACHE_ALL",
      "INVALID_CACHE_MODE",
      "USE_ORIGIN_HEADERS",
    ]).describe(
      'Specifies the cache setting for all responses from this backend. The possible values are:USE_ORIGIN_HEADERS Requires the origin to set valid caching headers to cache content. Responses without these headers will not be cached at Google\'s edge, and will require a full trip to the origin on every request, potentially impacting performance and increasing load on the origin server.FORCE_CACHE_ALL Cache all content, ignoring any "private", "no-store" or "no-cache" directives in Cache-Control response headers. Warning: this may result in Cloud CDN caching private, per-user (user identifiable) content.CACHE_ALL_STATIC Automatically cache static content, including common image formats, media (video and audio), and web assets (JavaScript and CSS). Requests and responses that are marked as uncacheable, as well as dynamic content (including HTML), will not be cached. If no value is provided for cdnPolicy.cacheMode, it defaults to CACHE_ALL_STATIC.',
    ).optional(),
    clientTtl: z.number().int().describe(
      'Specifies a separate client (e.g. browser client) maximum TTL. This is used to clamp the max-age (or Expires) value sent to the client. With FORCE_CACHE_ALL, the lesser of client_ttl and default_ttl is used for the response max-age directive, along with a "public" directive. For cacheable content in CACHE_ALL_STATIC mode, client_ttl clamps the max-age from the origin (if specified), or else sets the response max-age directive to the lesser of the client_ttl and default_ttl, and also ensures a "public" cache-control directive is present. If a client TTL is not specified, a default value (1 hour) will be used. The maximum allowed value is 31,622,400s (1 year).',
    ).optional(),
    defaultTtl: z.number().int().describe(
      'Specifies the default TTL for cached content served by this origin for responses that do not have an existing valid TTL (max-age or s-maxage). Setting a TTL of "0" means "always revalidate". The value of defaultTTL cannot be set to a value greater than that of maxTTL, but can be equal. When the cacheMode is set to FORCE_CACHE_ALL, the defaultTTL will overwrite the TTL set in all responses. The maximum allowed value is 31,622,400s (1 year), noting that infrequently accessed objects may be evicted from the cache before the defined TTL.',
    ).optional(),
    maxTtl: z.number().int().describe(
      'Specifies the maximum allowed TTL for cached content served by this origin. Cache directives that attempt to set a max-age or s-maxage higher than this, or an Expires header more than maxTTL seconds in the future will be capped at the value of maxTTL, as if it were the value of an s-maxage Cache-Control directive. Headers sent to the client will not be modified. Setting a TTL of "0" means "always revalidate". The maximum allowed value is 31,622,400s (1 year), noting that infrequently accessed objects may be evicted from the cache before the defined TTL.',
    ).optional(),
    negativeCaching: z.boolean().describe(
      "Negative caching allows per-status code TTLs to be set, in order to apply fine-grained caching for common errors or redirects. This can reduce the load on your origin and improve end-user experience by reducing response latency. When the cache mode is set to CACHE_ALL_STATIC or USE_ORIGIN_HEADERS, negative caching applies to responses with the specified response code that lack any Cache-Control, Expires, or Pragma: no-cache directives. When the cache mode is set to FORCE_CACHE_ALL, negative caching applies to all responses with the specified response code, and override any caching headers. By default, Cloud CDN will apply the following default TTLs to these status codes: HTTP 300 (Multiple Choice), 301, 308 (Permanent Redirects): 10m HTTP 404 (Not Found), 410 (Gone), 451 (Unavailable For Legal Reasons): 120s HTTP 405 (Method Not Found), 501 (Not Implemented): 60s. These defaults can be overridden in negative_caching_policy.",
    ).optional(),
    negativeCachingPolicy: z.array(z.object({
      code: z.number().int().describe(
        "The HTTP status code to define a TTL against. Only HTTP status codes 300, 301, 302, 307, 308, 404, 405, 410, 421, 451 and 501 can be specified as values, and you cannot specify a status code more than once.",
      ).optional(),
      ttl: z.number().int().describe(
        "The TTL (in seconds) for which to cache responses with the corresponding status code. The maximum allowed value is 1800s (30 minutes), noting that infrequently accessed objects may be evicted from the cache before the defined TTL.",
      ).optional(),
    })).describe(
      "Sets a cache TTL for the specified HTTP status code. negative_caching must be enabled to configure negative_caching_policy. Omitting the policy and leaving negative_caching enabled will use Cloud CDN's default cache TTLs. Note that when specifying an explicit negative_caching_policy, you should take care to specify a cache TTL for all response codes that you wish to cache. Cloud CDN will not apply any default negative caching when a policy exists.",
    ).optional(),
    requestCoalescing: z.boolean().describe(
      "If true then Cloud CDN will combine multiple concurrent cache fill requests into a small number of requests to the origin.",
    ).optional(),
    serveWhileStale: z.number().int().describe(
      'Serve existing content from the cache (if available) when revalidating content with the origin, or when an error is encountered when refreshing the cache. This setting defines the default "max-stale" duration for any cached responses that do not specify a max-stale directive. Stale responses that exceed the TTL configured here will not be served. The default limit (max-stale) is 86400s (1 day), which will allow stale content to be served up to this limit beyond the max-age (or s-maxage) of a cached response. The maximum allowed value is 604800 (1 week). Set this to zero (0) to disable serve-while-stale.',
    ).optional(),
    signedUrlCacheMaxAgeSec: z.string().describe(
      'Maximum number of seconds the response to a signed URL request will be considered fresh. After this time period, the response will be revalidated before being served. Defaults to 1hr (3600s). When serving responses to signed URL requests, Cloud CDN will internally behave as though all responses from this backend had a "Cache-Control: public, max-age=[TTL]" header, regardless of any existing Cache-Control header. The actual headers served in responses will not be altered.',
    ).optional(),
    signedUrlKeyNames: z.array(z.string()).describe(
      "[Output Only] Names of the keys for signing request URLs.",
    ).optional(),
  }).describe(
    "Message containing Cloud CDN configuration for a backend bucket.",
  ).optional(),
  compressionMode: z.enum(["AUTOMATIC", "DISABLED"]).describe(
    "Compress text responses using Brotli or gzip compression, based on the client's Accept-Encoding header.",
  ).optional(),
  customResponseHeaders: z.array(z.string()).describe(
    "Headers that the Application Load Balancer should add to proxied responses.",
  ).optional(),
  description: z.string().describe(
    "An optional textual description of the resource; provided by the client when the resource is created.",
  ).optional(),
  enableCdn: z.boolean().describe(
    "If true, enable Cloud CDN for this BackendBucket.",
  ).optional(),
  loadBalancingScheme: z.enum(["INTERNAL_MANAGED"]).describe(
    "The value can only be INTERNAL_MANAGED for cross-region internal layer 7 load balancer. If loadBalancingScheme is not specified, the backend bucket can be used by classic global external load balancers, or global application external load balancers, or both.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid.',
    ).optional(),
  }).describe("Additional Backend Bucket parameters.").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine BackendBuckets. Registered at `@swamp/gcp/compute/backendbuckets`. */
export const model = {
  type: "@swamp/gcp/compute/backendbuckets",
  version: "2026.05.18.1",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Cloud Storage Bucket resource. This Cloud Storage bucket resourc...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a backendBuckets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["bucketName"] !== undefined) body["bucketName"] = g["bucketName"];
        if (g["cdnPolicy"] !== undefined) body["cdnPolicy"] = g["cdnPolicy"];
        if (g["compressionMode"] !== undefined) {
          body["compressionMode"] = g["compressionMode"];
        }
        if (g["customResponseHeaders"] !== undefined) {
          body["customResponseHeaders"] = g["customResponseHeaders"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableCdn"] !== undefined) body["enableCdn"] = g["enableCdn"];
        if (g["loadBalancingScheme"] !== undefined) {
          body["loadBalancingScheme"] = g["loadBalancingScheme"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["backendBucket"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a backendBuckets",
      arguments: z.object({
        identifier: z.string().describe("The name of the backendBuckets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["backendBucket"] = args.identifier;
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
      description: "Update backendBuckets attributes",
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
        params["backendBucket"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["bucketName"] !== undefined) body["bucketName"] = g["bucketName"];
        if (g["cdnPolicy"] !== undefined) body["cdnPolicy"] = g["cdnPolicy"];
        if (g["compressionMode"] !== undefined) {
          body["compressionMode"] = g["compressionMode"];
        }
        if (g["customResponseHeaders"] !== undefined) {
          body["customResponseHeaders"] = g["customResponseHeaders"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableCdn"] !== undefined) body["enableCdn"] = g["enableCdn"];
        if (g["loadBalancingScheme"] !== undefined) {
          body["loadBalancingScheme"] = g["loadBalancingScheme"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
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
      description: "Delete the backendBuckets",
      arguments: z.object({
        identifier: z.string().describe("The name of the backendBuckets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["backendBucket"] = args.identifier;
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
      description: "Sync backendBuckets state from GCP",
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
          params["backendBucket"] = identifier;
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
    add_signed_url_key: {
      description: "add signed url key",
      arguments: z.object({
        keyName: z.any().optional(),
        keyValue: z.any().optional(),
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
        params["backendBucket"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["keyName"] !== undefined) body["keyName"] = args["keyName"];
        if (args["keyValue"] !== undefined) body["keyValue"] = args["keyValue"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.backendBuckets.addSignedUrlKey",
            "path":
              "projects/{project}/global/backendBuckets/{backendBucket}/addSignedUrlKey",
            "httpMethod": "POST",
            "parameterOrder": ["project", "backendBucket"],
            "parameters": {
              "backendBucket": { "location": "path", "required": true },
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
    set_edge_security_policy: {
      description: "set edge security policy",
      arguments: z.object({
        securityPolicy: z.any().optional(),
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
        params["backendBucket"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["securityPolicy"] !== undefined) {
          body["securityPolicy"] = args["securityPolicy"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.backendBuckets.setEdgeSecurityPolicy",
            "path":
              "projects/{project}/global/backendBuckets/{backendBucket}/setEdgeSecurityPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "backendBucket"],
            "parameters": {
              "backendBucket": { "location": "path", "required": true },
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
