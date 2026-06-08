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

// Auto-generated extension model for @swamp/gcp/networksecurity/authzpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Security AuthzPolicies.
 *
 * `AuthzPolicy` is a resource that allows to forward traffic to a callout backend designed to scan the traffic for security purposes.
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
  return `${parent}/authzPolicies/${shortName}`;
}

const BASE_URL = "https://networksecurity.googleapis.com/";

const GET_CONFIG = {
  "id": "networksecurity.projects.locations.authzPolicies.get",
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
  "id": "networksecurity.projects.locations.authzPolicies.create",
  "path": "v1/{+parent}/authzPolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "authzPolicyId": {
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
  "id": "networksecurity.projects.locations.authzPolicies.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "networksecurity.projects.locations.authzPolicies.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "networksecurity.projects.locations.authzPolicies.list",
  "path": "v1/{+parent}/authzPolicies",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  action: z.enum(["AUTHZ_ACTION_UNSPECIFIED", "ALLOW", "DENY", "CUSTOM"])
    .describe(
      "Required. Can be one of `ALLOW`, `DENY`, `CUSTOM`. When the action is `CUSTOM`, `customProvider` must be specified. When the action is `ALLOW`, only requests matching the policy will be allowed. When the action is `DENY`, only requests matching the policy will be denied. When a request arrives, the policies are evaluated in the following order: 1. If there is a `CUSTOM` policy that matches the request, the `CUSTOM` policy is evaluated using the custom authorization providers and the request is denied if the provider rejects the request. 2. If there are any `DENY` policies that match the request, the request is denied. 3. If there are no `ALLOW` policies for the resource or if any of the `ALLOW` policies match the request, the request is allowed. 4. Else the request is denied by default if none of the configured AuthzPolicies with `ALLOW` action match the request.",
    ).optional(),
  customProvider: z.object({
    authzExtension: z.object({
      resources: z.array(z.string()).describe(
        "Required. A list of references to authorization extensions that will be invoked for requests matching this policy. Limited to 1 custom provider.",
      ).optional(),
    }).describe(
      "Optional. Delegate authorization decision to user authored extension. Only one of cloudIap or authzExtension can be specified.",
    ).optional(),
    cloudIap: z.object({}).describe(
      "Optional. Delegates authorization decisions to Cloud IAP. Applicable only for managed load balancers. Enabling Cloud IAP at the AuthzPolicy level is not compatible with Cloud IAP settings in the BackendService. Enabling IAP in both places will result in request failure. Ensure that IAP is enabled in either the AuthzPolicy or the BackendService but not in both places.",
    ).optional(),
  }).describe(
    "Allows delegating authorization decisions to Cloud IAP or to Service Extensions.",
  ).optional(),
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  httpRules: z.array(z.object({
    from: z.object({
      notSources: z.array(z.object({
        ipBlocks: z.unknown().describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.unknown().describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.unknown().describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of request sources. Matches requests from sources that do not match the criteria specified in this field. At least one of sources or notSources must be specified.",
      ).optional(),
      sources: z.array(z.object({
        ipBlocks: z.unknown().describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.unknown().describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.unknown().describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the properties of a request's sources. At least one of sources or notSources must be specified. Limited to 1 source. A match occurs when ANY source (in sources or notSources) matches the request. Within a single source, the match follows AND semantics across fields and OR semantics within a single field, i.e. a match occurs when ANY principal matches AND ANY ipBlocks match.",
      ).optional(),
    }).describe("Describes properties of one or more sources of a request.")
      .optional(),
    to: z.object({
      notOperations: z.array(z.object({
        headerSet: z.unknown().describe(
          "Describes a set of HTTP headers to match against.",
        ).optional(),
        hosts: z.unknown().describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.unknown().describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.unknown().describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.unknown().describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        snis: z.unknown().describe(
          "Optional. A list of SNIs to match against. The match can be one of exact, prefix, suffix, or contains (substring match). If there is no SNI (i.e. plaintext HTTP traffic), the request will be denied. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 SNIs per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of the targets of a request. Matches requests for operations that do not match the criteria specified in this field. At least one of operations or notOperations must be specified.",
      ).optional(),
      operations: z.array(z.object({
        headerSet: z.unknown().describe(
          "Describes a set of HTTP headers to match against.",
        ).optional(),
        hosts: z.unknown().describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.unknown().describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.unknown().describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.unknown().describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        snis: z.unknown().describe(
          "Optional. A list of SNIs to match against. The match can be one of exact, prefix, suffix, or contains (substring match). If there is no SNI (i.e. plaintext HTTP traffic), the request will be denied. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 SNIs per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes properties of one or more targets of a request. At least one of operations or notOperations must be specified. Limited to 1 operation. A match occurs when ANY operation (in operations or notOperations) matches. Within an operation, the match follows AND semantics across fields and OR semantics within a field, i.e. a match occurs when ANY path matches AND ANY header matches and ANY method matches.",
      ).optional(),
    }).describe("Describes properties of one or more targets of a request.")
      .optional(),
    when: z.string().describe(
      "Optional. CEL expression that describes the conditions to be satisfied for the action. The result of the CEL expression is ANDed with the from and to. Refer to the CEL language reference for a list of available attributes.",
    ).optional(),
  })).describe(
    "Optional. A list of authorization HTTP rules to match against the incoming request. A policy match occurs when at least one HTTP rule matches the request or when no HTTP rules are specified in the policy. At least one HTTP Rule is required for Allow or Deny Action. Limited to 5 rules.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `AuthzPolicy` resource. The format must comply with [the following requirements](/compute/docs/labeling-resources#requirements).",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. Name of the `AuthzPolicy` resource in the following format: `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`.",
  ).optional(),
  networkRules: z.array(z.object({
    from: z.object({
      notSources: z.array(z.object({
        ipBlocks: z.unknown().describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.unknown().describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.unknown().describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of request sources. Matches requests from sources that do not match the criteria specified in this field. At least one of sources or notSources must be specified.",
      ).optional(),
      sources: z.array(z.object({
        ipBlocks: z.unknown().describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.unknown().describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.unknown().describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the properties of a request's sources. At least one of sources or notSources must be specified. Limited to 1 source. A match occurs when ANY source (in sources or notSources) matches the request. Within a single source, the match follows AND semantics across fields and OR semantics within a single field, i.e. a match occurs when ANY principal matches AND ANY ipBlocks match.",
      ).optional(),
    }).describe("Describes properties of one or more sources of a request.")
      .optional(),
    to: z.object({
      notOperations: z.array(z.object({
        headerSet: z.unknown().describe(
          "Describes a set of HTTP headers to match against.",
        ).optional(),
        hosts: z.unknown().describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.unknown().describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.unknown().describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.unknown().describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        snis: z.unknown().describe(
          "Optional. A list of SNIs to match against. The match can be one of exact, prefix, suffix, or contains (substring match). If there is no SNI (i.e. plaintext HTTP traffic), the request will be denied. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 SNIs per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of the targets of a request. Matches requests for operations that do not match the criteria specified in this field. At least one of operations or notOperations must be specified.",
      ).optional(),
      operations: z.array(z.object({
        headerSet: z.unknown().describe(
          "Describes a set of HTTP headers to match against.",
        ).optional(),
        hosts: z.unknown().describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.unknown().describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.unknown().describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.unknown().describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        snis: z.unknown().describe(
          "Optional. A list of SNIs to match against. The match can be one of exact, prefix, suffix, or contains (substring match). If there is no SNI (i.e. plaintext HTTP traffic), the request will be denied. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 SNIs per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes properties of one or more targets of a request. At least one of operations or notOperations must be specified. Limited to 1 operation. A match occurs when ANY operation (in operations or notOperations) matches. Within an operation, the match follows AND semantics across fields and OR semantics within a field, i.e. a match occurs when ANY path matches AND ANY header matches and ANY method matches.",
      ).optional(),
    }).describe("Describes properties of one or more targets of a request.")
      .optional(),
    when: z.string().describe(
      "Optional. CEL expression that describes the conditions to be satisfied for the action. The result of the CEL expression is ANDed with the from and to. Refer to the CEL language reference for a list of available attributes.",
    ).optional(),
  })).describe(
    "Optional. A list of authorization network rules to match against the incoming request. A policy match occurs when at least one network rule matches the request. At least one network rule is required for Allow or Deny Action if no HTTP rules are provided. Network rules are mutually exclusive with HTTP rules. Limited to 5 rules.",
  ).optional(),
  policyProfile: z.enum([
    "POLICY_PROFILE_UNSPECIFIED",
    "REQUEST_AUTHZ",
    "CONTENT_AUTHZ",
  ]).describe(
    "Optional. Immutable. Defines the type of authorization being performed. If not specified, `REQUEST_AUTHZ` is applied. This field cannot be changed once AuthzPolicy is created.",
  ).optional(),
  target: z.object({
    loadBalancingScheme: z.enum([
      "LOAD_BALANCING_SCHEME_UNSPECIFIED",
      "INTERNAL_MANAGED",
      "EXTERNAL_MANAGED",
      "INTERNAL_SELF_MANAGED",
    ]).describe(
      "Optional. All gateways and forwarding rules referenced by this policy and extensions must share the same load balancing scheme. Required only when targeting forwarding rules. If targeting Secure Web Proxy, this field must be `INTERNAL_MANAGED` or not specified. Must not be specified when targeting Agent Gateway. Supported values: `INTERNAL_MANAGED` and `EXTERNAL_MANAGED`. For more information, refer to [Backend services overview](https://cloud.google.com/load-balancing/docs/backend-service).",
    ).optional(),
    resources: z.array(z.string()).describe(
      "Required. A list of references to the Forwarding Rules, Secure Web Proxy Gateways, or Agent Gateways on which this policy will be applied.",
    ).optional(),
  }).describe(
    "Specifies the set of targets to which this policy should be applied to.",
  ).optional(),
  authzPolicyId: z.string().describe(
    "Required. User-provided ID of the `AuthzPolicy` resource to be created.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  action: z.string().optional(),
  createTime: z.string().optional(),
  customProvider: z.object({
    authzExtension: z.object({
      resources: z.array(z.string()),
    }),
    cloudIap: z.object({}),
  }).optional(),
  description: z.string().optional(),
  httpRules: z.array(z.object({
    from: z.object({
      notSources: z.array(z.object({
        ipBlocks: z.unknown(),
        principals: z.unknown(),
        resources: z.unknown(),
      })),
      sources: z.array(z.object({
        ipBlocks: z.unknown(),
        principals: z.unknown(),
        resources: z.unknown(),
      })),
    }),
    to: z.object({
      notOperations: z.array(z.object({
        headerSet: z.unknown(),
        hosts: z.unknown(),
        mcp: z.unknown(),
        methods: z.unknown(),
        paths: z.unknown(),
        snis: z.unknown(),
      })),
      operations: z.array(z.object({
        headerSet: z.unknown(),
        hosts: z.unknown(),
        mcp: z.unknown(),
        methods: z.unknown(),
        paths: z.unknown(),
        snis: z.unknown(),
      })),
    }),
    when: z.string(),
  })).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  networkRules: z.array(z.object({
    from: z.object({
      notSources: z.array(z.object({
        ipBlocks: z.unknown(),
        principals: z.unknown(),
        resources: z.unknown(),
      })),
      sources: z.array(z.object({
        ipBlocks: z.unknown(),
        principals: z.unknown(),
        resources: z.unknown(),
      })),
    }),
    to: z.object({
      notOperations: z.array(z.object({
        headerSet: z.unknown(),
        hosts: z.unknown(),
        mcp: z.unknown(),
        methods: z.unknown(),
        paths: z.unknown(),
        snis: z.unknown(),
      })),
      operations: z.array(z.object({
        headerSet: z.unknown(),
        hosts: z.unknown(),
        mcp: z.unknown(),
        methods: z.unknown(),
        paths: z.unknown(),
        snis: z.unknown(),
      })),
    }),
    when: z.string(),
  })).optional(),
  policyProfile: z.string().optional(),
  target: z.object({
    loadBalancingScheme: z.string(),
    resources: z.array(z.string()),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  action: z.enum(["AUTHZ_ACTION_UNSPECIFIED", "ALLOW", "DENY", "CUSTOM"])
    .describe(
      "Required. Can be one of `ALLOW`, `DENY`, `CUSTOM`. When the action is `CUSTOM`, `customProvider` must be specified. When the action is `ALLOW`, only requests matching the policy will be allowed. When the action is `DENY`, only requests matching the policy will be denied. When a request arrives, the policies are evaluated in the following order: 1. If there is a `CUSTOM` policy that matches the request, the `CUSTOM` policy is evaluated using the custom authorization providers and the request is denied if the provider rejects the request. 2. If there are any `DENY` policies that match the request, the request is denied. 3. If there are no `ALLOW` policies for the resource or if any of the `ALLOW` policies match the request, the request is allowed. 4. Else the request is denied by default if none of the configured AuthzPolicies with `ALLOW` action match the request.",
    ).optional(),
  customProvider: z.object({
    authzExtension: z.object({
      resources: z.array(z.string()).describe(
        "Required. A list of references to authorization extensions that will be invoked for requests matching this policy. Limited to 1 custom provider.",
      ).optional(),
    }).describe(
      "Optional. Delegate authorization decision to user authored extension. Only one of cloudIap or authzExtension can be specified.",
    ).optional(),
    cloudIap: z.object({}).describe(
      "Optional. Delegates authorization decisions to Cloud IAP. Applicable only for managed load balancers. Enabling Cloud IAP at the AuthzPolicy level is not compatible with Cloud IAP settings in the BackendService. Enabling IAP in both places will result in request failure. Ensure that IAP is enabled in either the AuthzPolicy or the BackendService but not in both places.",
    ).optional(),
  }).describe(
    "Allows delegating authorization decisions to Cloud IAP or to Service Extensions.",
  ).optional(),
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  httpRules: z.array(z.object({
    from: z.object({
      notSources: z.array(z.object({
        ipBlocks: z.unknown().describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.unknown().describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.unknown().describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of request sources. Matches requests from sources that do not match the criteria specified in this field. At least one of sources or notSources must be specified.",
      ).optional(),
      sources: z.array(z.object({
        ipBlocks: z.unknown().describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.unknown().describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.unknown().describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the properties of a request's sources. At least one of sources or notSources must be specified. Limited to 1 source. A match occurs when ANY source (in sources or notSources) matches the request. Within a single source, the match follows AND semantics across fields and OR semantics within a single field, i.e. a match occurs when ANY principal matches AND ANY ipBlocks match.",
      ).optional(),
    }).describe("Describes properties of one or more sources of a request.")
      .optional(),
    to: z.object({
      notOperations: z.array(z.object({
        headerSet: z.unknown().describe(
          "Describes a set of HTTP headers to match against.",
        ).optional(),
        hosts: z.unknown().describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.unknown().describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.unknown().describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.unknown().describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        snis: z.unknown().describe(
          "Optional. A list of SNIs to match against. The match can be one of exact, prefix, suffix, or contains (substring match). If there is no SNI (i.e. plaintext HTTP traffic), the request will be denied. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 SNIs per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of the targets of a request. Matches requests for operations that do not match the criteria specified in this field. At least one of operations or notOperations must be specified.",
      ).optional(),
      operations: z.array(z.object({
        headerSet: z.unknown().describe(
          "Describes a set of HTTP headers to match against.",
        ).optional(),
        hosts: z.unknown().describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.unknown().describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.unknown().describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.unknown().describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        snis: z.unknown().describe(
          "Optional. A list of SNIs to match against. The match can be one of exact, prefix, suffix, or contains (substring match). If there is no SNI (i.e. plaintext HTTP traffic), the request will be denied. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 SNIs per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes properties of one or more targets of a request. At least one of operations or notOperations must be specified. Limited to 1 operation. A match occurs when ANY operation (in operations or notOperations) matches. Within an operation, the match follows AND semantics across fields and OR semantics within a field, i.e. a match occurs when ANY path matches AND ANY header matches and ANY method matches.",
      ).optional(),
    }).describe("Describes properties of one or more targets of a request.")
      .optional(),
    when: z.string().describe(
      "Optional. CEL expression that describes the conditions to be satisfied for the action. The result of the CEL expression is ANDed with the from and to. Refer to the CEL language reference for a list of available attributes.",
    ).optional(),
  })).describe(
    "Optional. A list of authorization HTTP rules to match against the incoming request. A policy match occurs when at least one HTTP rule matches the request or when no HTTP rules are specified in the policy. At least one HTTP Rule is required for Allow or Deny Action. Limited to 5 rules.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `AuthzPolicy` resource. The format must comply with [the following requirements](/compute/docs/labeling-resources#requirements).",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. Name of the `AuthzPolicy` resource in the following format: `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`.",
  ).optional(),
  networkRules: z.array(z.object({
    from: z.object({
      notSources: z.array(z.object({
        ipBlocks: z.unknown().describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.unknown().describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.unknown().describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of request sources. Matches requests from sources that do not match the criteria specified in this field. At least one of sources or notSources must be specified.",
      ).optional(),
      sources: z.array(z.object({
        ipBlocks: z.unknown().describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.unknown().describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.unknown().describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the properties of a request's sources. At least one of sources or notSources must be specified. Limited to 1 source. A match occurs when ANY source (in sources or notSources) matches the request. Within a single source, the match follows AND semantics across fields and OR semantics within a single field, i.e. a match occurs when ANY principal matches AND ANY ipBlocks match.",
      ).optional(),
    }).describe("Describes properties of one or more sources of a request.")
      .optional(),
    to: z.object({
      notOperations: z.array(z.object({
        headerSet: z.unknown().describe(
          "Describes a set of HTTP headers to match against.",
        ).optional(),
        hosts: z.unknown().describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.unknown().describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.unknown().describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.unknown().describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        snis: z.unknown().describe(
          "Optional. A list of SNIs to match against. The match can be one of exact, prefix, suffix, or contains (substring match). If there is no SNI (i.e. plaintext HTTP traffic), the request will be denied. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 SNIs per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of the targets of a request. Matches requests for operations that do not match the criteria specified in this field. At least one of operations or notOperations must be specified.",
      ).optional(),
      operations: z.array(z.object({
        headerSet: z.unknown().describe(
          "Describes a set of HTTP headers to match against.",
        ).optional(),
        hosts: z.unknown().describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.unknown().describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.unknown().describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.unknown().describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
        snis: z.unknown().describe(
          "Optional. A list of SNIs to match against. The match can be one of exact, prefix, suffix, or contains (substring match). If there is no SNI (i.e. plaintext HTTP traffic), the request will be denied. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 SNIs per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes properties of one or more targets of a request. At least one of operations or notOperations must be specified. Limited to 1 operation. A match occurs when ANY operation (in operations or notOperations) matches. Within an operation, the match follows AND semantics across fields and OR semantics within a field, i.e. a match occurs when ANY path matches AND ANY header matches and ANY method matches.",
      ).optional(),
    }).describe("Describes properties of one or more targets of a request.")
      .optional(),
    when: z.string().describe(
      "Optional. CEL expression that describes the conditions to be satisfied for the action. The result of the CEL expression is ANDed with the from and to. Refer to the CEL language reference for a list of available attributes.",
    ).optional(),
  })).describe(
    "Optional. A list of authorization network rules to match against the incoming request. A policy match occurs when at least one network rule matches the request. At least one network rule is required for Allow or Deny Action if no HTTP rules are provided. Network rules are mutually exclusive with HTTP rules. Limited to 5 rules.",
  ).optional(),
  policyProfile: z.enum([
    "POLICY_PROFILE_UNSPECIFIED",
    "REQUEST_AUTHZ",
    "CONTENT_AUTHZ",
  ]).describe(
    "Optional. Immutable. Defines the type of authorization being performed. If not specified, `REQUEST_AUTHZ` is applied. This field cannot be changed once AuthzPolicy is created.",
  ).optional(),
  target: z.object({
    loadBalancingScheme: z.enum([
      "LOAD_BALANCING_SCHEME_UNSPECIFIED",
      "INTERNAL_MANAGED",
      "EXTERNAL_MANAGED",
      "INTERNAL_SELF_MANAGED",
    ]).describe(
      "Optional. All gateways and forwarding rules referenced by this policy and extensions must share the same load balancing scheme. Required only when targeting forwarding rules. If targeting Secure Web Proxy, this field must be `INTERNAL_MANAGED` or not specified. Must not be specified when targeting Agent Gateway. Supported values: `INTERNAL_MANAGED` and `EXTERNAL_MANAGED`. For more information, refer to [Backend services overview](https://cloud.google.com/load-balancing/docs/backend-service).",
    ).optional(),
    resources: z.array(z.string()).describe(
      "Required. A list of references to the Forwarding Rules, Secure Web Proxy Gateways, or Agent Gateways on which this policy will be applied.",
    ).optional(),
  }).describe(
    "Specifies the set of targets to which this policy should be applied to.",
  ).optional(),
  authzPolicyId: z.string().describe(
    "Required. User-provided ID of the `AuthzPolicy` resource to be created.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
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

/** Swamp extension model for Google Cloud Network Security AuthzPolicies. Registered at `@swamp/gcp/networksecurity/authzpolicies`. */
export const model = {
  type: "@swamp/gcp/networksecurity/authzpolicies",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "Added: policyProfile",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.04.15.1",
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
      description: "Added: networkRules",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "Removed: networkRules",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { networkRules: _networkRules, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.26.1",
      description: "Added: networkRules",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "`AuthzPolicy` is a resource that allows to forward traffic to a callout backe...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a authzPolicies",
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
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["customProvider"] !== undefined) {
          body["customProvider"] = g["customProvider"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["httpRules"] !== undefined) body["httpRules"] = g["httpRules"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkRules"] !== undefined) {
          body["networkRules"] = g["networkRules"];
        }
        if (g["policyProfile"] !== undefined) {
          body["policyProfile"] = g["policyProfile"];
        }
        if (g["target"] !== undefined) body["target"] = g["target"];
        if (g["authzPolicyId"] !== undefined) {
          body["authzPolicyId"] = g["authzPolicyId"];
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
      description: "Get a authzPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the authzPolicies"),
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
      description: "Update authzPolicies attributes",
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
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["customProvider"] !== undefined) {
          body["customProvider"] = g["customProvider"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["httpRules"] !== undefined) body["httpRules"] = g["httpRules"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["networkRules"] !== undefined) {
          body["networkRules"] = g["networkRules"];
        }
        if (g["target"] !== undefined) body["target"] = g["target"];
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
      description: "Delete the authzPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the authzPolicies"),
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
      description: "Sync authzPolicies state from GCP",
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
      description: "List authzPolicies resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filtering results.").optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default.",
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "authzPolicies",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networksecurity.projects.locations.authzPolicies.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networksecurity.projects.locations.authzPolicies.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id":
              "networksecurity.projects.locations.authzPolicies.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
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
