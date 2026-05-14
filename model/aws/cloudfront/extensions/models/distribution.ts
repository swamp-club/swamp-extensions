// Auto-generated extension model for @swamp/aws/cloudfront/distribution
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFront Distribution (AWS::CloudFront::Distribution).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

const CookiesSchema = z.object({
  Forward: z.string().describe(
    "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) in the *Amazon CloudFront Developer Guide*. If you want to send cookies to the origin but not include them in the cache key, use origin request policy. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) in the *Amazon CloudFront Developer Guide*. Specifies which cookies to forward to the origin for this cache behavior: all, none, or the list of cookies specified in the WhitelistedNames complex type. Amazon S3 doesn't process cookies. When the cache behavior is forwarding requests to an Amazon S3 origin, specify none for the Forward element.",
  ),
  WhitelistedNames: z.array(z.string()).describe(
    "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) in the *Amazon CloudFront Developer Guide*. If you want to send cookies to the origin but not include them in the cache key, use an origin request policy. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) in the *Amazon CloudFront Developer Guide*. Required if you specify whitelist for the value of Forward. A complex type that specifies how many different cookies you want CloudFront to forward to the origin for this cache behavior and, if you want to forward selected cookies, the names of those cookies. If you specify all or none for the value of Forward, omit WhitelistedNames. If you change the value of Forward from whitelist to all or none and you don't delete the WhitelistedNames element and its child elements, CloudFront deletes them automatically. For the current limit on the number of cookie names that you can whitelist for each cache behavior, see [CloudFront Limits](https://docs.aws.amazon.com/general/latest/gr/xrefaws_service_limits.html#limits_cloudfront) in the *General Reference*.",
  ).optional(),
});

const ForwardedValuesSchema = z.object({
  Cookies: CookiesSchema.describe(
    "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) in the *Amazon CloudFront Developer Guide*. If you want to send cookies to the origin but not include them in the cache key, use an origin request policy. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) in the *Amazon CloudFront Developer Guide*. A complex type that specifies whether you want CloudFront to forward cookies to the origin and, if so, which ones. For more information about forwarding cookies to the origin, see [How CloudFront Forwards, Caches, and Logs Cookies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Cookies.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  Headers: z.array(z.string()).describe(
    "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include headers in the cache key, use a cache policy. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) in the *Amazon CloudFront Developer Guide*. If you want to send headers to the origin but not include them in the cache key, use an origin request policy. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) in the *Amazon CloudFront Developer Guide*. A complex type that specifies the Headers, if any, that you want CloudFront to forward to the origin for this cache behavior (whitelisted headers). For the headers that you specify, CloudFront also caches separate versions of a specified object that is based on the header values in viewer requests. For more information, see [Caching Content Based on Request Headers](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/header-caching.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  QueryString: z.boolean().describe(
    "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include query strings in the cache key, use a cache policy. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) in the *Amazon CloudFront Developer Guide*. If you want to send query strings to the origin but not include them in the cache key, use an origin request policy. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) in the *Amazon CloudFront Developer Guide*. Indicates whether you want CloudFront to forward query strings to the origin that is associated with this cache behavior and cache based on the query string parameters. CloudFront behavior depends on the value of QueryString and on the values that you specify for QueryStringCacheKeys, if any: If you specify true for QueryString and you don't specify any values for QueryStringCacheKeys, CloudFront forwards all query string parameters to the origin and caches based on all query string parameters. Depending on how many query string parameters and values you have, this can adversely affect performance because CloudFront must forward more requests to the origin. If you specify true for QueryString and you specify one or more values for QueryStringCacheKeys, CloudFront forwards all query string parameters to the origin, but it only caches based on the query string parameters that you specify. If you specify false for QueryString, CloudFront doesn't forward any query string parameters to the origin, and doesn't cache based on query string parameters. For more information, see [Configuring CloudFront to Cache Based on Query String Parameters](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/QueryStringParameters.html) in the *Amazon CloudFront Developer Guide*.",
  ),
  QueryStringCacheKeys: z.array(z.string()).describe(
    "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include query strings in the cache key, use a cache policy. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) in the *Amazon CloudFront Developer Guide*. If you want to send query strings to the origin but not include them in the cache key, use an origin request policy. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) in the *Amazon CloudFront Developer Guide*. A complex type that contains information about the query string parameters that you want CloudFront to use for caching for this cache behavior.",
  ).optional(),
});

const FunctionAssociationSchema = z.object({
  EventType: z.string().describe(
    "The event type of the function, either viewer-request or viewer-response. You cannot use origin-facing event types ( origin-request and origin-response) with a CloudFront function.",
  ).optional(),
  FunctionARN: z.string().describe(
    "The Amazon Resource Name (ARN) of the function.",
  ).optional(),
});

const GrpcConfigSchema = z.object({
  Enabled: z.boolean().describe(
    "Enables your CloudFront distribution to receive gRPC requests and to proxy them directly to your origins.",
  ),
});

const LambdaFunctionAssociationSchema = z.object({
  EventType: z.string().describe(
    "Specifies the event type that triggers a Lambda@Edge function invocation. You can specify the following values: viewer-request: The function executes when CloudFront receives a request from a viewer and before it checks to see whether the requested object is in the edge cache. origin-request: The function executes only when CloudFront sends a request to your origin. When the requested object is in the edge cache, the function doesn't execute. origin-response: The function executes after CloudFront receives a response from the origin and before it caches the object in the response. When the requested object is in the edge cache, the function doesn't execute. viewer-response: The function executes before CloudFront returns the requested object to the viewer. The function executes regardless of whether the object was already in the edge cache. If the origin returns an HTTP status code other than HTTP 200 (OK), the function doesn't execute.",
  ).optional(),
  IncludeBody: z.boolean().describe(
    "A flag that allows a Lambda@Edge function to have read access to the body content. For more information, see [Accessing the Request Body by Choosing the Include Body Option](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-include-body-access.html) in the Amazon CloudFront Developer Guide.",
  ).optional(),
  LambdaFunctionARN: z.string().describe(
    "The ARN of the Lambda@Edge function. You must specify the ARN of a function version; you can't specify an alias or $LATEST.",
  ).optional(),
});

const CacheBehaviorSchema = z.object({
  AllowedMethods: z.array(z.string()).describe(
    "A complex type that controls which HTTP methods CloudFront processes and forwards to your Amazon S3 bucket or your custom origin. There are three choices: CloudFront forwards only GET and HEAD requests. CloudFront forwards only GET, HEAD, and OPTIONS requests. CloudFront forwards GET, HEAD, OPTIONS, PUT, PATCH, POST, and DELETE requests. If you pick the third choice, you may need to restrict access to your Amazon S3 bucket or to your custom origin so users can't perform operations that you don't want them to. For example, you might not want users to have permissions to delete objects from your origin.",
  ).optional(),
  CachePolicyId: z.string().describe(
    "The unique identifier of the cache policy that is attached to this cache behavior. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. A CacheBehavior must include either a CachePolicyId or ForwardedValues. We recommend that you use a CachePolicyId.",
  ).optional(),
  CachedMethods: z.array(z.string()).describe(
    "A complex type that controls whether CloudFront caches the response to requests using the specified HTTP methods. There are two choices: CloudFront caches responses to GET and HEAD requests. CloudFront caches responses to GET, HEAD, and OPTIONS requests. If you pick the second choice for your Amazon S3 Origin, you may need to forward Access-Control-Request-Method, Access-Control-Request-Headers, and Origin headers for the responses to be cached correctly.",
  ).optional(),
  Compress: z.boolean().describe(
    "Whether you want CloudFront to automatically compress certain files for this cache behavior. If so, specify true; if not, specify false. For more information, see [Serving Compressed Files](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  DefaultTTL: z.number().describe(
    "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. This field is deprecated. We recommend that you use the DefaultTTL field in a cache policy instead of this field. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. The default amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin does not add HTTP headers such as Cache-Control max-age, Cache-Control s-maxage, and Expires to objects. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  FieldLevelEncryptionId: z.string().describe(
    "The value of ID for the field-level encryption configuration that you want CloudFront to use for encrypting specific fields of data for this cache behavior.",
  ).optional(),
  ForwardedValues: ForwardedValuesSchema.describe(
    "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. For more information, see [Working with policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/working-with-policies.html) in the *Amazon CloudFront Developer Guide*. If you want to include values in the cache key, use a cache policy. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. If you want to send values to the origin but not include them in the cache key, use an origin request policy. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) or [Using the managed origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html) in the *Amazon CloudFront Developer Guide*. A CacheBehavior must include either a CachePolicyId or ForwardedValues. We recommend that you use a CachePolicyId. A complex type that specifies how CloudFront handles query strings, cookies, and HTTP headers.",
  ).optional(),
  FunctionAssociations: z.array(FunctionAssociationSchema).describe(
    "A list of CloudFront functions that are associated with this cache behavior. CloudFront functions must be published to the LIVE stage to associate them with a cache behavior.",
  ).optional(),
  GrpcConfig: GrpcConfigSchema.describe(
    "The gRPC configuration for your cache behavior.",
  ).optional(),
  LambdaFunctionAssociations: z.array(LambdaFunctionAssociationSchema).describe(
    "A complex type that contains zero or more Lambda@Edge function associations for a cache behavior.",
  ).optional(),
  MaxTTL: z.number().describe(
    "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. This field is deprecated. We recommend that you use the MaxTTL field in a cache policy instead of this field. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. The maximum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin adds HTTP headers such as Cache-Control max-age, Cache-Control s-maxage, and Expires to objects. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  MinTTL: z.number().describe(
    "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. This field is deprecated. We recommend that you use the MinTTL field in a cache policy instead of this field. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*. You must specify 0 for MinTTL if you configure CloudFront to forward all headers to your origin (under Headers, if you specify 1 for Quantity and * for Name).",
  ).optional(),
  OriginRequestPolicyId: z.string().describe(
    "The unique identifier of the origin request policy that is attached to this cache behavior. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) or [Using the managed origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  PathPattern: z.string().describe(
    "The pattern (for example, images/*.jpg) that specifies which requests to apply the behavior to. When CloudFront receives a viewer request, the requested path is compared with path patterns in the order in which cache behaviors are listed in the distribution. You can optionally include a slash ( /) at the beginning of the path pattern. For example, /images/*.jpg. CloudFront behavior is the same with or without the leading /. The path pattern for the default cache behavior is * and cannot be changed. If the request for an object does not match the path pattern for any cache behaviors, CloudFront applies the behavior in the default cache behavior. For more information, see [Path Pattern](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesPathPattern) in the *Amazon CloudFront Developer Guide*.",
  ),
  RealtimeLogConfigArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the real-time log configuration that is attached to this cache behavior. For more information, see [Real-time logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  ResponseHeadersPolicyId: z.string().describe(
    "The identifier for a response headers policy.",
  ).optional(),
  SmoothStreaming: z.boolean().describe(
    "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. Indicates whether you want to distribute media files in the Microsoft Smooth Streaming format using the origin that is associated with this cache behavior. If so, specify true; if not, specify false. If you specify true for SmoothStreaming, you can still distribute other content using this cache behavior if the content matches the value of PathPattern.",
  ).optional(),
  TargetOriginId: z.string().describe(
    "The value of ID for the origin that you want CloudFront to route requests to when they match this cache behavior.",
  ),
  TrustedKeyGroups: z.array(z.string()).describe(
    "A list of key groups that CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted key groups, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with a private key whose corresponding public key is in the key group. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see [Serving private content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  TrustedSigners: z.array(z.string()).describe(
    "We recommend using TrustedKeyGroups instead of TrustedSigners. This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. A list of AWS-account IDs whose public keys CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted signers, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with the private key of a CloudFront key pair in the trusted signer's AWS-account. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see [Serving private content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  ViewerProtocolPolicy: z.string().describe(
    "The protocol that viewers can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. You can specify the following options: allow-all: Viewers can use HTTP or HTTPS. redirect-to-https: If a viewer submits an HTTP request, CloudFront returns an HTTP status code of 301 (Moved Permanently) to the viewer along with the HTTPS URL. The viewer then resubmits the request using the new URL. https-only: If a viewer sends an HTTP request, CloudFront returns an HTTP status code of 403 (Forbidden). For more information about requiring the HTTPS protocol, see [Requiring HTTPS Between Viewers and CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html) in the *Amazon CloudFront Developer Guide*. The only way to guarantee that viewers retrieve an object that was fetched from the origin using HTTPS is never to use any other protocol to fetch the object. If you have recently changed from HTTP to HTTPS, we recommend that you clear your objects' cache because cached objects are protocol agnostic. That means that an edge location will return an object from the cache regardless of whether the current request protocol matches the protocol used previously. For more information, see [Managing Cache Expiration](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*.",
  ),
});

const CustomErrorResponseSchema = z.object({
  ErrorCachingMinTTL: z.number().describe(
    "The minimum amount of time, in seconds, that you want CloudFront to cache the HTTP status code specified in ErrorCode. When this time period has elapsed, CloudFront queries your origin to see whether the problem that caused the error has been resolved and the requested object is now available. For more information, see [Customizing Error Responses](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  ErrorCode: z.number().int().describe(
    "The HTTP status code for which you want to specify a custom error page and/or a caching duration.",
  ),
  ResponseCode: z.number().int().describe(
    "The HTTP status code that you want CloudFront to return to the viewer along with the custom error page. There are a variety of reasons that you might want CloudFront to return a status code different from the status code that your origin returned to CloudFront, for example: Some Internet devices (some firewalls and corporate proxies, for example) intercept HTTP 4xx and 5xx and prevent the response from being returned to the viewer. If you substitute 200, the response typically won't be intercepted. If you don't care about distinguishing among different client errors or server errors, you can specify 400 or 500 as the ResponseCode for all 4xx or 5xx errors. You might want to return a 200 status code (OK) and static website so your customers don't know that your website is down. If you specify a value for ResponseCode, you must also specify a value for ResponsePagePath.",
  ).optional(),
  ResponsePagePath: z.string().describe(
    "The path to the custom error page that you want CloudFront to return to a viewer when your origin returns the HTTP status code specified by ErrorCode, for example, /4xx-errors/403-forbidden.html. If you want to store your objects and your custom error pages in different locations, your distribution must include a cache behavior for which the following is true: The value of PathPattern matches the path to your custom error messages. For example, suppose you saved custom error pages for 4xx errors in an Amazon S3 bucket in a directory named /4xx-errors. Your distribution must include a cache behavior for which the path pattern routes requests for your custom error pages to that location, for example, /4xx-errors/*. The value of TargetOriginId specifies the value of the ID element for the origin that contains your custom error pages. If you specify a value for ResponsePagePath, you must also specify a value for ResponseCode. We recommend that you store custom error pages in an Amazon S3 bucket. If you store custom error pages on an HTTP server and the server starts to return 5xx errors, CloudFront can't get the files that you want to return to viewers because the origin server is unavailable.",
  ).optional(),
});

const LegacyCustomOriginSchema = z.object({
  DNSName: z.string().describe(
    "The domain name assigned to your CF distribution.",
  ),
  HTTPPort: z.number().int().describe(
    "The HTTP port that CF uses to connect to the origin. Specify the HTTP port that the origin listens on.",
  ).optional(),
  HTTPSPort: z.number().int().describe(
    "The HTTPS port that CF uses to connect to the origin. Specify the HTTPS port that the origin listens on.",
  ).optional(),
  OriginProtocolPolicy: z.string().describe(
    "Specifies the protocol (HTTP or HTTPS) that CF uses to connect to the origin.",
  ),
  OriginSSLProtocols: z.array(z.string()).describe(
    "The minimum SSL/TLS protocol version that CF uses when communicating with your origin server over HTTPs. For more information, see [Minimum Origin SSL Protocol](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginSSLProtocols) in the *Developer Guide*.",
  ),
});

const DefaultCacheBehaviorSchema = z.object({
  AllowedMethods: z.array(z.string()).describe(
    "A complex type that controls which HTTP methods CloudFront processes and forwards to your Amazon S3 bucket or your custom origin. There are three choices: CloudFront forwards only GET and HEAD requests. CloudFront forwards only GET, HEAD, and OPTIONS requests. CloudFront forwards GET, HEAD, OPTIONS, PUT, PATCH, POST, and DELETE requests. If you pick the third choice, you may need to restrict access to your Amazon S3 bucket or to your custom origin so users can't perform operations that you don't want them to. For example, you might not want users to have permissions to delete objects from your origin.",
  ).optional(),
  CachePolicyId: z.string().describe(
    "The unique identifier of the cache policy that is attached to the default cache behavior. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. A DefaultCacheBehavior must include either a CachePolicyId or ForwardedValues. We recommend that you use a CachePolicyId.",
  ).optional(),
  CachedMethods: z.array(z.string()).describe(
    "A complex type that controls whether CloudFront caches the response to requests using the specified HTTP methods. There are two choices: CloudFront caches responses to GET and HEAD requests. CloudFront caches responses to GET, HEAD, and OPTIONS requests. If you pick the second choice for your Amazon S3 Origin, you may need to forward Access-Control-Request-Method, Access-Control-Request-Headers, and Origin headers for the responses to be cached correctly.",
  ).optional(),
  Compress: z.boolean().describe(
    "Whether you want CloudFront to automatically compress certain files for this cache behavior. If so, specify true; if not, specify false. For more information, see [Serving Compressed Files](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  DefaultTTL: z.number().describe(
    "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. This field is deprecated. We recommend that you use the DefaultTTL field in a cache policy instead of this field. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. The default amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin does not add HTTP headers such as Cache-Control max-age, Cache-Control s-maxage, and Expires to objects. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  FieldLevelEncryptionId: z.string().describe(
    "The value of ID for the field-level encryption configuration that you want CloudFront to use for encrypting specific fields of data for the default cache behavior.",
  ).optional(),
  ForwardedValues: ForwardedValuesSchema.describe(
    "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. For more information, see [Working with policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/working-with-policies.html) in the *Amazon CloudFront Developer Guide*. If you want to include values in the cache key, use a cache policy. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. If you want to send values to the origin but not include them in the cache key, use an origin request policy. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) or [Using the managed origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html) in the *Amazon CloudFront Developer Guide*. A DefaultCacheBehavior must include either a CachePolicyId or ForwardedValues. We recommend that you use a CachePolicyId. A complex type that specifies how CloudFront handles query strings, cookies, and HTTP headers.",
  ).optional(),
  FunctionAssociations: z.array(FunctionAssociationSchema).describe(
    "A list of CloudFront functions that are associated with this cache behavior. Your functions must be published to the LIVE stage to associate them with a cache behavior.",
  ).optional(),
  GrpcConfig: GrpcConfigSchema.describe(
    "The gRPC configuration for your cache behavior.",
  ).optional(),
  LambdaFunctionAssociations: z.array(LambdaFunctionAssociationSchema).describe(
    "A complex type that contains zero or more Lambda@Edge function associations for a cache behavior.",
  ).optional(),
  MaxTTL: z.number().describe(
    "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. This field is deprecated. We recommend that you use the MaxTTL field in a cache policy instead of this field. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. The maximum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin adds HTTP headers such as Cache-Control max-age, Cache-Control s-maxage, and Expires to objects. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  MinTTL: z.number().describe(
    "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. This field is deprecated. We recommend that you use the MinTTL field in a cache policy instead of this field. For more information, see [Creating cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-key-create-cache-policy) or [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html) in the *Amazon CloudFront Developer Guide*. The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*. You must specify 0 for MinTTL if you configure CloudFront to forward all headers to your origin (under Headers, if you specify 1 for Quantity and * for Name).",
  ).optional(),
  OriginRequestPolicyId: z.string().describe(
    "The unique identifier of the origin request policy that is attached to the default cache behavior. For more information, see [Creating origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy) or [Using the managed origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  RealtimeLogConfigArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the real-time log configuration that is attached to this cache behavior. For more information, see [Real-time logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  ResponseHeadersPolicyId: z.string().describe(
    "The identifier for a response headers policy.",
  ).optional(),
  SmoothStreaming: z.boolean().describe(
    "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. Indicates whether you want to distribute media files in the Microsoft Smooth Streaming format using the origin that is associated with this cache behavior. If so, specify true; if not, specify false. If you specify true for SmoothStreaming, you can still distribute other content using this cache behavior if the content matches the value of PathPattern.",
  ).optional(),
  TargetOriginId: z.string().describe(
    "The value of ID for the origin that you want CloudFront to route requests to when they use the default cache behavior.",
  ),
  TrustedKeyGroups: z.array(z.string()).describe(
    "A list of key groups that CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted key groups, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with a private key whose corresponding public key is in the key group. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see [Serving private content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  TrustedSigners: z.array(z.string()).describe(
    "We recommend using TrustedKeyGroups instead of TrustedSigners. This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. A list of AWS-account IDs whose public keys CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted signers, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with the private key of a CloudFront key pair in a trusted signer's AWS-account. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see [Serving private content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  ViewerProtocolPolicy: z.string().describe(
    "The protocol that viewers can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. You can specify the following options: allow-all: Viewers can use HTTP or HTTPS. redirect-to-https: If a viewer submits an HTTP request, CloudFront returns an HTTP status code of 301 (Moved Permanently) to the viewer along with the HTTPS URL. The viewer then resubmits the request using the new URL. https-only: If a viewer sends an HTTP request, CloudFront returns an HTTP status code of 403 (Forbidden). For more information about requiring the HTTPS protocol, see [Requiring HTTPS Between Viewers and CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html) in the *Amazon CloudFront Developer Guide*. The only way to guarantee that viewers retrieve an object that was fetched from the origin using HTTPS is never to use any other protocol to fetch the object. If you have recently changed from HTTP to HTTPS, we recommend that you clear your objects' cache because cached objects are protocol agnostic. That means that an edge location will return an object from the cache regardless of whether the current request protocol matches the protocol used previously. For more information, see [Managing Cache Expiration](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*.",
  ),
});

const LoggingSchema = z.object({
  Bucket: z.string().describe(
    "The Amazon S3 bucket to store the access logs in, for example, amzn-s3-demo-bucket.s3.amazonaws.com.",
  ).optional(),
  IncludeCookies: z.boolean().describe(
    "Specifies whether you want CloudFront to include cookies in access logs, specify true for IncludeCookies. If you choose to include cookies in logs, CloudFront logs all cookies regardless of how you configure the cache behaviors for this distribution. If you don't want to include cookies when you create a distribution or if you want to disable include cookies for an existing distribution, specify false for IncludeCookies.",
  ).optional(),
  Prefix: z.string().describe(
    "An optional string that you want CloudFront to prefix to the access log filenames for this distribution, for example, myprefix/. If you want to enable logging, but you don't want to specify a prefix, you still must include an empty Prefix element in the Logging element.",
  ).optional(),
});

const StatusCodesSchema = z.object({
  Items: z.array(z.number().int()).describe(
    "The items (status codes) for an origin group.",
  ),
  Quantity: z.number().int().describe("The number of status codes."),
});

const OriginGroupFailoverCriteriaSchema = z.object({
  StatusCodes: StatusCodesSchema.describe(
    "The status codes that, when returned from the primary origin, will trigger CloudFront to failover to the second origin.",
  ),
});

const OriginGroupMemberSchema = z.object({
  OriginId: z.string().describe("The ID for an origin in an origin group."),
});

const OriginGroupMembersSchema = z.object({
  Items: z.array(OriginGroupMemberSchema).describe(
    "Items (origins) in an origin group.",
  ),
  Quantity: z.number().int().describe(
    "The number of origins in an origin group.",
  ),
});

const OriginGroupSchema = z.object({
  FailoverCriteria: OriginGroupFailoverCriteriaSchema.describe(
    "A complex type that contains information about the failover criteria for an origin group.",
  ),
  Id: z.string().describe("The origin group's ID."),
  Members: OriginGroupMembersSchema.describe(
    "A complex type that contains information about the origins in an origin group.",
  ),
  SelectionCriteria: z.enum(["default", "media-quality-based"]).describe(
    "The selection criteria for the origin group. For more information, see [Create an origin group](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#concept_origin_groups.creating) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
});

const OriginGroupsSchema = z.object({
  Items: z.array(OriginGroupSchema).describe(
    "The items (origin groups) in a distribution.",
  ).optional(),
  Quantity: z.number().int().describe("The number of origin groups."),
});

const OriginMtlsConfigSchema = z.object({
  ClientCertificateArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the client certificate stored in AWS Certificate Manager (ACM) that CloudFront uses to authenticate with your origin using Mutual TLS.",
  ),
});

const CustomOriginConfigSchema = z.object({
  HTTPPort: z.number().int().describe(
    "The HTTP port that CloudFront uses to connect to the origin. Specify the HTTP port that the origin listens on.",
  ).optional(),
  HTTPSPort: z.number().int().describe(
    "The HTTPS port that CloudFront uses to connect to the origin. Specify the HTTPS port that the origin listens on.",
  ).optional(),
  OriginKeepaliveTimeout: z.number().int().describe(
    "Specifies how long, in seconds, CloudFront persists its connection to the origin. The minimum timeout is 1 second, the maximum is 120 seconds, and the default (if you don't specify otherwise) is 5 seconds. For more information, see [Keep-alive timeout (custom origins only)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#DownloadDistValuesOriginKeepaliveTimeout) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  OriginProtocolPolicy: z.string().describe(
    "Specifies the protocol (HTTP or HTTPS) that CloudFront uses to connect to the origin. Valid values are: http-only – CloudFront always uses HTTP to connect to the origin. match-viewer – CloudFront connects to the origin using the same protocol that the viewer used to connect to CloudFront. https-only – CloudFront always uses HTTPS to connect to the origin.",
  ),
  OriginReadTimeout: z.number().int().describe(
    "Specifies how long, in seconds, CloudFront waits for a response from the origin. This is also known as the *origin response timeout*. The minimum timeout is 1 second, the maximum is 120 seconds, and the default (if you don't specify otherwise) is 30 seconds. For more information, see [Response timeout](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#DownloadDistValuesOriginResponseTimeout) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  OriginSSLProtocols: z.array(z.string()).describe(
    "Specifies the minimum SSL/TLS protocol that CloudFront uses when connecting to your origin over HTTPS. Valid values include SSLv3, TLSv1, TLSv1.1, and TLSv1.2. For more information, see [Minimum Origin SSL Protocol](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#DownloadDistValuesOriginSSLProtocols) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  IpAddressType: z.enum(["ipv4", "ipv6", "dualstack"]).describe(
    "Specifies which IP protocol CloudFront uses when connecting to your origin. If your origin uses both IPv4 and IPv6 protocols, you can choose dualstack to help optimize reliability.",
  ).optional(),
  OriginMtlsConfig: OriginMtlsConfigSchema.describe(
    "Configures mutual TLS authentication between CloudFront and your origin server.",
  ).optional(),
});

const OriginCustomHeaderSchema = z.object({
  HeaderName: z.string().describe(
    "The name of a header that you want CloudFront to send to your origin. For more information, see [Adding Custom Headers to Origin Requests](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/forward-custom-headers.html) in the *Amazon CloudFront Developer Guide*.",
  ),
  HeaderValue: z.string().describe(
    "The value for the header that you specified in the HeaderName field.",
  ),
});

const OriginShieldSchema = z.object({
  Enabled: z.boolean().describe(
    "A flag that specifies whether Origin Shield is enabled. When it's enabled, CloudFront routes all requests through Origin Shield, which can help protect your origin. When it's disabled, CloudFront might send requests directly to your origin from multiple edge locations or regional edge caches.",
  ).optional(),
  OriginShieldRegion: z.string().describe(
    "The AWS-Region for Origin Shield. Specify the AWS-Region that has the lowest latency to your origin. To specify a region, use the region code, not the region name. For example, specify the US East (Ohio) region as us-east-2. When you enable CloudFront Origin Shield, you must specify the AWS-Region for Origin Shield. For the list of AWS-Regions that you can specify, and for help choosing the best Region for your origin, see [Choosing the for Origin Shield](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#choose-origin-shield-region) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
});

const S3OriginConfigSchema = z.object({
  OriginAccessIdentity: z.string().describe(
    "If you're using origin access control (OAC) instead of origin access identity, specify an empty OriginAccessIdentity element. For more information, see [Restricting access to an](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-origin.html) in the *Amazon CloudFront Developer Guide*. The CloudFront origin access identity to associate with the origin. Use an origin access identity to configure the origin so that viewers can *only* access objects in an Amazon S3 bucket through CloudFront. The format of the value is: origin-access-identity/cloudfront/ID-of-origin-access-identity The ID-of-origin-access-identity is the value that CloudFront returned in the ID element when you created the origin access identity. If you want viewers to be able to access objects using either the CloudFront URL or the Amazon S3 URL, specify an empty OriginAccessIdentity element. To delete the origin access identity from an existing distribution, update the distribution configuration and include an empty OriginAccessIdentity element. To replace the origin access identity, update the distribution configuration and specify the new origin access identity. For more information about the origin access identity, see [Serving Private Content through CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  OriginReadTimeout: z.number().int().describe(
    "Specifies how long, in seconds, CloudFront waits for a response from the origin. This is also known as the *origin response timeout*. The minimum timeout is 1 second, the maximum is 120 seconds, and the default (if you don't specify otherwise) is 30 seconds. For more information, see [Response timeout](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#DownloadDistValuesOriginResponseTimeout) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
});

const VpcOriginConfigSchema = z.object({
  OriginKeepaliveTimeout: z.number().int().describe(
    "Specifies how long, in seconds, CloudFront persists its connection to the origin. The minimum timeout is 1 second, the maximum is 120 seconds, and the default (if you don't specify otherwise) is 5 seconds. For more information, see [Keep-alive timeout (custom origins only)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#DownloadDistValuesOriginKeepaliveTimeout) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  OriginReadTimeout: z.number().int().describe(
    "Specifies how long, in seconds, CloudFront waits for a response from the origin. This is also known as the *origin response timeout*. The minimum timeout is 1 second, the maximum is 120 seconds, and the default (if you don't specify otherwise) is 30 seconds. For more information, see [Response timeout](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#DownloadDistValuesOriginResponseTimeout) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  OwnerAccountId: z.string().describe(
    "The account ID of the AWS-account that owns the VPC origin.",
  ).optional(),
  VpcOriginId: z.string().describe("The VPC origin ID."),
});

const OriginSchema = z.object({
  ConnectionAttempts: z.number().int().describe(
    "The number of times that CloudFront attempts to connect to the origin. The minimum number is 1, the maximum is 3, and the default (if you don't specify otherwise) is 3. For a custom origin (including an Amazon S3 bucket that's configured with static website hosting), this value also specifies the number of times that CloudFront attempts to get a response from the origin, in the case of an [Origin Response Timeout](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginResponseTimeout). For more information, see [Origin Connection Attempts](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#origin-connection-attempts) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  ConnectionTimeout: z.number().int().describe(
    "The number of seconds that CloudFront waits when trying to establish a connection to the origin. The minimum timeout is 1 second, the maximum is 10 seconds, and the default (if you don't specify otherwise) is 10 seconds. For more information, see [Origin Connection Timeout](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#origin-connection-timeout) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  ResponseCompletionTimeout: z.number().int().describe(
    "The time (in seconds) that a request from CloudFront to the origin can stay open and wait for a response. If the complete response isn't received from the origin by this time, CloudFront ends the connection. The value for ResponseCompletionTimeout must be equal to or greater than the value for OriginReadTimeout. If you don't set a value for ResponseCompletionTimeout, CloudFront doesn't enforce a maximum value. For more information, see [Response completion timeout](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html#response-completion-timeout) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  CustomOriginConfig: CustomOriginConfigSchema.describe(
    "Use this type to specify an origin that is not an Amazon S3 bucket, with one exception. If the Amazon S3 bucket is configured with static website hosting, use this type. If the Amazon S3 bucket is not configured with static website hosting, use the S3OriginConfig type instead.",
  ).optional(),
  DomainName: z.string().describe(
    "The domain name for the origin. For more information, see [Origin Domain Name](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesDomainName) in the *Amazon CloudFront Developer Guide*.",
  ),
  Id: z.string().describe(
    "A unique identifier for the origin. This value must be unique within the distribution. Use this value to specify the TargetOriginId in a CacheBehavior or DefaultCacheBehavior.",
  ),
  OriginAccessControlId: z.string().describe(
    "The unique identifier of an origin access control for this origin. For more information, see [Restricting access to an Amazon S3 origin](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  OriginCustomHeaders: z.array(OriginCustomHeaderSchema).describe(
    "A list of HTTP header names and values that CloudFront adds to the requests that it sends to the origin. For more information, see [Adding Custom Headers to Origin Requests](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-custom-headers.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  OriginPath: z.string().describe(
    "An optional path that CloudFront appends to the origin domain name when CloudFront requests content from the origin. For more information, see [Origin Path](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginPath) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  OriginShield: OriginShieldSchema.describe(
    "CloudFront Origin Shield. Using Origin Shield can help reduce the load on your origin. For more information, see [Using Origin Shield](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html) in the *Amazon CloudFront Developer Guide*.",
  ).optional(),
  S3OriginConfig: S3OriginConfigSchema.describe(
    "Use this type to specify an origin that is an Amazon S3 bucket that is not configured with static website hosting. To specify any other type of origin, including an Amazon S3 bucket that is configured with static website hosting, use the CustomOriginConfig type instead.",
  ).optional(),
  VpcOriginConfig: VpcOriginConfigSchema.describe(
    "The VPC origin configuration.",
  ).optional(),
});

const GeoRestrictionSchema = z.object({
  Locations: z.array(z.string()).describe(
    "A complex type that contains a Location element for each country in which you want CloudFront either to distribute your content ( whitelist) or not distribute your content ( blacklist). The Location element is a two-letter, uppercase country code for a country that you want to include in your blacklist or whitelist. Include one Location element for each country. CloudFront and MaxMind both use ISO 3166 country codes. For the current list of countries and the corresponding codes, see ISO 3166-1-alpha-2 code on the *International Organization for Standardization* website. You can also refer to the country list on the CloudFront console, which includes both country names and codes.",
  ).optional(),
  RestrictionType: z.string().describe(
    "The method that you want to use to restrict distribution of your content by country: none: No geo restriction is enabled, meaning access to content is not restricted by client geo location. blacklist: The Location elements specify the countries in which you don't want CloudFront to distribute your content. whitelist: The Location elements specify the countries in which you want CloudFront to distribute your content.",
  ),
});

const RestrictionsSchema = z.object({
  GeoRestriction: GeoRestrictionSchema.describe(
    "A complex type that controls the countries in which your content is distributed. CF determines the location of your users using MaxMind GeoIP databases. To disable geo restriction, remove the [Restrictions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-distributionconfig.html#cfn-cloudfront-distribution-distributionconfig-restrictions) property from your stack template.",
  ),
});

const LegacyS3OriginSchema = z.object({
  DNSName: z.string().describe(
    "The domain name assigned to your CF distribution.",
  ),
  OriginAccessIdentity: z.string().describe(
    "The CF origin access identity to associate with the distribution. Use an origin access identity to configure the distribution so that end users can only access objects in an S3 through CF. This property is legacy. We recommend that you use [OriginAccessControl](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudfront-originaccesscontrol.html) instead.",
  ).optional(),
});

const ParameterDefinitionSchema = z.object({
  Name: z.string().describe("The name of the parameter."),
  Definition: z.object({
    StringSchema: z.object({
      Comment: z.string().optional(),
      DefaultValue: z.string().optional(),
      Required: z.boolean(),
    }).optional(),
  }).describe("The value that you assigned to the parameter."),
});

const CacheTagConfigSchema = z.object({
  HeaderName: z.string().describe(
    "The name of the HTTP header that your origin includes in responses. CloudFront uses this header to extract cache tags. The header value must contain comma-separated tag values (for example, product:electronics, category:tv, brand:example).",
  ),
});

const TrustStoreConfigSchema = z.object({
  TrustStoreId: z.string().describe("The trust store ID."),
  AdvertiseTrustStoreCaNames: z.boolean().describe(
    "The configuration to use to advertise trust store CA names.",
  ).optional(),
  IgnoreCertificateExpiry: z.boolean().describe(
    "The configuration to use to ignore certificate expiration.",
  ).optional(),
});

const ViewerMtlsConfigSchema = z.object({
  Mode: z.enum(["required", "optional", "passthrough"]).describe(
    "The viewer mTLS mode.",
  ).optional(),
  TrustStoreConfig: TrustStoreConfigSchema.describe(
    "The trust store configuration associated with the viewer mTLS configuration.",
  ).optional(),
});

const ViewerCertificateSchema = z.object({
  AcmCertificateArn: z.string().describe(
    "In CloudFormation, this field name is AcmCertificateArn. Note the different capitalization. If the distribution uses Aliases (alternate domain names or CNAMEs) and the SSL/TLS certificate is stored in [(ACM)](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html), provide the Amazon Resource Name (ARN) of the ACM certificate. CloudFront only supports ACM certificates in the US East (N. Virginia) Region ( us-east-1). If you specify an ACM certificate ARN, you must also specify values for MinimumProtocolVersion and SSLSupportMethod. (In CloudFormation, the field name is SslSupportMethod. Note the different capitalization.)",
  ).optional(),
  CloudFrontDefaultCertificate: z.boolean().describe(
    "If the distribution uses the CloudFront domain name such as d111111abcdef8.cloudfront.net, set this field to true. If the distribution uses Aliases (alternate domain names or CNAMEs), omit this field and specify values for the following fields: AcmCertificateArn or IamCertificateId (specify a value for one, not both) MinimumProtocolVersion SslSupportMethod",
  ).optional(),
  IamCertificateId: z.string().describe(
    "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. In CloudFormation, this field name is IamCertificateId. Note the different capitalization. If the distribution uses Aliases (alternate domain names or CNAMEs) and the SSL/TLS certificate is stored in [(IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html), provide the ID of the IAM certificate. If you specify an IAM certificate ID, you must also specify values for MinimumProtocolVersion and SSLSupportMethod. (In CloudFormation, the field name is SslSupportMethod. Note the different capitalization.)",
  ).optional(),
  MinimumProtocolVersion: z.string().describe(
    "If the distribution uses Aliases (alternate domain names or CNAMEs), specify the security policy that you want CloudFront to use for HTTPS connections with viewers. The security policy determines two settings: The minimum SSL/TLS protocol that CloudFront can use to communicate with viewers. The ciphers that CloudFront can use to encrypt the content that it returns to viewers. For more information, see [Security Policy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValues-security-policy) and [Supported Protocols and Ciphers Between Viewers and CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/secure-connections-supported-viewer-protocols-ciphers.html#secure-connections-supported-ciphers) in the *Amazon CloudFront Developer Guide*. On the CloudFront console, this setting is called *Security Policy*. When you're using SNI only (you set SSLSupportMethod to sni-only), you must specify TLSv1 or higher. (In CloudFormation, the field name is SslSupportMethod. Note the different capitalization.) If the distribution uses the CloudFront domain name such as d111111abcdef8.cloudfront.net (you set CloudFrontDefaultCertificate to true), CloudFront automatically sets the security policy to TLSv1 regardless of the value that you set here.",
  ).optional(),
  SslSupportMethod: z.string().describe(
    "In CloudFormation, this field name is SslSupportMethod. Note the different capitalization. If the distribution uses Aliases (alternate domain names or CNAMEs), specify which viewers the distribution accepts HTTPS connections from. sni-only – The distribution accepts HTTPS connections from only viewers that support [server name indication (SNI)](https://docs.aws.amazon.com/https://en.wikipedia.org/wiki/Server_Name_Indication). This is recommended. Most browsers and clients support SNI. vip – The distribution accepts HTTPS connections from all viewers including those that don't support SNI. This is not recommended, and results in additional monthly charges from CloudFront. static-ip - Do not specify this value unless your distribution has been enabled for this feature by the CloudFront team. If you have a use case that requires static IP addresses for a distribution, contact CloudFront through the [Center](https://docs.aws.amazon.com/support/home). If the distribution uses the CloudFront domain name such as d111111abcdef8.cloudfront.net, don't set a value for this field.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().describe(
    "A string that contains Tag key. The string length should be between 1 and 128 characters. Valid characters include a-z, A-Z, 0-9, space, and the special characters _ -.: / = + @.",
  ),
  Value: z.string().describe(
    "A string that contains an optional Tag value. The string length should be between 0 and 256 characters. Valid characters include a-z, A-Z, 0-9, space, and the special characters _ -.: / = + @.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DistributionConfig: z.object({
    Aliases: z.array(z.string()).describe(
      "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. A complex type that contains information about CNAMEs (alternate domain names), if any, for this distribution.",
    ).optional(),
    AnycastIpListId: z.string().describe(
      "To use this field for a multi-tenant distribution, use a connection group instead. For more information, see [ConnectionGroup](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_ConnectionGroup.html). ID of the Anycast static IP list that is associated with the distribution.",
    ).optional(),
    CNAMEs: z.array(z.string()).describe(
      "An alias for the CF distribution's domain name. This property is legacy. We recommend that you use [Aliases](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-distributionconfig.html#cfn-cloudfront-distribution-distributionconfig-aliases) instead.",
    ).optional(),
    CacheBehaviors: z.array(CacheBehaviorSchema).describe(
      "A complex type that contains zero or more CacheBehavior elements.",
    ).optional(),
    Comment: z.string().describe(
      "A comment to describe the distribution. The comment cannot be longer than 128 characters.",
    ).optional(),
    ConnectionMode: z.enum(["direct", "tenant-only"]).describe(
      "This field specifies whether the connection mode is through a standard distribution (direct) or a multi-tenant distribution with distribution tenants (tenant-only).",
    ).optional(),
    ContinuousDeploymentPolicyId: z.string().describe(
      "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. The identifier of a continuous deployment policy. For more information, see CreateContinuousDeploymentPolicy.",
    ).optional(),
    CustomErrorResponses: z.array(CustomErrorResponseSchema).describe(
      "A complex type that controls the following: Whether CloudFront replaces HTTP status codes in the 4xx and 5xx range with custom error messages before returning the response to the viewer. How long CloudFront caches HTTP status codes in the 4xx and 5xx range. For more information about custom error pages, see [Customizing Error Responses](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html) in the *Amazon CloudFront Developer Guide*.",
    ).optional(),
    CustomOrigin: LegacyCustomOriginSchema.describe(
      "The user-defined HTTP server that serves as the origin for content that CF distributes. This property is legacy. We recommend that you use [Origin](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-origin.html) instead.",
    ).optional(),
    DefaultCacheBehavior: DefaultCacheBehaviorSchema.describe(
      "A complex type that describes the default cache behavior if you don't specify a CacheBehavior element or if files don't match any of the values of PathPattern in CacheBehavior elements. You must create exactly one default cache behavior.",
    ),
    DefaultRootObject: z.string().describe(
      "When a viewer requests the root URL for your distribution, the default root object is the object that you want CloudFront to request from your origin. For example, if your root URL is https://www.example.com, you can specify CloudFront to return the index.html file as the default root object. You can specify a default root object so that viewers see a specific file or object, instead of another object in your distribution (for example, https://www.example.com/product-description.html). A default root object avoids exposing the contents of your distribution. You can specify the object name or a path to the object name (for example, index.html or exampleFolderName/index.html). Your string can't begin with a forward slash ( /). Only specify the object name or the path to the object. If you don't want to specify a default root object when you create a distribution, include an empty DefaultRootObject element. To delete the default root object from an existing distribution, update the distribution configuration and include an empty DefaultRootObject element. To replace the default root object, update the distribution configuration and specify the new object. For more information about the default root object, see [Specify a default root object](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html) in the *Amazon CloudFront Developer Guide*.",
    ).optional(),
    Enabled: z.boolean().describe(
      "From this field, you can enable or disable the selected distribution.",
    ),
    HttpVersion: z.string().describe(
      "(Optional) Specify the HTTP version(s) that you want viewers to use to communicate with CF. The default value for new distributions is http1.1. For viewers and CF to use HTTP/2, viewers must support TLSv1.2 or later, and must support Server Name Indication (SNI). For viewers and CF to use HTTP/3, viewers must support TLSv1.3 and Server Name Indication (SNI). CF supports HTTP/3 connection migration to allow the viewer to switch networks without losing connection. For more information about connection migration, see [Connection Migration](https://docs.aws.amazon.com/https://www.rfc-editor.org/rfc/rfc9000.html#name-connection-migration) at RFC 9000. For more information about supported TLSv1.3 ciphers, see [Supported protocols and ciphers between viewers and CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/secure-connections-supported-viewer-protocols-ciphers.html).",
    ).optional(),
    IPV6Enabled: z.boolean().describe(
      "To use this field for a multi-tenant distribution, use a connection group instead. For more information, see [ConnectionGroup](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_ConnectionGroup.html). If you want CloudFront to respond to IPv6 DNS requests with an IPv6 address for your distribution, specify true. If you specify false, CloudFront responds to IPv6 DNS requests with the DNS response code NOERROR and with no IP addresses. This allows viewers to submit a second request, for an IPv4 address for your distribution. In general, you should enable IPv6 if you have users on IPv6 networks who want to access your content. However, if you're using signed URLs or signed cookies to restrict access to your content, and if you're using a custom policy that includes the IpAddress parameter to restrict the IP addresses that can access your content, don't enable IPv6. If you want to restrict access to some content by IP address and not restrict access to other content (or restrict access but not by IP address), you can create two distributions. For more information, see [Creating a Signed URL Using a Custom Policy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html) in the *Amazon CloudFront Developer Guide*. If you're using an R53AWSIntlong alias resource record set to route traffic to your CloudFront distribution, you need to create a second alias resource record set when both of the following are true: You enable IPv6 for the distribution You're using alternate domain names in the URLs for your objects For more information, see [Routing Traffic to an Amazon CloudFront Web Distribution by Using Your Domain Name](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html) in the *Developer Guide*. If you created a CNAME resource record set, either with R53AWSIntlong or with another DNS service, you don't need to make any changes. A CNAME record will route traffic to your distribution regardless of the IP address format of the viewer request.",
    ).optional(),
    Logging: LoggingSchema.describe(
      "A complex type that controls whether access logs are written for the distribution. For more information about logging, see [Access Logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html) in the *Amazon CloudFront Developer Guide*.",
    ).optional(),
    OriginGroups: OriginGroupsSchema.describe(
      "A complex type that contains information about origin groups for this distribution. Specify a value for either the Origins or OriginGroups property.",
    ).optional(),
    Origins: z.array(OriginSchema).describe(
      "A complex type that contains information about origins for this distribution. Specify a value for either the Origins or OriginGroups property.",
    ).optional(),
    PriceClass: z.string().describe(
      "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. The price class that corresponds with the maximum price that you want to pay for CloudFront service. If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations. If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location that has the lowest latency among the edge locations in your price class. Viewers who are in or near regions that are excluded from your specified price class may encounter slower performance. For more information about price classes, see [Choosing the Price Class for a CloudFront Distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html) in the *Amazon CloudFront Developer Guide*. For information about CloudFront pricing, including how price classes (such as Price Class 100) map to CloudFront regions, see [Amazon CloudFront Pricing](https://docs.aws.amazon.com/cloudfront/pricing/).",
    ).optional(),
    Restrictions: RestrictionsSchema.describe(
      "A complex type that identifies ways in which you want to restrict distribution of your content.",
    ).optional(),
    S3Origin: LegacyS3OriginSchema.describe(
      "The origin as an S3 bucket. This property is legacy. We recommend that you use [Origin](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-origin.html) instead.",
    ).optional(),
    Staging: z.boolean().describe(
      "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. A Boolean that indicates whether this is a staging distribution. When this value is true, this is a staging distribution. When this value is false, this is not a staging distribution.",
    ).optional(),
    TenantConfig: z.object({
      ParameterDefinitions: z.array(ParameterDefinitionSchema).optional(),
    }).describe(
      "This field only supports multi-tenant distributions. You can't specify this field for standard distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. A distribution tenant configuration.",
    ).optional(),
    CacheTagConfig: CacheTagConfigSchema.describe(
      "Configuration for cache tag extraction from origin responses. When specified, CloudFront reads the header named in HeaderName from origin responses and stores the comma-separated values as cache tags on the object. Distributions without CacheTagConfig do not extract tags. When CacheTagConfig is removed from a distribution via UpdateDistribution, CloudFront stops extracting tags from origin responses. Changing the HeaderName on an existing distribution does not retroactively affect previously cached objects. Tag-based invalidations will not apply to objects already cached using a previous header. To ensure tag invalidations function after updating the header name, use path-based invalidations to recache all objects that use cache tags.",
    ).optional(),
    ViewerMtlsConfig: ViewerMtlsConfigSchema.describe(
      "The distribution's viewer mTLS configuration.",
    ).optional(),
    ViewerCertificate: ViewerCertificateSchema.describe(
      "A complex type that determines the distribution's SSL/TLS configuration for communicating with viewers.",
    ).optional(),
    WebACLId: z.string().describe(
      "Multi-tenant distributions only support WAF V2 web ACLs. A unique identifier that specifies the WAF web ACL, if any, to associate with this distribution. To specify a web ACL created using the latest version of WAF, use the ACL ARN, for example arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/a1b2c3d4-5678-90ab-cdef-EXAMPLE11111. To specify a web ACL created using WAF Classic, use the ACL ID, for example a1b2c3d4-5678-90ab-cdef-EXAMPLE11111. WAF is a web application firewall that lets you monitor the HTTP and HTTPS requests that are forwarded to CloudFront, and lets you control access to your content. Based on conditions that you specify, such as the IP addresses that requests originate from or the values of query strings, CloudFront responds to requests either with the requested content or with an HTTP 403 status code (Forbidden). You can also configure CloudFront to return a custom error page when a request is blocked. For more information about WAF, see the [Developer Guide](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html).",
    ).optional(),
  }).describe("The distribution's configuration."),
  Tags: z.array(TagSchema).describe(
    "A complex type that contains zero or more Tag elements.",
  ).optional(),
});

const StateSchema = z.object({
  DistributionConfig: z.object({
    Aliases: z.array(z.string()),
    AnycastIpListId: z.string(),
    CNAMEs: z.array(z.string()),
    CacheBehaviors: z.array(CacheBehaviorSchema),
    Comment: z.string(),
    ConnectionMode: z.string(),
    ConnectionFunctionAssociation: z.object({
      Id: z.string(),
    }),
    ContinuousDeploymentPolicyId: z.string(),
    CustomErrorResponses: z.array(CustomErrorResponseSchema),
    CustomOrigin: LegacyCustomOriginSchema,
    DefaultCacheBehavior: DefaultCacheBehaviorSchema,
    DefaultRootObject: z.string(),
    Enabled: z.boolean(),
    HttpVersion: z.string(),
    IPV6Enabled: z.boolean(),
    Logging: LoggingSchema,
    OriginGroups: OriginGroupsSchema,
    Origins: z.array(OriginSchema),
    PriceClass: z.string(),
    Restrictions: RestrictionsSchema,
    S3Origin: LegacyS3OriginSchema,
    Staging: z.boolean(),
    TenantConfig: z.object({
      ParameterDefinitions: z.array(ParameterDefinitionSchema),
    }),
    CacheTagConfig: CacheTagConfigSchema,
    ViewerMtlsConfig: ViewerMtlsConfigSchema,
    ViewerCertificate: ViewerCertificateSchema,
    WebACLId: z.string(),
  }).optional(),
  DomainName: z.string().optional(),
  Id: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DistributionConfig: z.object({
    Aliases: z.array(z.string()).describe(
      "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. A complex type that contains information about CNAMEs (alternate domain names), if any, for this distribution.",
    ).optional(),
    AnycastIpListId: z.string().describe(
      "To use this field for a multi-tenant distribution, use a connection group instead. For more information, see [ConnectionGroup](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_ConnectionGroup.html). ID of the Anycast static IP list that is associated with the distribution.",
    ).optional(),
    CNAMEs: z.array(z.string()).describe(
      "An alias for the CF distribution's domain name. This property is legacy. We recommend that you use [Aliases](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-distributionconfig.html#cfn-cloudfront-distribution-distributionconfig-aliases) instead.",
    ).optional(),
    CacheBehaviors: z.array(CacheBehaviorSchema).describe(
      "A complex type that contains zero or more CacheBehavior elements.",
    ).optional(),
    Comment: z.string().describe(
      "A comment to describe the distribution. The comment cannot be longer than 128 characters.",
    ).optional(),
    ConnectionMode: z.enum(["direct", "tenant-only"]).describe(
      "This field specifies whether the connection mode is through a standard distribution (direct) or a multi-tenant distribution with distribution tenants (tenant-only).",
    ).optional(),
    ContinuousDeploymentPolicyId: z.string().describe(
      "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. The identifier of a continuous deployment policy. For more information, see CreateContinuousDeploymentPolicy.",
    ).optional(),
    CustomErrorResponses: z.array(CustomErrorResponseSchema).describe(
      "A complex type that controls the following: Whether CloudFront replaces HTTP status codes in the 4xx and 5xx range with custom error messages before returning the response to the viewer. How long CloudFront caches HTTP status codes in the 4xx and 5xx range. For more information about custom error pages, see [Customizing Error Responses](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html) in the *Amazon CloudFront Developer Guide*.",
    ).optional(),
    CustomOrigin: LegacyCustomOriginSchema.describe(
      "The user-defined HTTP server that serves as the origin for content that CF distributes. This property is legacy. We recommend that you use [Origin](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-origin.html) instead.",
    ).optional(),
    DefaultCacheBehavior: DefaultCacheBehaviorSchema.describe(
      "A complex type that describes the default cache behavior if you don't specify a CacheBehavior element or if files don't match any of the values of PathPattern in CacheBehavior elements. You must create exactly one default cache behavior.",
    ).optional(),
    DefaultRootObject: z.string().describe(
      "When a viewer requests the root URL for your distribution, the default root object is the object that you want CloudFront to request from your origin. For example, if your root URL is https://www.example.com, you can specify CloudFront to return the index.html file as the default root object. You can specify a default root object so that viewers see a specific file or object, instead of another object in your distribution (for example, https://www.example.com/product-description.html). A default root object avoids exposing the contents of your distribution. You can specify the object name or a path to the object name (for example, index.html or exampleFolderName/index.html). Your string can't begin with a forward slash ( /). Only specify the object name or the path to the object. If you don't want to specify a default root object when you create a distribution, include an empty DefaultRootObject element. To delete the default root object from an existing distribution, update the distribution configuration and include an empty DefaultRootObject element. To replace the default root object, update the distribution configuration and specify the new object. For more information about the default root object, see [Specify a default root object](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html) in the *Amazon CloudFront Developer Guide*.",
    ).optional(),
    Enabled: z.boolean().describe(
      "From this field, you can enable or disable the selected distribution.",
    ).optional(),
    HttpVersion: z.string().describe(
      "(Optional) Specify the HTTP version(s) that you want viewers to use to communicate with CF. The default value for new distributions is http1.1. For viewers and CF to use HTTP/2, viewers must support TLSv1.2 or later, and must support Server Name Indication (SNI). For viewers and CF to use HTTP/3, viewers must support TLSv1.3 and Server Name Indication (SNI). CF supports HTTP/3 connection migration to allow the viewer to switch networks without losing connection. For more information about connection migration, see [Connection Migration](https://docs.aws.amazon.com/https://www.rfc-editor.org/rfc/rfc9000.html#name-connection-migration) at RFC 9000. For more information about supported TLSv1.3 ciphers, see [Supported protocols and ciphers between viewers and CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/secure-connections-supported-viewer-protocols-ciphers.html).",
    ).optional(),
    IPV6Enabled: z.boolean().describe(
      "To use this field for a multi-tenant distribution, use a connection group instead. For more information, see [ConnectionGroup](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_ConnectionGroup.html). If you want CloudFront to respond to IPv6 DNS requests with an IPv6 address for your distribution, specify true. If you specify false, CloudFront responds to IPv6 DNS requests with the DNS response code NOERROR and with no IP addresses. This allows viewers to submit a second request, for an IPv4 address for your distribution. In general, you should enable IPv6 if you have users on IPv6 networks who want to access your content. However, if you're using signed URLs or signed cookies to restrict access to your content, and if you're using a custom policy that includes the IpAddress parameter to restrict the IP addresses that can access your content, don't enable IPv6. If you want to restrict access to some content by IP address and not restrict access to other content (or restrict access but not by IP address), you can create two distributions. For more information, see [Creating a Signed URL Using a Custom Policy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html) in the *Amazon CloudFront Developer Guide*. If you're using an R53AWSIntlong alias resource record set to route traffic to your CloudFront distribution, you need to create a second alias resource record set when both of the following are true: You enable IPv6 for the distribution You're using alternate domain names in the URLs for your objects For more information, see [Routing Traffic to an Amazon CloudFront Web Distribution by Using Your Domain Name](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html) in the *Developer Guide*. If you created a CNAME resource record set, either with R53AWSIntlong or with another DNS service, you don't need to make any changes. A CNAME record will route traffic to your distribution regardless of the IP address format of the viewer request.",
    ).optional(),
    Logging: LoggingSchema.describe(
      "A complex type that controls whether access logs are written for the distribution. For more information about logging, see [Access Logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html) in the *Amazon CloudFront Developer Guide*.",
    ).optional(),
    OriginGroups: OriginGroupsSchema.describe(
      "A complex type that contains information about origin groups for this distribution. Specify a value for either the Origins or OriginGroups property.",
    ).optional(),
    Origins: z.array(OriginSchema).describe(
      "A complex type that contains information about origins for this distribution. Specify a value for either the Origins or OriginGroups property.",
    ).optional(),
    PriceClass: z.string().describe(
      "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. The price class that corresponds with the maximum price that you want to pay for CloudFront service. If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations. If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location that has the lowest latency among the edge locations in your price class. Viewers who are in or near regions that are excluded from your specified price class may encounter slower performance. For more information about price classes, see [Choosing the Price Class for a CloudFront Distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html) in the *Amazon CloudFront Developer Guide*. For information about CloudFront pricing, including how price classes (such as Price Class 100) map to CloudFront regions, see [Amazon CloudFront Pricing](https://docs.aws.amazon.com/cloudfront/pricing/).",
    ).optional(),
    Restrictions: RestrictionsSchema.describe(
      "A complex type that identifies ways in which you want to restrict distribution of your content.",
    ).optional(),
    S3Origin: LegacyS3OriginSchema.describe(
      "The origin as an S3 bucket. This property is legacy. We recommend that you use [Origin](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-origin.html) instead.",
    ).optional(),
    Staging: z.boolean().describe(
      "This field only supports standard distributions. You can't specify this field for multi-tenant distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. A Boolean that indicates whether this is a staging distribution. When this value is true, this is a staging distribution. When this value is false, this is not a staging distribution.",
    ).optional(),
    TenantConfig: z.object({
      ParameterDefinitions: z.array(ParameterDefinitionSchema).optional(),
    }).describe(
      "This field only supports multi-tenant distributions. You can't specify this field for standard distributions. For more information, see [Unsupported features for SaaS Manager for Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-config-options.html#unsupported-saas) in the *Amazon CloudFront Developer Guide*. A distribution tenant configuration.",
    ).optional(),
    CacheTagConfig: CacheTagConfigSchema.describe(
      "Configuration for cache tag extraction from origin responses. When specified, CloudFront reads the header named in HeaderName from origin responses and stores the comma-separated values as cache tags on the object. Distributions without CacheTagConfig do not extract tags. When CacheTagConfig is removed from a distribution via UpdateDistribution, CloudFront stops extracting tags from origin responses. Changing the HeaderName on an existing distribution does not retroactively affect previously cached objects. Tag-based invalidations will not apply to objects already cached using a previous header. To ensure tag invalidations function after updating the header name, use path-based invalidations to recache all objects that use cache tags.",
    ).optional(),
    ViewerMtlsConfig: ViewerMtlsConfigSchema.describe(
      "The distribution's viewer mTLS configuration.",
    ).optional(),
    ViewerCertificate: ViewerCertificateSchema.describe(
      "A complex type that determines the distribution's SSL/TLS configuration for communicating with viewers.",
    ).optional(),
    WebACLId: z.string().describe(
      "Multi-tenant distributions only support WAF V2 web ACLs. A unique identifier that specifies the WAF web ACL, if any, to associate with this distribution. To specify a web ACL created using the latest version of WAF, use the ACL ARN, for example arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/a1b2c3d4-5678-90ab-cdef-EXAMPLE11111. To specify a web ACL created using WAF Classic, use the ACL ID, for example a1b2c3d4-5678-90ab-cdef-EXAMPLE11111. WAF is a web application firewall that lets you monitor the HTTP and HTTPS requests that are forwarded to CloudFront, and lets you control access to your content. Based on conditions that you specify, such as the IP addresses that requests originate from or the values of query strings, CloudFront responds to requests either with the requested content or with an HTTP 403 status code (Forbidden). You can also configure CloudFront to return a custom error page when a request is blocked. For more information about WAF, see the [Developer Guide](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html).",
    ).optional(),
  }).describe("The distribution's configuration.").optional(),
  Tags: z.array(TagSchema).describe(
    "A complex type that contains zero or more Tag elements.",
  ).optional(),
});

/** Swamp extension model for CloudFront Distribution. Registered at `@swamp/aws/cloudfront/distribution`. */
export const model = {
  type: "@swamp/aws/cloudfront/distribution",
  version: "2026.05.14.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudFront Distribution resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFront Distribution",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudFront::Distribution",
          desiredState,
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
      description: "Get a CloudFront Distribution",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront Distribution",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudFront::Distribution",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a CloudFront Distribution",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudFront::Distribution",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudFront::Distribution",
          identifier,
          currentState,
          desiredState,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a CloudFront Distribution",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront Distribution",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudFront::Distribution",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync CloudFront Distribution state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFront::Distribution",
            identifier,
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
              identifier,
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
