// Auto-generated extension model for @swamp/gcp/monitoring/uptimecheckconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Monitoring UptimeCheckConfigs.
 *
 * This message configures which resources and services to monitor for availability.
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
  return `${parent}/uptimeCheckConfigs/${shortName}`;
}

const BASE_URL = "https://monitoring.googleapis.com/";

const GET_CONFIG = {
  "id": "monitoring.projects.uptimeCheckConfigs.get",
  "path": "v3/{+name}",
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
  "id": "monitoring.projects.uptimeCheckConfigs.create",
  "path": "v3/{+parent}/uptimeCheckConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "monitoring.projects.uptimeCheckConfigs.patch",
  "path": "v3/{+name}",
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
  "id": "monitoring.projects.uptimeCheckConfigs.delete",
  "path": "v3/{+name}",
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
  "id": "monitoring.projects.uptimeCheckConfigs.list",
  "path": "v3/{+parent}/uptimeCheckConfigs",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  checkerType: z.enum([
    "CHECKER_TYPE_UNSPECIFIED",
    "STATIC_IP_CHECKERS",
    "VPC_CHECKERS",
  ]).describe("The type of checkers to use to execute the Uptime check.")
    .optional(),
  contentMatchers: z.array(z.object({
    content: z.string().describe(
      "String, regex or JSON content to match. Maximum 1024 bytes. An empty content string indicates no content matching is to be performed.",
    ).optional(),
    jsonPathMatcher: z.object({
      jsonMatcher: z.enum([
        "JSON_PATH_MATCHER_OPTION_UNSPECIFIED",
        "EXACT_MATCH",
        "REGEX_MATCH",
      ]).describe(
        "The type of JSONPath match that will be applied to the JSON output (ContentMatcher.content)",
      ).optional(),
      jsonPath: z.string().describe(
        "JSONPath within the response output pointing to the expected ContentMatcher::content to match against.",
      ).optional(),
    }).describe(
      "Information needed to perform a JSONPath content match. Used for ContentMatcherOption::MATCHES_JSON_PATH and ContentMatcherOption::NOT_MATCHES_JSON_PATH.",
    ).optional(),
    matcher: z.enum([
      "CONTENT_MATCHER_OPTION_UNSPECIFIED",
      "CONTAINS_STRING",
      "NOT_CONTAINS_STRING",
      "MATCHES_REGEX",
      "NOT_MATCHES_REGEX",
      "MATCHES_JSON_PATH",
      "NOT_MATCHES_JSON_PATH",
    ]).describe(
      "The type of content matcher that will be applied to the server output, compared to the content string when the check is run.",
    ).optional(),
  })).describe(
    "The content that is expected to appear in the data returned by the target server against which the check is run. Currently, only the first entry in the content_matchers list is supported, and additional entries will be ignored. This field is optional and should only be specified if a content match is required as part of the/ Uptime check.",
  ).optional(),
  disabled: z.boolean().describe("Whether the check is disabled or not.")
    .optional(),
  displayName: z.string().describe(
    "A human-friendly name for the Uptime check configuration. The display name should be unique within a Cloud Monitoring Workspace in order to make it easier to identify; however, uniqueness is not enforced. Required.",
  ).optional(),
  httpCheck: z.object({
    acceptedResponseStatusCodes: z.array(z.object({
      statusClass: z.enum([
        "STATUS_CLASS_UNSPECIFIED",
        "STATUS_CLASS_1XX",
        "STATUS_CLASS_2XX",
        "STATUS_CLASS_3XX",
        "STATUS_CLASS_4XX",
        "STATUS_CLASS_5XX",
        "STATUS_CLASS_ANY",
      ]).describe("A class of status codes to accept.").optional(),
      statusValue: z.number().int().describe("A status code to accept.")
        .optional(),
    })).describe(
      "If present, the check will only pass if the HTTP response status code is in this set of status codes. If empty, the HTTP status code will only pass if the HTTP status code is 200-299.",
    ).optional(),
    authInfo: z.object({
      password: z.string().describe(
        "The password to use when authenticating with the HTTP server.",
      ).optional(),
      username: z.string().describe(
        "The username to use when authenticating with the HTTP server.",
      ).optional(),
    }).describe(
      "The authentication parameters to provide to the specified resource or URL that requires a username and password. Currently, only Basic HTTP authentication (https://tools.ietf.org/html/rfc7617) is supported in Uptime checks.",
    ).optional(),
    body: z.string().describe(
      "The request body associated with the HTTP POST request. If content_type is URL_ENCODED, the body passed in must be URL-encoded. Users can provide a Content-Length header via the headers field or the API will do so. If the request_method is GET and body is not empty, the API will return an error. The maximum byte size is 1 megabyte.Note: If client libraries aren't used (which performs the conversion automatically) base64 encode your body data since the field is of bytes type.",
    ).optional(),
    contentType: z.enum(["TYPE_UNSPECIFIED", "URL_ENCODED", "USER_PROVIDED"])
      .describe(
        'The content type header to use for the check. The following configurations result in errors: 1. Content type is specified in both the headers field and the content_type field. 2. Request method is GET and content_type is not TYPE_UNSPECIFIED 3. Request method is POST and content_type is TYPE_UNSPECIFIED. 4. Request method is POST and a "Content-Type" header is provided via headers field. The content_type field should be used instead.',
      ).optional(),
    customContentType: z.string().describe(
      "A user provided content type header to use for the check. The invalid configurations outlined in the content_type field apply to custom_content_type, as well as the following: 1. content_type is URL_ENCODED and custom_content_type is set. 2. content_type is USER_PROVIDED and custom_content_type is not set.",
    ).optional(),
    headers: z.record(z.string(), z.string()).describe(
      "The list of headers to send as part of the Uptime check request. If two headers have the same key and different values, they should be entered as a single header, with the value being a comma-separated list of all the desired values as described at https://www.w3.org/Protocols/rfc2616/rfc2616.txt (page 31). Entering two separate headers with the same key in a Create call will cause the first to be overwritten by the second. The maximum number of headers allowed is 100.",
    ).optional(),
    maskHeaders: z.boolean().describe(
      "Boolean specifying whether to encrypt the header information. Encryption should be specified for any headers related to authentication that you do not wish to be seen when retrieving the configuration. The server will be responsible for encrypting the headers. On Get/List calls, if mask_headers is set to true then the headers will be obscured with ******.",
    ).optional(),
    path: z.string().describe(
      'Optional (defaults to "/"). The path to the page against which to run the check. Will be combined with the host (specified within the monitored_resource) and port to construct the full URL. If the provided path does not begin with "/", a "/" will be prepended automatically.',
    ).optional(),
    pingConfig: z.object({
      pingsCount: z.number().int().describe(
        "Number of ICMP pings. A maximum of 3 ICMP pings is currently supported.",
      ).optional(),
    }).describe(
      "Information involved in sending ICMP pings alongside public HTTP/TCP checks. For HTTP, the pings are performed for each part of the redirect chain.",
    ).optional(),
    port: z.number().int().describe(
      "Optional (defaults to 80 when use_ssl is false, and 443 when use_ssl is true). The TCP port on the HTTP server against which to run the check. Will be combined with host (specified within the monitored_resource) and path to construct the full URL.",
    ).optional(),
    requestMethod: z.enum(["METHOD_UNSPECIFIED", "GET", "POST"]).describe(
      "The HTTP request method to use for the check. If set to METHOD_UNSPECIFIED then request_method defaults to GET.",
    ).optional(),
    serviceAgentAuthentication: z.object({
      type: z.enum([
        "SERVICE_AGENT_AUTHENTICATION_TYPE_UNSPECIFIED",
        "OIDC_TOKEN",
      ]).describe("Type of authentication.").optional(),
    }).describe(
      "Contains information needed for generating either an OpenID Connect token (https://developers.google.com/identity/protocols/OpenIDConnect) or OAuth token (https://developers.google.com/identity/protocols/oauth2). The token will be generated for the Monitoring service agent service account.",
    ).optional(),
    useSsl: z.boolean().describe(
      "If true, use HTTPS instead of HTTP to run the check.",
    ).optional(),
    validateSsl: z.boolean().describe(
      "Boolean specifying whether to include SSL certificate validation as a part of the Uptime check. Only applies to checks where monitored_resource is set to uptime_url. If use_ssl is false, setting validate_ssl to true has no effect.",
    ).optional(),
  }).describe("Information involved in an HTTP/HTTPS Uptime check request.")
    .optional(),
  logCheckFailures: z.boolean().describe(
    "To specify whether to log the results of failed probes to Cloud Logging.",
  ).optional(),
  monitoredResource: z.object({
    labels: z.record(z.string(), z.string()).describe(
      'Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels "project_id", "instance_id", and "zone".',
    ).optional(),
    type: z.string().describe(
      "Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance. For a list of types, see Monitoring resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list).",
    ).optional(),
  }).describe(
    'An object representing a resource that can be used for monitoring, logging, billing, or other purposes. Examples include virtual machine instances, databases, and storage devices such as disks. The type field identifies a MonitoredResourceDescriptor object that describes the resource\'s schema. Information in the labels field identifies the actual resource and its attributes according to the schema. For example, a particular Compute Engine VM instance could be represented by the following object, because the MonitoredResourceDescriptor for "gce_instance" has labels "project_id", "instance_id" and "zone": { "type": "gce_instance", "labels": { "project_id": "my-project", "instance_id": "12345678901234", "zone": "us-central1-a" }}',
  ).optional(),
  name: z.string().describe(
    "Identifier. A unique resource name for this Uptime check configuration. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] [PROJECT_ID_OR_NUMBER] is the Workspace host project associated with the Uptime check.This field should be omitted when creating the Uptime check configuration; on create, the resource name is assigned by the server and included in the response.",
  ).optional(),
  period: z.string().describe(
    "How often, in seconds, the Uptime check is performed. Currently, the only supported values are 60s (1 minute), 300s (5 minutes), 600s (10 minutes), and 900s (15 minutes). Optional, defaults to 60s.",
  ).optional(),
  resourceGroup: z.object({
    groupId: z.string().describe(
      "The group of resources being monitored. Should be only the [GROUP_ID], and not the full-path projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID].",
    ).optional(),
    resourceType: z.enum([
      "RESOURCE_TYPE_UNSPECIFIED",
      "INSTANCE",
      "AWS_ELB_LOAD_BALANCER",
    ]).describe("The resource type of the group members.").optional(),
  }).describe(
    "The resource submessage for group checks. It can be used instead of a monitored resource, when multiple resources are being monitored.",
  ).optional(),
  selectedRegions: z.array(
    z.enum([
      "REGION_UNSPECIFIED",
      "USA",
      "EUROPE",
      "SOUTH_AMERICA",
      "ASIA_PACIFIC",
      "USA_OREGON",
      "USA_IOWA",
      "USA_VIRGINIA",
    ]),
  ).describe(
    "The list of regions from which the check will be run. Some regions contain one location, and others contain more than one. If this field is specified, enough regions must be provided to include a minimum of 3 locations. Not specifying this field will result in Uptime checks running from all available regions.",
  ).optional(),
  syntheticMonitor: z.object({
    cloudFunctionV2: z.object({
      cloudRunRevision: z.object({
        labels: z.record(z.string(), z.string()).describe(
          'Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels "project_id", "instance_id", and "zone".',
        ).optional(),
        type: z.string().describe(
          "Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance. For a list of types, see Monitoring resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list).",
        ).optional(),
      }).describe(
        'An object representing a resource that can be used for monitoring, logging, billing, or other purposes. Examples include virtual machine instances, databases, and storage devices such as disks. The type field identifies a MonitoredResourceDescriptor object that describes the resource\'s schema. Information in the labels field identifies the actual resource and its attributes according to the schema. For example, a particular Compute Engine VM instance could be represented by the following object, because the MonitoredResourceDescriptor for "gce_instance" has labels "project_id", "instance_id" and "zone": { "type": "gce_instance", "labels": { "project_id": "my-project", "instance_id": "12345678901234", "zone": "us-central1-a" }}',
      ).optional(),
      name: z.string().describe(
        "Required. Fully qualified GCFv2 resource name i.e. projects/{project}/locations/{location}/functions/{function} Required.",
      ).optional(),
    }).describe(
      "A Synthetic Monitor deployed to a Cloud Functions V2 instance.",
    ).optional(),
  }).describe("Describes a Synthetic Monitor to be invoked by Uptime.")
    .optional(),
  tcpCheck: z.object({
    pingConfig: z.object({
      pingsCount: z.number().int().describe(
        "Number of ICMP pings. A maximum of 3 ICMP pings is currently supported.",
      ).optional(),
    }).describe(
      "Information involved in sending ICMP pings alongside public HTTP/TCP checks. For HTTP, the pings are performed for each part of the redirect chain.",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port on the server against which to run the check. Will be combined with host (specified within the monitored_resource) to construct the full URL. Required.",
    ).optional(),
  }).describe("Information required for a TCP Uptime check request.")
    .optional(),
  timeout: z.string().describe(
    "The maximum amount of time to wait for the request to complete (must be between 1 and 60 seconds). Required.",
  ).optional(),
  userLabels: z.record(z.string(), z.string()).describe(
    "User-supplied key/value data to be used for organizing and identifying the UptimeCheckConfig objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  checkerType: z.string().optional(),
  contentMatchers: z.array(z.object({
    content: z.string(),
    jsonPathMatcher: z.object({
      jsonMatcher: z.string(),
      jsonPath: z.string(),
    }),
    matcher: z.string(),
  })).optional(),
  disabled: z.boolean().optional(),
  displayName: z.string().optional(),
  httpCheck: z.object({
    acceptedResponseStatusCodes: z.array(z.object({
      statusClass: z.string(),
      statusValue: z.number(),
    })),
    authInfo: z.object({
      password: z.string(),
      username: z.string(),
    }),
    body: z.string(),
    contentType: z.string(),
    customContentType: z.string(),
    headers: z.record(z.string(), z.unknown()),
    maskHeaders: z.boolean(),
    path: z.string(),
    pingConfig: z.object({
      pingsCount: z.number(),
    }),
    port: z.number(),
    requestMethod: z.string(),
    serviceAgentAuthentication: z.object({
      type: z.string(),
    }),
    useSsl: z.boolean(),
    validateSsl: z.boolean(),
  }).optional(),
  internalCheckers: z.array(z.object({
    displayName: z.string(),
    gcpZone: z.string(),
    name: z.string(),
    network: z.string(),
    peerProjectId: z.string(),
    state: z.string(),
  })).optional(),
  isInternal: z.boolean().optional(),
  logCheckFailures: z.boolean().optional(),
  monitoredResource: z.object({
    labels: z.record(z.string(), z.unknown()),
    type: z.string(),
  }).optional(),
  name: z.string(),
  period: z.string().optional(),
  resourceGroup: z.object({
    groupId: z.string(),
    resourceType: z.string(),
  }).optional(),
  selectedRegions: z.array(z.string()).optional(),
  syntheticMonitor: z.object({
    cloudFunctionV2: z.object({
      cloudRunRevision: z.object({
        labels: z.record(z.string(), z.unknown()),
        type: z.string(),
      }),
      name: z.string(),
    }),
  }).optional(),
  tcpCheck: z.object({
    pingConfig: z.object({
      pingsCount: z.number(),
    }),
    port: z.number(),
  }).optional(),
  timeout: z.string().optional(),
  userLabels: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  checkerType: z.enum([
    "CHECKER_TYPE_UNSPECIFIED",
    "STATIC_IP_CHECKERS",
    "VPC_CHECKERS",
  ]).describe("The type of checkers to use to execute the Uptime check.")
    .optional(),
  contentMatchers: z.array(z.object({
    content: z.string().describe(
      "String, regex or JSON content to match. Maximum 1024 bytes. An empty content string indicates no content matching is to be performed.",
    ).optional(),
    jsonPathMatcher: z.object({
      jsonMatcher: z.enum([
        "JSON_PATH_MATCHER_OPTION_UNSPECIFIED",
        "EXACT_MATCH",
        "REGEX_MATCH",
      ]).describe(
        "The type of JSONPath match that will be applied to the JSON output (ContentMatcher.content)",
      ).optional(),
      jsonPath: z.string().describe(
        "JSONPath within the response output pointing to the expected ContentMatcher::content to match against.",
      ).optional(),
    }).describe(
      "Information needed to perform a JSONPath content match. Used for ContentMatcherOption::MATCHES_JSON_PATH and ContentMatcherOption::NOT_MATCHES_JSON_PATH.",
    ).optional(),
    matcher: z.enum([
      "CONTENT_MATCHER_OPTION_UNSPECIFIED",
      "CONTAINS_STRING",
      "NOT_CONTAINS_STRING",
      "MATCHES_REGEX",
      "NOT_MATCHES_REGEX",
      "MATCHES_JSON_PATH",
      "NOT_MATCHES_JSON_PATH",
    ]).describe(
      "The type of content matcher that will be applied to the server output, compared to the content string when the check is run.",
    ).optional(),
  })).describe(
    "The content that is expected to appear in the data returned by the target server against which the check is run. Currently, only the first entry in the content_matchers list is supported, and additional entries will be ignored. This field is optional and should only be specified if a content match is required as part of the/ Uptime check.",
  ).optional(),
  disabled: z.boolean().describe("Whether the check is disabled or not.")
    .optional(),
  displayName: z.string().describe(
    "A human-friendly name for the Uptime check configuration. The display name should be unique within a Cloud Monitoring Workspace in order to make it easier to identify; however, uniqueness is not enforced. Required.",
  ).optional(),
  httpCheck: z.object({
    acceptedResponseStatusCodes: z.array(z.object({
      statusClass: z.enum([
        "STATUS_CLASS_UNSPECIFIED",
        "STATUS_CLASS_1XX",
        "STATUS_CLASS_2XX",
        "STATUS_CLASS_3XX",
        "STATUS_CLASS_4XX",
        "STATUS_CLASS_5XX",
        "STATUS_CLASS_ANY",
      ]).describe("A class of status codes to accept.").optional(),
      statusValue: z.number().int().describe("A status code to accept.")
        .optional(),
    })).describe(
      "If present, the check will only pass if the HTTP response status code is in this set of status codes. If empty, the HTTP status code will only pass if the HTTP status code is 200-299.",
    ).optional(),
    authInfo: z.object({
      password: z.string().describe(
        "The password to use when authenticating with the HTTP server.",
      ).optional(),
      username: z.string().describe(
        "The username to use when authenticating with the HTTP server.",
      ).optional(),
    }).describe(
      "The authentication parameters to provide to the specified resource or URL that requires a username and password. Currently, only Basic HTTP authentication (https://tools.ietf.org/html/rfc7617) is supported in Uptime checks.",
    ).optional(),
    body: z.string().describe(
      "The request body associated with the HTTP POST request. If content_type is URL_ENCODED, the body passed in must be URL-encoded. Users can provide a Content-Length header via the headers field or the API will do so. If the request_method is GET and body is not empty, the API will return an error. The maximum byte size is 1 megabyte.Note: If client libraries aren't used (which performs the conversion automatically) base64 encode your body data since the field is of bytes type.",
    ).optional(),
    contentType: z.enum(["TYPE_UNSPECIFIED", "URL_ENCODED", "USER_PROVIDED"])
      .describe(
        'The content type header to use for the check. The following configurations result in errors: 1. Content type is specified in both the headers field and the content_type field. 2. Request method is GET and content_type is not TYPE_UNSPECIFIED 3. Request method is POST and content_type is TYPE_UNSPECIFIED. 4. Request method is POST and a "Content-Type" header is provided via headers field. The content_type field should be used instead.',
      ).optional(),
    customContentType: z.string().describe(
      "A user provided content type header to use for the check. The invalid configurations outlined in the content_type field apply to custom_content_type, as well as the following: 1. content_type is URL_ENCODED and custom_content_type is set. 2. content_type is USER_PROVIDED and custom_content_type is not set.",
    ).optional(),
    headers: z.record(z.string(), z.string()).describe(
      "The list of headers to send as part of the Uptime check request. If two headers have the same key and different values, they should be entered as a single header, with the value being a comma-separated list of all the desired values as described at https://www.w3.org/Protocols/rfc2616/rfc2616.txt (page 31). Entering two separate headers with the same key in a Create call will cause the first to be overwritten by the second. The maximum number of headers allowed is 100.",
    ).optional(),
    maskHeaders: z.boolean().describe(
      "Boolean specifying whether to encrypt the header information. Encryption should be specified for any headers related to authentication that you do not wish to be seen when retrieving the configuration. The server will be responsible for encrypting the headers. On Get/List calls, if mask_headers is set to true then the headers will be obscured with ******.",
    ).optional(),
    path: z.string().describe(
      'Optional (defaults to "/"). The path to the page against which to run the check. Will be combined with the host (specified within the monitored_resource) and port to construct the full URL. If the provided path does not begin with "/", a "/" will be prepended automatically.',
    ).optional(),
    pingConfig: z.object({
      pingsCount: z.number().int().describe(
        "Number of ICMP pings. A maximum of 3 ICMP pings is currently supported.",
      ).optional(),
    }).describe(
      "Information involved in sending ICMP pings alongside public HTTP/TCP checks. For HTTP, the pings are performed for each part of the redirect chain.",
    ).optional(),
    port: z.number().int().describe(
      "Optional (defaults to 80 when use_ssl is false, and 443 when use_ssl is true). The TCP port on the HTTP server against which to run the check. Will be combined with host (specified within the monitored_resource) and path to construct the full URL.",
    ).optional(),
    requestMethod: z.enum(["METHOD_UNSPECIFIED", "GET", "POST"]).describe(
      "The HTTP request method to use for the check. If set to METHOD_UNSPECIFIED then request_method defaults to GET.",
    ).optional(),
    serviceAgentAuthentication: z.object({
      type: z.enum([
        "SERVICE_AGENT_AUTHENTICATION_TYPE_UNSPECIFIED",
        "OIDC_TOKEN",
      ]).describe("Type of authentication.").optional(),
    }).describe(
      "Contains information needed for generating either an OpenID Connect token (https://developers.google.com/identity/protocols/OpenIDConnect) or OAuth token (https://developers.google.com/identity/protocols/oauth2). The token will be generated for the Monitoring service agent service account.",
    ).optional(),
    useSsl: z.boolean().describe(
      "If true, use HTTPS instead of HTTP to run the check.",
    ).optional(),
    validateSsl: z.boolean().describe(
      "Boolean specifying whether to include SSL certificate validation as a part of the Uptime check. Only applies to checks where monitored_resource is set to uptime_url. If use_ssl is false, setting validate_ssl to true has no effect.",
    ).optional(),
  }).describe("Information involved in an HTTP/HTTPS Uptime check request.")
    .optional(),
  logCheckFailures: z.boolean().describe(
    "To specify whether to log the results of failed probes to Cloud Logging.",
  ).optional(),
  monitoredResource: z.object({
    labels: z.record(z.string(), z.string()).describe(
      'Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels "project_id", "instance_id", and "zone".',
    ).optional(),
    type: z.string().describe(
      "Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance. For a list of types, see Monitoring resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list).",
    ).optional(),
  }).describe(
    'An object representing a resource that can be used for monitoring, logging, billing, or other purposes. Examples include virtual machine instances, databases, and storage devices such as disks. The type field identifies a MonitoredResourceDescriptor object that describes the resource\'s schema. Information in the labels field identifies the actual resource and its attributes according to the schema. For example, a particular Compute Engine VM instance could be represented by the following object, because the MonitoredResourceDescriptor for "gce_instance" has labels "project_id", "instance_id" and "zone": { "type": "gce_instance", "labels": { "project_id": "my-project", "instance_id": "12345678901234", "zone": "us-central1-a" }}',
  ).optional(),
  name: z.string().describe(
    "Identifier. A unique resource name for this Uptime check configuration. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] [PROJECT_ID_OR_NUMBER] is the Workspace host project associated with the Uptime check.This field should be omitted when creating the Uptime check configuration; on create, the resource name is assigned by the server and included in the response.",
  ).optional(),
  period: z.string().describe(
    "How often, in seconds, the Uptime check is performed. Currently, the only supported values are 60s (1 minute), 300s (5 minutes), 600s (10 minutes), and 900s (15 minutes). Optional, defaults to 60s.",
  ).optional(),
  resourceGroup: z.object({
    groupId: z.string().describe(
      "The group of resources being monitored. Should be only the [GROUP_ID], and not the full-path projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID].",
    ).optional(),
    resourceType: z.enum([
      "RESOURCE_TYPE_UNSPECIFIED",
      "INSTANCE",
      "AWS_ELB_LOAD_BALANCER",
    ]).describe("The resource type of the group members.").optional(),
  }).describe(
    "The resource submessage for group checks. It can be used instead of a monitored resource, when multiple resources are being monitored.",
  ).optional(),
  selectedRegions: z.array(
    z.enum([
      "REGION_UNSPECIFIED",
      "USA",
      "EUROPE",
      "SOUTH_AMERICA",
      "ASIA_PACIFIC",
      "USA_OREGON",
      "USA_IOWA",
      "USA_VIRGINIA",
    ]),
  ).describe(
    "The list of regions from which the check will be run. Some regions contain one location, and others contain more than one. If this field is specified, enough regions must be provided to include a minimum of 3 locations. Not specifying this field will result in Uptime checks running from all available regions.",
  ).optional(),
  syntheticMonitor: z.object({
    cloudFunctionV2: z.object({
      cloudRunRevision: z.object({
        labels: z.record(z.string(), z.string()).describe(
          'Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels "project_id", "instance_id", and "zone".',
        ).optional(),
        type: z.string().describe(
          "Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance. For a list of types, see Monitoring resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list).",
        ).optional(),
      }).describe(
        'An object representing a resource that can be used for monitoring, logging, billing, or other purposes. Examples include virtual machine instances, databases, and storage devices such as disks. The type field identifies a MonitoredResourceDescriptor object that describes the resource\'s schema. Information in the labels field identifies the actual resource and its attributes according to the schema. For example, a particular Compute Engine VM instance could be represented by the following object, because the MonitoredResourceDescriptor for "gce_instance" has labels "project_id", "instance_id" and "zone": { "type": "gce_instance", "labels": { "project_id": "my-project", "instance_id": "12345678901234", "zone": "us-central1-a" }}',
      ).optional(),
      name: z.string().describe(
        "Required. Fully qualified GCFv2 resource name i.e. projects/{project}/locations/{location}/functions/{function} Required.",
      ).optional(),
    }).describe(
      "A Synthetic Monitor deployed to a Cloud Functions V2 instance.",
    ).optional(),
  }).describe("Describes a Synthetic Monitor to be invoked by Uptime.")
    .optional(),
  tcpCheck: z.object({
    pingConfig: z.object({
      pingsCount: z.number().int().describe(
        "Number of ICMP pings. A maximum of 3 ICMP pings is currently supported.",
      ).optional(),
    }).describe(
      "Information involved in sending ICMP pings alongside public HTTP/TCP checks. For HTTP, the pings are performed for each part of the redirect chain.",
    ).optional(),
    port: z.number().int().describe(
      "The TCP port on the server against which to run the check. Will be combined with host (specified within the monitored_resource) to construct the full URL. Required.",
    ).optional(),
  }).describe("Information required for a TCP Uptime check request.")
    .optional(),
  timeout: z.string().describe(
    "The maximum amount of time to wait for the request to complete (must be between 1 and 60 seconds). Required.",
  ).optional(),
  userLabels: z.record(z.string(), z.string()).describe(
    "User-supplied key/value data to be used for organizing and identifying the UptimeCheckConfig objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Monitoring UptimeCheckConfigs. Registered at `@swamp/gcp/monitoring/uptimecheckconfigs`. */
export const model = {
  type: "@swamp/gcp/monitoring/uptimecheckconfigs",
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
        "This message configures which resources and services to monitor for availabil...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a uptimeCheckConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["checkerType"] !== undefined) {
          body["checkerType"] = g["checkerType"];
        }
        if (g["contentMatchers"] !== undefined) {
          body["contentMatchers"] = g["contentMatchers"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["httpCheck"] !== undefined) body["httpCheck"] = g["httpCheck"];
        if (g["logCheckFailures"] !== undefined) {
          body["logCheckFailures"] = g["logCheckFailures"];
        }
        if (g["monitoredResource"] !== undefined) {
          body["monitoredResource"] = g["monitoredResource"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["period"] !== undefined) body["period"] = g["period"];
        if (g["resourceGroup"] !== undefined) {
          body["resourceGroup"] = g["resourceGroup"];
        }
        if (g["selectedRegions"] !== undefined) {
          body["selectedRegions"] = g["selectedRegions"];
        }
        if (g["syntheticMonitor"] !== undefined) {
          body["syntheticMonitor"] = g["syntheticMonitor"];
        }
        if (g["tcpCheck"] !== undefined) body["tcpCheck"] = g["tcpCheck"];
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
        if (g["userLabels"] !== undefined) body["userLabels"] = g["userLabels"];
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a uptimeCheckConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the uptimeCheckConfigs"),
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
      description: "Update uptimeCheckConfigs attributes",
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
        if (g["checkerType"] !== undefined) {
          body["checkerType"] = g["checkerType"];
        }
        if (g["contentMatchers"] !== undefined) {
          body["contentMatchers"] = g["contentMatchers"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["httpCheck"] !== undefined) body["httpCheck"] = g["httpCheck"];
        if (g["logCheckFailures"] !== undefined) {
          body["logCheckFailures"] = g["logCheckFailures"];
        }
        if (g["monitoredResource"] !== undefined) {
          body["monitoredResource"] = g["monitoredResource"];
        }
        if (g["period"] !== undefined) body["period"] = g["period"];
        if (g["resourceGroup"] !== undefined) {
          body["resourceGroup"] = g["resourceGroup"];
        }
        if (g["selectedRegions"] !== undefined) {
          body["selectedRegions"] = g["selectedRegions"];
        }
        if (g["syntheticMonitor"] !== undefined) {
          body["syntheticMonitor"] = g["syntheticMonitor"];
        }
        if (g["tcpCheck"] !== undefined) body["tcpCheck"] = g["tcpCheck"];
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
        if (g["userLabels"] !== undefined) body["userLabels"] = g["userLabels"];
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
      description: "Delete the uptimeCheckConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the uptimeCheckConfigs"),
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
      description: "Sync uptimeCheckConfigs state from GCP",
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
