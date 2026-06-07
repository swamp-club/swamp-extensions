// Auto-generated extension model for @swamp/gcp/compute/regionsecuritypolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RegionSecurityPolicies.
 *
 * Represents a Google Cloud Armor security policy resource. Only external backend services that use load balancers can reference a security policy. For more information, see Google Cloud Armor security policy overview.
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
  "id": "compute.regionSecurityPolicies.get",
  "path":
    "projects/{project}/regions/{region}/securityPolicies/{securityPolicy}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "securityPolicy",
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
    "securityPolicy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.regionSecurityPolicies.insert",
  "path": "projects/{project}/regions/{region}/securityPolicies",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.regionSecurityPolicies.patch",
  "path":
    "projects/{project}/regions/{region}/securityPolicies/{securityPolicy}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "securityPolicy",
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
    "securityPolicy": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.regionSecurityPolicies.delete",
  "path":
    "projects/{project}/regions/{region}/securityPolicies/{securityPolicy}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "securityPolicy",
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
    "securityPolicy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.regionSecurityPolicies.list",
  "path": "projects/{project}/regions/{region}/securityPolicies",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  adaptiveProtectionConfig: z.object({
    layer7DdosDefenseConfig: z.object({
      enable: z.boolean().describe(
        "If set to true, enables CAAP for L7 DDoS detection. This field is only supported in Global Security Policies of type CLOUD_ARMOR.",
      ).optional(),
      ruleVisibility: z.enum(["PREMIUM", "STANDARD"]).describe(
        "Rule visibility can be one of the following: STANDARD - opaque rules. (default) PREMIUM - transparent rules. This field is only supported in Global Security Policies of type CLOUD_ARMOR.",
      ).optional(),
      thresholdConfigs: z.array(z.object({
        autoDeployConfidenceThreshold: z.number().optional(),
        autoDeployExpirationSec: z.number().int().optional(),
        autoDeployImpactedBaselineThreshold: z.number().optional(),
        autoDeployLoadThreshold: z.number().optional(),
        detectionAbsoluteQps: z.number().optional(),
        detectionLoadThreshold: z.number().optional(),
        detectionRelativeToBaselineQps: z.number().optional(),
        name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
          .describe(
            "The name must be 1-63 characters long, and comply withRFC1035. The name must be unique within the security policy.",
          ).optional(),
        trafficGranularityConfigs: z.array(z.unknown()).describe(
          "Configuration options for enabling Adaptive Protection to operate on specified granular traffic units.",
        ).optional(),
      })).describe(
        "Configuration options for layer7 adaptive protection for various customizable thresholds.",
      ).optional(),
    }).describe(
      "Configuration options for L7 DDoS detection. This field is only supported in Global Security Policies of type CLOUD_ARMOR.",
    ).optional(),
  }).describe(
    "Configuration options for Cloud Armor Adaptive Protection (CAAP).",
  ).optional(),
  advancedOptionsConfig: z.object({
    jsonCustomConfig: z.object({
      contentTypes: z.array(z.string()).describe(
        'A list of custom Content-Type header values to apply the JSON parsing. As per RFC 1341, a Content-Type header value has the following format: Content-Type:= type "/" subtype *[";" parameter] When configuring a custom Content-Type header value, only the type/subtype needs to be specified, and the parameters should be excluded.',
      ).optional(),
    }).optional(),
    jsonParsing: z.enum(["DISABLED", "STANDARD", "STANDARD_WITH_GRAPHQL"])
      .optional(),
    logLevel: z.enum(["NORMAL", "VERBOSE"]).optional(),
    requestBodyInspectionSize: z.string().describe(
      'The maximum request size chosen by the customer with Waf enabled. Values supported are "8KB", "16KB, "32KB", "48KB" and "64KB". Values are case insensitive.',
    ).optional(),
    userIpRequestHeaders: z.array(z.string()).describe(
      "An optional list of case-insensitive request header names to use for resolving the callers client IP address.",
    ).optional(),
  }).optional(),
  associations: z.array(z.object({
    attachmentId: z.string().describe(
      "The resource that the security policy is attached to.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. [Output Only] The display name of the security policy of the association.",
    ).optional(),
    excludedFolders: z.array(z.string()).describe(
      "A list of folders to exclude from the security policy.",
    ).optional(),
    excludedProjects: z.array(z.string()).describe(
      "A list of projects to exclude from the security policy.",
    ).optional(),
    name: z.string().describe("The name for an association.").optional(),
    securityPolicyId: z.string().describe(
      "Output only. [Output Only] The security policy ID of the association.",
    ).optional(),
    shortName: z.string().describe(
      "Output only. [Output Only] The short name of the security policy of the association.",
    ).optional(),
  })).describe("A list of associations that belong to this policy.").optional(),
  ddosProtectionConfig: z.object({
    ddosProtection: z.enum(["ADVANCED", "ADVANCED_PREVIEW", "STANDARD"])
      .optional(),
  }).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make get() request to the security policy.",
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this security policy, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the security policy.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  recaptchaOptionsConfig: z.object({
    redirectSiteKey: z.string().describe(
      "An optional field to supply a reCAPTCHA site key to be used for all the rules using the redirect action with the type of GOOGLE_RECAPTCHA under the security policy. The specified site key needs to be created from the reCAPTCHA API. The user is responsible for the validity of the specified site key. If not specified, a Google-managed site key is used. This field is only supported in Global Security Policies of type CLOUD_ARMOR.",
    ).optional(),
  }).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the regional security policy resides. This field is not applicable to global security policies.",
  ).optional(),
  rules: z.array(z.object({
    action: z.string().describe(
      "The Action to perform when the rule is matched. The following are the valid actions: - allow: allow access to target. - deny(STATUS): deny access to target, returns the HTTP response code specified. Valid values for `STATUS` are 403, 404, and 502. - rate_based_ban: limit client traffic to the configured threshold and ban the client if the traffic exceeds the threshold. Configure parameters for this action in RateLimitOptions. Requires rate_limit_options to be set. - redirect: redirect to a different target. This can either be an internal reCAPTCHA redirect, or an external URL-based redirect via a 302 response. Parameters for this action can be configured via redirectOptions. This action is only supported in Global Security Policies of type CLOUD_ARMOR. - throttle: limit client traffic to the configured threshold. Configure parameters for this action in rateLimitOptions. Requires rate_limit_options to be set for this. - fairshare (preview only): when traffic reaches the threshold limit, requests from the clients matching this rule begin to be rate-limited using the Fair Share algorithm. This action is only allowed in security policies of type `CLOUD_ARMOR_INTERNAL_SERVICE`.",
    ).optional(),
    description: z.string().describe(
      "An optional description of this resource. Provide this property when you create the resource.",
    ).optional(),
    headerAction: z.object({
      requestHeadersToAdds: z.array(z.object({
        headerName: z.unknown().describe("The name of the header to set.")
          .optional(),
        headerValue: z.unknown().describe(
          "The value to set the named header to.",
        ).optional(),
      })).describe(
        "The list of request headers to add or overwrite if they're already present.",
      ).optional(),
    }).optional(),
    kind: z.string().describe(
      "Output only. [Output only] Type of the resource. Alwayscompute#securityPolicyRule for security policy rules",
    ).optional(),
    match: z.object({
      config: z.object({
        srcIpRanges: z.array(z.unknown()).describe(
          "CIDR IP address range. Maximum number of src_ip_ranges allowed is 10.",
        ).optional(),
      }).optional(),
      expr: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
      exprOptions: z.object({
        recaptchaOptions: z.object({
          actionTokenSiteKeys: z.unknown().describe(
            "A list of site keys to be used during the validation of reCAPTCHA action-tokens. The provided site keys need to be created from reCAPTCHA API under the same project where the security policy is created.",
          ).optional(),
          sessionTokenSiteKeys: z.unknown().describe(
            "A list of site keys to be used during the validation of reCAPTCHA session-tokens. The provided site keys need to be created from reCAPTCHA API under the same project where the security policy is created.",
          ).optional(),
        }).optional(),
      }).optional(),
      versionedExpr: z.enum(["SRC_IPS_V1"]).describe(
        "Preconfigured versioned expression. If this field is specified, config must also be specified. Available preconfigured expressions along with their requirements are: SRC_IPS_V1 - must specify the corresponding src_ip_range field in config.",
      ).optional(),
    }).describe(
      "Represents a match condition that incoming traffic is evaluated against. Exactly one field must be specified.",
    ).optional(),
    networkMatch: z.object({
      destIpRanges: z.array(z.string()).describe(
        "Destination IPv4/IPv6 addresses or CIDR prefixes, in standard text format.",
      ).optional(),
      destPorts: z.array(z.string()).describe(
        'Destination port numbers for TCP/UDP/SCTP. Each element can be a 16-bit unsigned decimal number (e.g. "80") or range (e.g. "0-1023").',
      ).optional(),
      ipProtocols: z.array(z.string()).describe(
        'IPv4 protocol / IPv6 next header (after extension headers). Each element can be an 8-bit unsigned decimal number (e.g. "6"), range (e.g. "253-254"), or one of the following protocol names: "tcp", "udp", "icmp", "esp", "ah", "ipip", or "sctp".',
      ).optional(),
      srcAsns: z.array(z.number().int()).describe(
        "BGP Autonomous System Number associated with the source IP address.",
      ).optional(),
      srcIpRanges: z.array(z.string()).describe(
        "Source IPv4/IPv6 addresses or CIDR prefixes, in standard text format.",
      ).optional(),
      srcPorts: z.array(z.string()).describe(
        'Source port numbers for TCP/UDP/SCTP. Each element can be a 16-bit unsigned decimal number (e.g. "80") or range (e.g. "0-1023").',
      ).optional(),
      srcRegionCodes: z.array(z.string()).describe(
        "Two-letter ISO 3166-1 alpha-2 country code associated with the source IP address.",
      ).optional(),
      userDefinedFields: z.array(z.object({
        name: z.unknown().describe(
          "Name of the user-defined field, as given in the definition.",
        ).optional(),
        values: z.unknown().describe(
          'Matching values of the field. Each element can be a 32-bit unsigned decimal or hexadecimal (starting with "0x") number (e.g. "64") or range (e.g. "0x400-0x7ff").',
        ).optional(),
      })).describe(
        "User-defined fields. Each element names a defined field and lists the matching values for that field.",
      ).optional(),
    }).describe(
      "Represents a match condition that incoming network traffic is evaluated against.",
    ).optional(),
    preconfiguredWafConfig: z.object({
      exclusions: z.array(z.object({
        requestCookiesToExclude: z.unknown().describe(
          "A list of request cookie names whose value will be excluded from inspection during preconfigured WAF evaluation.",
        ).optional(),
        requestHeadersToExclude: z.unknown().describe(
          "A list of request header names whose value will be excluded from inspection during preconfigured WAF evaluation.",
        ).optional(),
        requestQueryParamsToExclude: z.unknown().describe(
          "A list of request query parameter names whose value will be excluded from inspection during preconfigured WAF evaluation. Note that the parameter can be in the query string or in the POST body.",
        ).optional(),
        requestUrisToExclude: z.unknown().describe(
          "A list of request URIs from the request line to be excluded from inspection during preconfigured WAF evaluation. When specifying this field, the query or fragment part should be excluded.",
        ).optional(),
        targetRuleIds: z.unknown().describe(
          "A list of target rule IDs under the WAF rule set to apply the preconfigured WAF exclusion. If omitted, it refers to all the rule IDs under the WAF rule set.",
        ).optional(),
        targetRuleSet: z.unknown().describe(
          "Target WAF rule set to apply the preconfigured WAF exclusion.",
        ).optional(),
      })).describe(
        "A list of exclusions to apply during preconfigured WAF evaluation.",
      ).optional(),
    }).optional(),
    preview: z.boolean().describe(
      "If set to true, the specified action is not enforced.",
    ).optional(),
    priority: z.number().int().describe(
      "An integer indicating the priority of a rule in the list. The priority must be a positive value between 0 and 2147483647. Rules are evaluated from highest to lowest priority where 0 is the highest priority and 2147483647 is the lowest priority.",
    ).optional(),
    rateLimitOptions: z.object({
      banDurationSec: z.number().int().describe(
        'Can only be specified if the action for the rule is "rate_based_ban". If specified, determines the time (in seconds) the traffic will continue to be banned by the rate limit after the rate falls below the threshold.',
      ).optional(),
      banThreshold: z.object({
        count: z.number().int().describe(
          "Number of HTTP(S) requests for calculating the threshold.",
        ).optional(),
        intervalSec: z.number().int().describe(
          "Interval over which the threshold is computed.",
        ).optional(),
      }).optional(),
      conformAction: z.string().describe(
        'Action to take for requests that are under the configured rate limit threshold. Valid option is "allow" only.',
      ).optional(),
      enforceOnKey: z.enum([
        "ALL",
        "HTTP_COOKIE",
        "HTTP_HEADER",
        "HTTP_PATH",
        "IP",
        "REGION_CODE",
        "SNI",
        "TLS_JA3_FINGERPRINT",
        "TLS_JA4_FINGERPRINT",
        "USER_IP",
        "XFF_IP",
      ]).describe(
        'Determines the key to enforce the rate_limit_threshold on. Possible values are: - ALL: A single rate limit threshold is applied to all the requests matching this rule. This is the default value if "enforceOnKey" is not configured. - IP: The source IP address of the request is the key. Each IP has this limit enforced separately. - HTTP_HEADER: The value of the HTTP header whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the header value. If no such header is present in the request, the key type defaults toALL. - XFF_IP: The first IP address (i.e. the originating client IP address) specified in the list of IPs under X-Forwarded-For HTTP header. If no such header is present or the value is not a valid IP, the key defaults to the source IP address of the request i.e. key type IP. - HTTP_COOKIE: The value of the HTTP cookie whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the cookie value. If no such cookie is present in the request, the key type defaults toALL. - HTTP_PATH: The URL path of the HTTP request. The key value is truncated to the first 128 bytes. - SNI: Server name indication in the TLS session of the HTTPS request. The key value is truncated to the first 128 bytes. The key type defaults to ALL on a HTTP session. - REGION_CODE: The country/region from which the request originates. - TLS_JA3_FINGERPRINT: JA3 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. - USER_IP: The IP address of the originating client, which is resolved based on "userIpRequestHeaders" configured with the security policy. If there is no "userIpRequestHeaders" configuration or an IP address cannot be resolved from it, the key type defaults toIP. - TLS_JA4_FINGERPRINT: JA4 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. For "fairshare" action, this value is limited to ALL i.e. a single rate limit threshold is enforced for all the requests matching the rule.',
      ).optional(),
      enforceOnKeyConfigs: z.array(z.object({
        enforceOnKeyName: z.unknown().describe(
          "Rate limit key name applicable only for the following key types: HTTP_HEADER -- Name of the HTTP header whose value is taken as the key value. HTTP_COOKIE -- Name of the HTTP cookie whose value is taken as the key value.",
        ).optional(),
        enforceOnKeyType: z.unknown().describe(
          'Determines the key to enforce the rate_limit_threshold on. Possible values are: - ALL: A single rate limit threshold is applied to all the requests matching this rule. This is the default value if "enforceOnKeyConfigs" is not configured. - IP: The source IP address of the request is the key. Each IP has this limit enforced separately. - HTTP_HEADER: The value of the HTTP header whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the header value. If no such header is present in the request, the key type defaults toALL. - XFF_IP: The first IP address (i.e. the originating client IP address) specified in the list of IPs under X-Forwarded-For HTTP header. If no such header is present or the value is not a valid IP, the key defaults to the source IP address of the request i.e. key type IP. - HTTP_COOKIE: The value of the HTTP cookie whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the cookie value. If no such cookie is present in the request, the key type defaults toALL. - HTTP_PATH: The URL path of the HTTP request. The key value is truncated to the first 128 bytes. - SNI: Server name indication in the TLS session of the HTTPS request. The key value is truncated to the first 128 bytes. The key type defaults to ALL on a HTTP session. - REGION_CODE: The country/region from which the request originates. - TLS_JA3_FINGERPRINT: JA3 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. - USER_IP: The IP address of the originating client, which is resolved based on "userIpRequestHeaders" configured with the security policy. If there is no "userIpRequestHeaders" configuration or an IP address cannot be resolved from it, the key type defaults toIP. - TLS_JA4_FINGERPRINT: JA4 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL.',
        ).optional(),
      })).describe(
        "If specified, any combination of values of enforce_on_key_type/enforce_on_key_name is treated as the key on which ratelimit threshold/action is enforced. You can specify up to 3 enforce_on_key_configs. If enforce_on_key_configs is specified, enforce_on_key must not be specified.",
      ).optional(),
      enforceOnKeyName: z.string().describe(
        "Rate limit key name applicable only for the following key types: HTTP_HEADER -- Name of the HTTP header whose value is taken as the key value. HTTP_COOKIE -- Name of the HTTP cookie whose value is taken as the key value.",
      ).optional(),
      exceedAction: z.string().describe(
        "Action to take for requests that are above the configured rate limit threshold, to either deny with a specified HTTP response code, or redirect to a different endpoint. Valid options are `deny(STATUS)`, where valid values for `STATUS` are 403, 404, 429, and 502, and `redirect`, where the redirect parameters come from `exceedRedirectOptions` below. The `redirect` action is only supported in Global Security Policies of type CLOUD_ARMOR.",
      ).optional(),
      exceedRedirectOptions: z.object({
        target: z.string().describe(
          "Target for the redirect action. This is required if the type is EXTERNAL_302 and cannot be specified for GOOGLE_RECAPTCHA.",
        ).optional(),
        type: z.enum(["EXTERNAL_302", "GOOGLE_RECAPTCHA"]).describe(
          "Type of the redirect action. Possible values are: - GOOGLE_RECAPTCHA: redirect to reCAPTCHA for manual challenge assessment. - EXTERNAL_302: redirect to a different URL via a 302 response.",
        ).optional(),
      }).optional(),
      rateLimitThreshold: z.object({
        count: z.number().int().describe(
          "Number of HTTP(S) requests for calculating the threshold.",
        ).optional(),
        intervalSec: z.number().int().describe(
          "Interval over which the threshold is computed.",
        ).optional(),
      }).optional(),
    }).optional(),
    redirectOptions: z.object({
      target: z.string().describe(
        "Target for the redirect action. This is required if the type is EXTERNAL_302 and cannot be specified for GOOGLE_RECAPTCHA.",
      ).optional(),
      type: z.enum(["EXTERNAL_302", "GOOGLE_RECAPTCHA"]).describe(
        "Type of the redirect action. Possible values are: - GOOGLE_RECAPTCHA: redirect to reCAPTCHA for manual challenge assessment. - EXTERNAL_302: redirect to a different URL via a 302 response.",
      ).optional(),
    }).optional(),
  })).describe(
    'A list of rules that belong to this policy. There must always be a default rule which is a rule with priority 2147483647 and match all condition (for the match condition this means match "*" for srcIpRanges and for the networkMatch condition every field must be either match "*" or not set). If no rules are provided when creating a security policy, a default rule with action "allow" will be added.',
  ).optional(),
  shortName: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "User-provided name of the organization security policy. The name should be unique in the organization in which the security policy is created. This should only be used when SecurityPolicyType is CLOUD_ARMOR. The name must be 1-63 characters long, and comply with https://www.ietf.org/rfc/rfc1035.txt. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  type: z.enum(["CLOUD_ARMOR", "CLOUD_ARMOR_EDGE", "CLOUD_ARMOR_NETWORK"])
    .describe(
      "The type indicates the intended use of the security policy. - CLOUD_ARMOR: Cloud Armor backend security policies can be configured to filter incoming HTTP requests targeting backend services. They filter requests before they hit the origin servers. - CLOUD_ARMOR_EDGE: Cloud Armor edge security policies can be configured to filter incoming HTTP requests targeting backend services (including Cloud CDN-enabled) as well as backend buckets (Cloud Storage). They filter requests before the request is served from Google's cache. - CLOUD_ARMOR_INTERNAL_SERVICE (preview only): Cloud Armor internal service policies can be configured to filter HTTP requests targeting services managed by Traffic Director in a service mesh. They filter requests before the request is served from the application. - CLOUD_ARMOR_NETWORK: Cloud Armor network policies can be configured to filter packets targeting network load balancing resources such as backend services, target pools, target instances, and instances with external IPs. They filter requests before the request is served from the application. This field can be set only at resource creation time.",
    ).optional(),
  userDefinedFields: z.array(z.object({
    base: z.enum(["IPV4", "IPV6", "TCP", "UDP"]).describe(
      "The base relative to which 'offset' is measured. Possible values are: - IPV4: Points to the beginning of the IPv4 header. - IPV6: Points to the beginning of the IPv6 header. - TCP: Points to the beginning of the TCP header, skipping over any IPv4 options or IPv6 extension headers. Not present for non-first fragments. - UDP: Points to the beginning of the UDP header, skipping over any IPv4 options or IPv6 extension headers. Not present for non-first fragments. required",
    ).optional(),
    mask: z.string().describe(
      'If specified, apply this mask (bitwise AND) to the field to ignore bits before matching. Encoded as a hexadecimal number (starting with "0x"). The last byte of the field (in network byte order) corresponds to the least significant byte of the mask.',
    ).optional(),
    name: z.string().describe(
      "The name of this field. Must be unique within the policy.",
    ).optional(),
    offset: z.number().int().describe(
      "Offset of the first byte of the field (in network byte order) relative to 'base'.",
    ).optional(),
    size: z.number().int().describe(
      "Size of the field in bytes. Valid values: 1-4.",
    ).optional(),
  })).describe(
    'Definitions of user-defined fields for CLOUD_ARMOR_NETWORK policies. A user-defined field consists of up to 4 bytes extracted from a fixed offset in the packet, relative to the IPv4, IPv6, TCP, or UDP header, with an optional mask to select certain bits. Rules may then specify matching values for these fields. Example: userDefinedFields: - name: "ipv4_fragment_offset" base: IPV4 offset: 6 size: 2 mask: "0x1fff"',
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  adaptiveProtectionConfig: z.object({
    layer7DdosDefenseConfig: z.object({
      enable: z.boolean(),
      ruleVisibility: z.string(),
      thresholdConfigs: z.array(z.object({
        autoDeployConfidenceThreshold: z.number(),
        autoDeployExpirationSec: z.number(),
        autoDeployImpactedBaselineThreshold: z.number(),
        autoDeployLoadThreshold: z.number(),
        detectionAbsoluteQps: z.number(),
        detectionLoadThreshold: z.number(),
        detectionRelativeToBaselineQps: z.number(),
        name: z.string(),
        trafficGranularityConfigs: z.array(z.unknown()),
      })),
    }),
  }).optional(),
  advancedOptionsConfig: z.object({
    jsonCustomConfig: z.object({
      contentTypes: z.array(z.string()),
    }),
    jsonParsing: z.string(),
    logLevel: z.string(),
    requestBodyInspectionSize: z.string(),
    userIpRequestHeaders: z.array(z.string()),
  }).optional(),
  associations: z.array(z.object({
    attachmentId: z.string(),
    displayName: z.string(),
    excludedFolders: z.array(z.string()),
    excludedProjects: z.array(z.string()),
    name: z.string(),
    securityPolicyId: z.string(),
    shortName: z.string(),
  })).optional(),
  creationTimestamp: z.string().optional(),
  ddosProtectionConfig: z.object({
    ddosProtection: z.string(),
  }).optional(),
  description: z.string().optional(),
  fingerprint: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  labelFingerprint: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  parent: z.string().optional(),
  recaptchaOptionsConfig: z.object({
    redirectSiteKey: z.string(),
  }).optional(),
  region: z.string().optional(),
  rules: z.array(z.object({
    action: z.string(),
    description: z.string(),
    headerAction: z.object({
      requestHeadersToAdds: z.array(z.object({
        headerName: z.unknown(),
        headerValue: z.unknown(),
      })),
    }),
    kind: z.string(),
    match: z.object({
      config: z.object({
        srcIpRanges: z.array(z.unknown()),
      }),
      expr: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
      exprOptions: z.object({
        recaptchaOptions: z.object({
          actionTokenSiteKeys: z.unknown(),
          sessionTokenSiteKeys: z.unknown(),
        }),
      }),
      versionedExpr: z.string(),
    }),
    networkMatch: z.object({
      destIpRanges: z.array(z.string()),
      destPorts: z.array(z.string()),
      ipProtocols: z.array(z.string()),
      srcAsns: z.array(z.number()),
      srcIpRanges: z.array(z.string()),
      srcPorts: z.array(z.string()),
      srcRegionCodes: z.array(z.string()),
      userDefinedFields: z.array(z.object({
        name: z.unknown(),
        values: z.unknown(),
      })),
    }),
    preconfiguredWafConfig: z.object({
      exclusions: z.array(z.object({
        requestCookiesToExclude: z.unknown(),
        requestHeadersToExclude: z.unknown(),
        requestQueryParamsToExclude: z.unknown(),
        requestUrisToExclude: z.unknown(),
        targetRuleIds: z.unknown(),
        targetRuleSet: z.unknown(),
      })),
    }),
    preview: z.boolean(),
    priority: z.number(),
    rateLimitOptions: z.object({
      banDurationSec: z.number(),
      banThreshold: z.object({
        count: z.number(),
        intervalSec: z.number(),
      }),
      conformAction: z.string(),
      enforceOnKey: z.string(),
      enforceOnKeyConfigs: z.array(z.object({
        enforceOnKeyName: z.unknown(),
        enforceOnKeyType: z.unknown(),
      })),
      enforceOnKeyName: z.string(),
      exceedAction: z.string(),
      exceedRedirectOptions: z.object({
        target: z.string(),
        type: z.string(),
      }),
      rateLimitThreshold: z.object({
        count: z.number(),
        intervalSec: z.number(),
      }),
    }),
    redirectOptions: z.object({
      target: z.string(),
      type: z.string(),
    }),
  })).optional(),
  selfLink: z.string().optional(),
  shortName: z.string().optional(),
  type: z.string().optional(),
  userDefinedFields: z.array(z.object({
    base: z.string(),
    mask: z.string(),
    name: z.string(),
    offset: z.number(),
    size: z.number(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  adaptiveProtectionConfig: z.object({
    layer7DdosDefenseConfig: z.object({
      enable: z.boolean().describe(
        "If set to true, enables CAAP for L7 DDoS detection. This field is only supported in Global Security Policies of type CLOUD_ARMOR.",
      ).optional(),
      ruleVisibility: z.enum(["PREMIUM", "STANDARD"]).describe(
        "Rule visibility can be one of the following: STANDARD - opaque rules. (default) PREMIUM - transparent rules. This field is only supported in Global Security Policies of type CLOUD_ARMOR.",
      ).optional(),
      thresholdConfigs: z.array(z.object({
        autoDeployConfidenceThreshold: z.number().optional(),
        autoDeployExpirationSec: z.number().int().optional(),
        autoDeployImpactedBaselineThreshold: z.number().optional(),
        autoDeployLoadThreshold: z.number().optional(),
        detectionAbsoluteQps: z.number().optional(),
        detectionLoadThreshold: z.number().optional(),
        detectionRelativeToBaselineQps: z.number().optional(),
        name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
          .describe(
            "The name must be 1-63 characters long, and comply withRFC1035. The name must be unique within the security policy.",
          ).optional(),
        trafficGranularityConfigs: z.array(z.unknown()).describe(
          "Configuration options for enabling Adaptive Protection to operate on specified granular traffic units.",
        ).optional(),
      })).describe(
        "Configuration options for layer7 adaptive protection for various customizable thresholds.",
      ).optional(),
    }).describe(
      "Configuration options for L7 DDoS detection. This field is only supported in Global Security Policies of type CLOUD_ARMOR.",
    ).optional(),
  }).describe(
    "Configuration options for Cloud Armor Adaptive Protection (CAAP).",
  ).optional(),
  advancedOptionsConfig: z.object({
    jsonCustomConfig: z.object({
      contentTypes: z.array(z.string()).describe(
        'A list of custom Content-Type header values to apply the JSON parsing. As per RFC 1341, a Content-Type header value has the following format: Content-Type:= type "/" subtype *[";" parameter] When configuring a custom Content-Type header value, only the type/subtype needs to be specified, and the parameters should be excluded.',
      ).optional(),
    }).optional(),
    jsonParsing: z.enum(["DISABLED", "STANDARD", "STANDARD_WITH_GRAPHQL"])
      .optional(),
    logLevel: z.enum(["NORMAL", "VERBOSE"]).optional(),
    requestBodyInspectionSize: z.string().describe(
      'The maximum request size chosen by the customer with Waf enabled. Values supported are "8KB", "16KB, "32KB", "48KB" and "64KB". Values are case insensitive.',
    ).optional(),
    userIpRequestHeaders: z.array(z.string()).describe(
      "An optional list of case-insensitive request header names to use for resolving the callers client IP address.",
    ).optional(),
  }).optional(),
  associations: z.array(z.object({
    attachmentId: z.string().describe(
      "The resource that the security policy is attached to.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. [Output Only] The display name of the security policy of the association.",
    ).optional(),
    excludedFolders: z.array(z.string()).describe(
      "A list of folders to exclude from the security policy.",
    ).optional(),
    excludedProjects: z.array(z.string()).describe(
      "A list of projects to exclude from the security policy.",
    ).optional(),
    name: z.string().describe("The name for an association.").optional(),
    securityPolicyId: z.string().describe(
      "Output only. [Output Only] The security policy ID of the association.",
    ).optional(),
    shortName: z.string().describe(
      "Output only. [Output Only] The short name of the security policy of the association.",
    ).optional(),
  })).describe("A list of associations that belong to this policy.").optional(),
  ddosProtectionConfig: z.object({
    ddosProtection: z.enum(["ADVANCED", "ADVANCED_PREVIEW", "STANDARD"])
      .optional(),
  }).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make get() request to the security policy.",
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this security policy, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the security policy.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  recaptchaOptionsConfig: z.object({
    redirectSiteKey: z.string().describe(
      "An optional field to supply a reCAPTCHA site key to be used for all the rules using the redirect action with the type of GOOGLE_RECAPTCHA under the security policy. The specified site key needs to be created from the reCAPTCHA API. The user is responsible for the validity of the specified site key. If not specified, a Google-managed site key is used. This field is only supported in Global Security Policies of type CLOUD_ARMOR.",
    ).optional(),
  }).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the regional security policy resides. This field is not applicable to global security policies.",
  ).optional(),
  rules: z.array(z.object({
    action: z.string().describe(
      "The Action to perform when the rule is matched. The following are the valid actions: - allow: allow access to target. - deny(STATUS): deny access to target, returns the HTTP response code specified. Valid values for `STATUS` are 403, 404, and 502. - rate_based_ban: limit client traffic to the configured threshold and ban the client if the traffic exceeds the threshold. Configure parameters for this action in RateLimitOptions. Requires rate_limit_options to be set. - redirect: redirect to a different target. This can either be an internal reCAPTCHA redirect, or an external URL-based redirect via a 302 response. Parameters for this action can be configured via redirectOptions. This action is only supported in Global Security Policies of type CLOUD_ARMOR. - throttle: limit client traffic to the configured threshold. Configure parameters for this action in rateLimitOptions. Requires rate_limit_options to be set for this. - fairshare (preview only): when traffic reaches the threshold limit, requests from the clients matching this rule begin to be rate-limited using the Fair Share algorithm. This action is only allowed in security policies of type `CLOUD_ARMOR_INTERNAL_SERVICE`.",
    ).optional(),
    description: z.string().describe(
      "An optional description of this resource. Provide this property when you create the resource.",
    ).optional(),
    headerAction: z.object({
      requestHeadersToAdds: z.array(z.object({
        headerName: z.unknown().describe("The name of the header to set.")
          .optional(),
        headerValue: z.unknown().describe(
          "The value to set the named header to.",
        ).optional(),
      })).describe(
        "The list of request headers to add or overwrite if they're already present.",
      ).optional(),
    }).optional(),
    kind: z.string().describe(
      "Output only. [Output only] Type of the resource. Alwayscompute#securityPolicyRule for security policy rules",
    ).optional(),
    match: z.object({
      config: z.object({
        srcIpRanges: z.array(z.unknown()).describe(
          "CIDR IP address range. Maximum number of src_ip_ranges allowed is 10.",
        ).optional(),
      }).optional(),
      expr: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
      exprOptions: z.object({
        recaptchaOptions: z.object({
          actionTokenSiteKeys: z.unknown().describe(
            "A list of site keys to be used during the validation of reCAPTCHA action-tokens. The provided site keys need to be created from reCAPTCHA API under the same project where the security policy is created.",
          ).optional(),
          sessionTokenSiteKeys: z.unknown().describe(
            "A list of site keys to be used during the validation of reCAPTCHA session-tokens. The provided site keys need to be created from reCAPTCHA API under the same project where the security policy is created.",
          ).optional(),
        }).optional(),
      }).optional(),
      versionedExpr: z.enum(["SRC_IPS_V1"]).describe(
        "Preconfigured versioned expression. If this field is specified, config must also be specified. Available preconfigured expressions along with their requirements are: SRC_IPS_V1 - must specify the corresponding src_ip_range field in config.",
      ).optional(),
    }).describe(
      "Represents a match condition that incoming traffic is evaluated against. Exactly one field must be specified.",
    ).optional(),
    networkMatch: z.object({
      destIpRanges: z.array(z.string()).describe(
        "Destination IPv4/IPv6 addresses or CIDR prefixes, in standard text format.",
      ).optional(),
      destPorts: z.array(z.string()).describe(
        'Destination port numbers for TCP/UDP/SCTP. Each element can be a 16-bit unsigned decimal number (e.g. "80") or range (e.g. "0-1023").',
      ).optional(),
      ipProtocols: z.array(z.string()).describe(
        'IPv4 protocol / IPv6 next header (after extension headers). Each element can be an 8-bit unsigned decimal number (e.g. "6"), range (e.g. "253-254"), or one of the following protocol names: "tcp", "udp", "icmp", "esp", "ah", "ipip", or "sctp".',
      ).optional(),
      srcAsns: z.array(z.number().int()).describe(
        "BGP Autonomous System Number associated with the source IP address.",
      ).optional(),
      srcIpRanges: z.array(z.string()).describe(
        "Source IPv4/IPv6 addresses or CIDR prefixes, in standard text format.",
      ).optional(),
      srcPorts: z.array(z.string()).describe(
        'Source port numbers for TCP/UDP/SCTP. Each element can be a 16-bit unsigned decimal number (e.g. "80") or range (e.g. "0-1023").',
      ).optional(),
      srcRegionCodes: z.array(z.string()).describe(
        "Two-letter ISO 3166-1 alpha-2 country code associated with the source IP address.",
      ).optional(),
      userDefinedFields: z.array(z.object({
        name: z.unknown().describe(
          "Name of the user-defined field, as given in the definition.",
        ).optional(),
        values: z.unknown().describe(
          'Matching values of the field. Each element can be a 32-bit unsigned decimal or hexadecimal (starting with "0x") number (e.g. "64") or range (e.g. "0x400-0x7ff").',
        ).optional(),
      })).describe(
        "User-defined fields. Each element names a defined field and lists the matching values for that field.",
      ).optional(),
    }).describe(
      "Represents a match condition that incoming network traffic is evaluated against.",
    ).optional(),
    preconfiguredWafConfig: z.object({
      exclusions: z.array(z.object({
        requestCookiesToExclude: z.unknown().describe(
          "A list of request cookie names whose value will be excluded from inspection during preconfigured WAF evaluation.",
        ).optional(),
        requestHeadersToExclude: z.unknown().describe(
          "A list of request header names whose value will be excluded from inspection during preconfigured WAF evaluation.",
        ).optional(),
        requestQueryParamsToExclude: z.unknown().describe(
          "A list of request query parameter names whose value will be excluded from inspection during preconfigured WAF evaluation. Note that the parameter can be in the query string or in the POST body.",
        ).optional(),
        requestUrisToExclude: z.unknown().describe(
          "A list of request URIs from the request line to be excluded from inspection during preconfigured WAF evaluation. When specifying this field, the query or fragment part should be excluded.",
        ).optional(),
        targetRuleIds: z.unknown().describe(
          "A list of target rule IDs under the WAF rule set to apply the preconfigured WAF exclusion. If omitted, it refers to all the rule IDs under the WAF rule set.",
        ).optional(),
        targetRuleSet: z.unknown().describe(
          "Target WAF rule set to apply the preconfigured WAF exclusion.",
        ).optional(),
      })).describe(
        "A list of exclusions to apply during preconfigured WAF evaluation.",
      ).optional(),
    }).optional(),
    preview: z.boolean().describe(
      "If set to true, the specified action is not enforced.",
    ).optional(),
    priority: z.number().int().describe(
      "An integer indicating the priority of a rule in the list. The priority must be a positive value between 0 and 2147483647. Rules are evaluated from highest to lowest priority where 0 is the highest priority and 2147483647 is the lowest priority.",
    ).optional(),
    rateLimitOptions: z.object({
      banDurationSec: z.number().int().describe(
        'Can only be specified if the action for the rule is "rate_based_ban". If specified, determines the time (in seconds) the traffic will continue to be banned by the rate limit after the rate falls below the threshold.',
      ).optional(),
      banThreshold: z.object({
        count: z.number().int().describe(
          "Number of HTTP(S) requests for calculating the threshold.",
        ).optional(),
        intervalSec: z.number().int().describe(
          "Interval over which the threshold is computed.",
        ).optional(),
      }).optional(),
      conformAction: z.string().describe(
        'Action to take for requests that are under the configured rate limit threshold. Valid option is "allow" only.',
      ).optional(),
      enforceOnKey: z.enum([
        "ALL",
        "HTTP_COOKIE",
        "HTTP_HEADER",
        "HTTP_PATH",
        "IP",
        "REGION_CODE",
        "SNI",
        "TLS_JA3_FINGERPRINT",
        "TLS_JA4_FINGERPRINT",
        "USER_IP",
        "XFF_IP",
      ]).describe(
        'Determines the key to enforce the rate_limit_threshold on. Possible values are: - ALL: A single rate limit threshold is applied to all the requests matching this rule. This is the default value if "enforceOnKey" is not configured. - IP: The source IP address of the request is the key. Each IP has this limit enforced separately. - HTTP_HEADER: The value of the HTTP header whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the header value. If no such header is present in the request, the key type defaults toALL. - XFF_IP: The first IP address (i.e. the originating client IP address) specified in the list of IPs under X-Forwarded-For HTTP header. If no such header is present or the value is not a valid IP, the key defaults to the source IP address of the request i.e. key type IP. - HTTP_COOKIE: The value of the HTTP cookie whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the cookie value. If no such cookie is present in the request, the key type defaults toALL. - HTTP_PATH: The URL path of the HTTP request. The key value is truncated to the first 128 bytes. - SNI: Server name indication in the TLS session of the HTTPS request. The key value is truncated to the first 128 bytes. The key type defaults to ALL on a HTTP session. - REGION_CODE: The country/region from which the request originates. - TLS_JA3_FINGERPRINT: JA3 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. - USER_IP: The IP address of the originating client, which is resolved based on "userIpRequestHeaders" configured with the security policy. If there is no "userIpRequestHeaders" configuration or an IP address cannot be resolved from it, the key type defaults toIP. - TLS_JA4_FINGERPRINT: JA4 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. For "fairshare" action, this value is limited to ALL i.e. a single rate limit threshold is enforced for all the requests matching the rule.',
      ).optional(),
      enforceOnKeyConfigs: z.array(z.object({
        enforceOnKeyName: z.unknown().describe(
          "Rate limit key name applicable only for the following key types: HTTP_HEADER -- Name of the HTTP header whose value is taken as the key value. HTTP_COOKIE -- Name of the HTTP cookie whose value is taken as the key value.",
        ).optional(),
        enforceOnKeyType: z.unknown().describe(
          'Determines the key to enforce the rate_limit_threshold on. Possible values are: - ALL: A single rate limit threshold is applied to all the requests matching this rule. This is the default value if "enforceOnKeyConfigs" is not configured. - IP: The source IP address of the request is the key. Each IP has this limit enforced separately. - HTTP_HEADER: The value of the HTTP header whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the header value. If no such header is present in the request, the key type defaults toALL. - XFF_IP: The first IP address (i.e. the originating client IP address) specified in the list of IPs under X-Forwarded-For HTTP header. If no such header is present or the value is not a valid IP, the key defaults to the source IP address of the request i.e. key type IP. - HTTP_COOKIE: The value of the HTTP cookie whose name is configured under "enforceOnKeyName". The key value is truncated to the first 128 bytes of the cookie value. If no such cookie is present in the request, the key type defaults toALL. - HTTP_PATH: The URL path of the HTTP request. The key value is truncated to the first 128 bytes. - SNI: Server name indication in the TLS session of the HTTPS request. The key value is truncated to the first 128 bytes. The key type defaults to ALL on a HTTP session. - REGION_CODE: The country/region from which the request originates. - TLS_JA3_FINGERPRINT: JA3 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL. - USER_IP: The IP address of the originating client, which is resolved based on "userIpRequestHeaders" configured with the security policy. If there is no "userIpRequestHeaders" configuration or an IP address cannot be resolved from it, the key type defaults toIP. - TLS_JA4_FINGERPRINT: JA4 TLS/SSL fingerprint if the client connects using HTTPS, HTTP/2 or HTTP/3. If not available, the key type defaults to ALL.',
        ).optional(),
      })).describe(
        "If specified, any combination of values of enforce_on_key_type/enforce_on_key_name is treated as the key on which ratelimit threshold/action is enforced. You can specify up to 3 enforce_on_key_configs. If enforce_on_key_configs is specified, enforce_on_key must not be specified.",
      ).optional(),
      enforceOnKeyName: z.string().describe(
        "Rate limit key name applicable only for the following key types: HTTP_HEADER -- Name of the HTTP header whose value is taken as the key value. HTTP_COOKIE -- Name of the HTTP cookie whose value is taken as the key value.",
      ).optional(),
      exceedAction: z.string().describe(
        "Action to take for requests that are above the configured rate limit threshold, to either deny with a specified HTTP response code, or redirect to a different endpoint. Valid options are `deny(STATUS)`, where valid values for `STATUS` are 403, 404, 429, and 502, and `redirect`, where the redirect parameters come from `exceedRedirectOptions` below. The `redirect` action is only supported in Global Security Policies of type CLOUD_ARMOR.",
      ).optional(),
      exceedRedirectOptions: z.object({
        target: z.string().describe(
          "Target for the redirect action. This is required if the type is EXTERNAL_302 and cannot be specified for GOOGLE_RECAPTCHA.",
        ).optional(),
        type: z.enum(["EXTERNAL_302", "GOOGLE_RECAPTCHA"]).describe(
          "Type of the redirect action. Possible values are: - GOOGLE_RECAPTCHA: redirect to reCAPTCHA for manual challenge assessment. - EXTERNAL_302: redirect to a different URL via a 302 response.",
        ).optional(),
      }).optional(),
      rateLimitThreshold: z.object({
        count: z.number().int().describe(
          "Number of HTTP(S) requests for calculating the threshold.",
        ).optional(),
        intervalSec: z.number().int().describe(
          "Interval over which the threshold is computed.",
        ).optional(),
      }).optional(),
    }).optional(),
    redirectOptions: z.object({
      target: z.string().describe(
        "Target for the redirect action. This is required if the type is EXTERNAL_302 and cannot be specified for GOOGLE_RECAPTCHA.",
      ).optional(),
      type: z.enum(["EXTERNAL_302", "GOOGLE_RECAPTCHA"]).describe(
        "Type of the redirect action. Possible values are: - GOOGLE_RECAPTCHA: redirect to reCAPTCHA for manual challenge assessment. - EXTERNAL_302: redirect to a different URL via a 302 response.",
      ).optional(),
    }).optional(),
  })).describe(
    'A list of rules that belong to this policy. There must always be a default rule which is a rule with priority 2147483647 and match all condition (for the match condition this means match "*" for srcIpRanges and for the networkMatch condition every field must be either match "*" or not set). If no rules are provided when creating a security policy, a default rule with action "allow" will be added.',
  ).optional(),
  shortName: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "User-provided name of the organization security policy. The name should be unique in the organization in which the security policy is created. This should only be used when SecurityPolicyType is CLOUD_ARMOR. The name must be 1-63 characters long, and comply with https://www.ietf.org/rfc/rfc1035.txt. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  type: z.enum(["CLOUD_ARMOR", "CLOUD_ARMOR_EDGE", "CLOUD_ARMOR_NETWORK"])
    .describe(
      "The type indicates the intended use of the security policy. - CLOUD_ARMOR: Cloud Armor backend security policies can be configured to filter incoming HTTP requests targeting backend services. They filter requests before they hit the origin servers. - CLOUD_ARMOR_EDGE: Cloud Armor edge security policies can be configured to filter incoming HTTP requests targeting backend services (including Cloud CDN-enabled) as well as backend buckets (Cloud Storage). They filter requests before the request is served from Google's cache. - CLOUD_ARMOR_INTERNAL_SERVICE (preview only): Cloud Armor internal service policies can be configured to filter HTTP requests targeting services managed by Traffic Director in a service mesh. They filter requests before the request is served from the application. - CLOUD_ARMOR_NETWORK: Cloud Armor network policies can be configured to filter packets targeting network load balancing resources such as backend services, target pools, target instances, and instances with external IPs. They filter requests before the request is served from the application. This field can be set only at resource creation time.",
    ).optional(),
  userDefinedFields: z.array(z.object({
    base: z.enum(["IPV4", "IPV6", "TCP", "UDP"]).describe(
      "The base relative to which 'offset' is measured. Possible values are: - IPV4: Points to the beginning of the IPv4 header. - IPV6: Points to the beginning of the IPv6 header. - TCP: Points to the beginning of the TCP header, skipping over any IPv4 options or IPv6 extension headers. Not present for non-first fragments. - UDP: Points to the beginning of the UDP header, skipping over any IPv4 options or IPv6 extension headers. Not present for non-first fragments. required",
    ).optional(),
    mask: z.string().describe(
      'If specified, apply this mask (bitwise AND) to the field to ignore bits before matching. Encoded as a hexadecimal number (starting with "0x"). The last byte of the field (in network byte order) corresponds to the least significant byte of the mask.',
    ).optional(),
    name: z.string().describe(
      "The name of this field. Must be unique within the policy.",
    ).optional(),
    offset: z.number().int().describe(
      "Offset of the first byte of the field (in network byte order) relative to 'base'.",
    ).optional(),
    size: z.number().int().describe(
      "Size of the field in bytes. Valid values: 1-4.",
    ).optional(),
  })).describe(
    'Definitions of user-defined fields for CLOUD_ARMOR_NETWORK policies. A user-defined field consists of up to 4 bytes extracted from a fixed offset in the packet, relative to the IPv4, IPv6, TCP, or UDP header, with an optional mask to select certain bits. Rules may then specify matching values for these fields. Example: userDefinedFields: - name: "ipv4_fragment_offset" base: IPV4 offset: 6 size: 2 mask: "0x1fff"',
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Compute Engine RegionSecurityPolicies. Registered at `@swamp/gcp/compute/regionsecuritypolicies`. */
export const model = {
  type: "@swamp/gcp/compute/regionsecuritypolicies",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
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
        "Represents a Google Cloud Armor security policy resource. Only external backe...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a regionSecurityPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["adaptiveProtectionConfig"] !== undefined) {
          body["adaptiveProtectionConfig"] = g["adaptiveProtectionConfig"];
        }
        if (g["advancedOptionsConfig"] !== undefined) {
          body["advancedOptionsConfig"] = g["advancedOptionsConfig"];
        }
        if (g["associations"] !== undefined) {
          body["associations"] = g["associations"];
        }
        if (g["ddosProtectionConfig"] !== undefined) {
          body["ddosProtectionConfig"] = g["ddosProtectionConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["recaptchaOptionsConfig"] !== undefined) {
          body["recaptchaOptionsConfig"] = g["recaptchaOptionsConfig"];
        }
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["shortName"] !== undefined) body["shortName"] = g["shortName"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["userDefinedFields"] !== undefined) {
          body["userDefinedFields"] = g["userDefinedFields"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["securityPolicy"] = String(g["name"]);
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
            matchField: "shortName",
            matchValue: String(g["shortName"] ?? ""),
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
      description: "Get a regionSecurityPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the regionSecurityPolicies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["securityPolicy"] = args.identifier;
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
      description: "Update regionSecurityPolicies attributes",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["securityPolicy"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adaptiveProtectionConfig"] !== undefined) {
          body["adaptiveProtectionConfig"] = g["adaptiveProtectionConfig"];
        }
        if (g["advancedOptionsConfig"] !== undefined) {
          body["advancedOptionsConfig"] = g["advancedOptionsConfig"];
        }
        if (g["associations"] !== undefined) {
          body["associations"] = g["associations"];
        }
        if (g["ddosProtectionConfig"] !== undefined) {
          body["ddosProtectionConfig"] = g["ddosProtectionConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["recaptchaOptionsConfig"] !== undefined) {
          body["recaptchaOptionsConfig"] = g["recaptchaOptionsConfig"];
        }
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["shortName"] !== undefined) body["shortName"] = g["shortName"];
        if (g["userDefinedFields"] !== undefined) {
          body["userDefinedFields"] = g["userDefinedFields"];
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
      description: "Delete the regionSecurityPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the regionSecurityPolicies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["securityPolicy"] = args.identifier;
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
      description: "Sync regionSecurityPolicies state from GCP",
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
          params["securityPolicy"] = identifier;
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
      description: "List regionSecurityPolicies resources",
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
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
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
    add_rule: {
      description: "add rule",
      arguments: z.object({
        action: z.any().optional(),
        description: z.any().optional(),
        headerAction: z.any().optional(),
        kind: z.any().optional(),
        match: z.any().optional(),
        networkMatch: z.any().optional(),
        preconfiguredWafConfig: z.any().optional(),
        preview: z.any().optional(),
        priority: z.any().optional(),
        rateLimitOptions: z.any().optional(),
        redirectOptions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["securityPolicy"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["action"] !== undefined) body["action"] = args["action"];
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["headerAction"] !== undefined) {
          body["headerAction"] = args["headerAction"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["match"] !== undefined) body["match"] = args["match"];
        if (args["networkMatch"] !== undefined) {
          body["networkMatch"] = args["networkMatch"];
        }
        if (args["preconfiguredWafConfig"] !== undefined) {
          body["preconfiguredWafConfig"] = args["preconfiguredWafConfig"];
        }
        if (args["preview"] !== undefined) body["preview"] = args["preview"];
        if (args["priority"] !== undefined) body["priority"] = args["priority"];
        if (args["rateLimitOptions"] !== undefined) {
          body["rateLimitOptions"] = args["rateLimitOptions"];
        }
        if (args["redirectOptions"] !== undefined) {
          body["redirectOptions"] = args["redirectOptions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionSecurityPolicies.addRule",
            "path":
              "projects/{project}/regions/{region}/securityPolicies/{securityPolicy}/addRule",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "securityPolicy"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "securityPolicy": { "location": "path", "required": true },
              "validateOnly": { "location": "query" },
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
    get_rule: {
      description: "get rule",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["securityPolicy"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionSecurityPolicies.getRule",
            "path":
              "projects/{project}/regions/{region}/securityPolicies/{securityPolicy}/getRule",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "securityPolicy"],
            "parameters": {
              "priority": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "securityPolicy": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    patch_rule: {
      description: "patch rule",
      arguments: z.object({
        action: z.any().optional(),
        description: z.any().optional(),
        headerAction: z.any().optional(),
        kind: z.any().optional(),
        match: z.any().optional(),
        networkMatch: z.any().optional(),
        preconfiguredWafConfig: z.any().optional(),
        preview: z.any().optional(),
        priority: z.any().optional(),
        rateLimitOptions: z.any().optional(),
        redirectOptions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["securityPolicy"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["action"] !== undefined) body["action"] = args["action"];
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["headerAction"] !== undefined) {
          body["headerAction"] = args["headerAction"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["match"] !== undefined) body["match"] = args["match"];
        if (args["networkMatch"] !== undefined) {
          body["networkMatch"] = args["networkMatch"];
        }
        if (args["preconfiguredWafConfig"] !== undefined) {
          body["preconfiguredWafConfig"] = args["preconfiguredWafConfig"];
        }
        if (args["preview"] !== undefined) body["preview"] = args["preview"];
        if (args["priority"] !== undefined) body["priority"] = args["priority"];
        if (args["rateLimitOptions"] !== undefined) {
          body["rateLimitOptions"] = args["rateLimitOptions"];
        }
        if (args["redirectOptions"] !== undefined) {
          body["redirectOptions"] = args["redirectOptions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionSecurityPolicies.patchRule",
            "path":
              "projects/{project}/regions/{region}/securityPolicies/{securityPolicy}/patchRule",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "securityPolicy"],
            "parameters": {
              "priority": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "securityPolicy": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
              "validateOnly": { "location": "query" },
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
    set_labels: {
      description: "set labels",
      arguments: z.object({
        labelFingerprint: z.any().optional(),
        labels: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = args["labelFingerprint"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionSecurityPolicies.setLabels",
            "path":
              "projects/{project}/regions/{region}/securityPolicies/{resource}/setLabels",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "resource": { "location": "path", "required": true },
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
