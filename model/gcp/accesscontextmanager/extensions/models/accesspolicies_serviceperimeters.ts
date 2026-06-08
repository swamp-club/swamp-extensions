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

// Auto-generated extension model for @swamp/gcp/accesscontextmanager/accesspolicies-serviceperimeters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Access Context Manager AccessPolicies.ServicePerimeters.
 *
 * `ServicePerimeter` describes a set of Google Cloud resources which can freely import and export data amongst themselves, but not export outside of the `ServicePerimeter`. If a request with a source within this `ServicePerimeter` has a target outside of the `ServicePerimeter`, the request will be blocked. Otherwise the request is allowed. There are two types of Service Perimeter - Regular and Bridge. Regular Service Perimeters cannot overlap, a single Google Cloud project or VPC network can only belong to a single regular Service Perimeter. Service Perimeter Bridges can contain only Google Cloud projects as members, a single Google Cloud project may belong to multiple Service Perimeter Bridges.
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
  return `${parent}/servicePerimeters/${shortName}`;
}

const BASE_URL = "https://accesscontextmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "accesscontextmanager.accessPolicies.servicePerimeters.get",
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
  "id": "accesscontextmanager.accessPolicies.servicePerimeters.create",
  "path": "v1/{+parent}/servicePerimeters",
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
  "id": "accesscontextmanager.accessPolicies.servicePerimeters.patch",
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
  "id": "accesscontextmanager.accessPolicies.servicePerimeters.delete",
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
  "id": "accesscontextmanager.accessPolicies.servicePerimeters.list",
  "path": "v1/{+parent}/servicePerimeters",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  description: z.string().describe(
    "Description of the `ServicePerimeter` and its use. Does not affect behavior.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name for the `ServicePerimeter`. Format: `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The `service_perimeter` component must begin with a letter, followed by alphanumeric characters or `_`. After you create a `ServicePerimeter`, you cannot change its `name`.",
  ).optional(),
  perimeterType: z.enum(["PERIMETER_TYPE_REGULAR", "PERIMETER_TYPE_BRIDGE"])
    .describe(
      "Perimeter type indicator. A single project or VPC network is allowed to be a member of single regular perimeter, but multiple service perimeter bridges. A project cannot be a included in a perimeter bridge without being included in regular perimeter. For perimeter bridges, the restricted service list as well as access level lists must be empty.",
    ).optional(),
  spec: z.object({
    accessLevels: z.array(z.string()).describe(
      'A list of `AccessLevel` resource names that allow resources within the `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed must be in the same policy as this `ServicePerimeter`. Referencing a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter Bridge, must be empty.',
    ).optional(),
    egressPolicies: z.array(z.object({
      egressFrom: z.object({
        identities: z.array(z.unknown()).describe(
          "A list of identities that are allowed access through [EgressPolicy]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities.",
        ).optional(),
        identityType: z.enum([
          "IDENTITY_TYPE_UNSPECIFIED",
          "ANY_IDENTITY",
          "ANY_USER_ACCOUNT",
          "ANY_SERVICE_ACCOUNT",
        ]).describe(
          "Specifies the type of identities that are allowed access to outside the perimeter. If left unspecified, then members of `identities` field will be allowed access.",
        ).optional(),
        sourceRestriction: z.enum([
          "SOURCE_RESTRICTION_UNSPECIFIED",
          "SOURCE_RESTRICTION_ENABLED",
          "SOURCE_RESTRICTION_DISABLED",
        ]).describe(
          "Whether to enforce traffic restrictions based on `sources` field. If the `sources` fields is non-empty, then this field must be set to `SOURCE_RESTRICTION_ENABLED`.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Sources that this EgressPolicy authorizes access from. If this field is not empty, then `source_restriction` must be set to `SOURCE_RESTRICTION_ENABLED`.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an EgressPolicy matches a request. Conditions based on information about the source of the request. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed.",
      ).optional(),
      egressTo: z.object({
        externalResources: z.array(z.unknown()).describe(
          "A list of external resources that are allowed to be accessed. Only AWS and Azure resources are supported. For Amazon S3, the supported formats are s3://BUCKET_NAME, s3a://BUCKET_NAME, and s3n://BUCKET_NAME. For Azure Storage, the supported format is azure://myaccount.blob.core.windows.net/CONTAINER_NAME. A request matches if it contains an external resource in this list (Example: s3://bucket/path). Currently '*' is not allowed.",
        ).optional(),
        operations: z.array(z.unknown()).describe(
          "A list of ApiOperations allowed to be performed by the sources specified in the corresponding EgressFrom. A request matches if it uses an operation/service in this list.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "A list of resources, currently only projects in the form `projects/`, that are allowed to be accessed by sources defined in the corresponding EgressFrom. A request matches if it contains a resource in this list. If `*` is specified for `resources`, then this EgressTo rule will authorize access to all resources outside the perimeter.",
        ).optional(),
        roles: z.array(z.unknown()).describe(
          "IAM roles that represent the set of operations that the sources specified in the corresponding EgressFrom. are allowed to perform in this ServicePerimeter.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an EgressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the `resources` specified. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed. The request must match `operations` AND `resources` fields in order to be allowed egress out of the perimeter.",
      ).optional(),
      title: z.string().describe(
        "Optional. Human-readable title for the egress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters.",
      ).optional(),
    })).describe(
      "List of EgressPolicies to apply to the perimeter. A perimeter may have multiple EgressPolicies, each of which is evaluated separately. Access is granted if any EgressPolicy grants it. Must be empty for a perimeter bridge.",
    ).optional(),
    ingressPolicies: z.array(z.object({
      ingressFrom: z.object({
        identities: z.array(z.unknown()).describe(
          "A list of identities that are allowed access through [IngressPolicy]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities.",
        ).optional(),
        identityType: z.enum([
          "IDENTITY_TYPE_UNSPECIFIED",
          "ANY_IDENTITY",
          "ANY_USER_ACCOUNT",
          "ANY_SERVICE_ACCOUNT",
        ]).describe(
          "Specifies the type of identities that are allowed access from outside the perimeter. If left unspecified, then members of `identities` field will be allowed access.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Sources that this IngressPolicy authorizes access from.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the source of the request. The request must satisfy what is defined in `sources` AND identity related fields in order to match.",
      ).optional(),
      ingressTo: z.object({
        operations: z.array(z.unknown()).describe(
          "A list of ApiOperations allowed to be performed by the sources specified in corresponding IngressFrom in this ServicePerimeter.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "A list of resources, currently only projects in the form `projects/`, protected by this ServicePerimeter that are allowed to be accessed by sources defined in the corresponding IngressFrom. If a single `*` is specified, then access to all resources inside the perimeter are allowed.",
        ).optional(),
        roles: z.array(z.unknown()).describe(
          "IAM roles that represent the set of operations that the sources specified in the corresponding IngressFrom are allowed to perform in this ServicePerimeter.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the target resource of the request. The request must satisfy what is defined in `operations` AND `resources` in order to match.",
      ).optional(),
      title: z.string().describe(
        "Optional. Human-readable title for the ingress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters.",
      ).optional(),
    })).describe(
      "List of IngressPolicies to apply to the perimeter. A perimeter may have multiple IngressPolicies, each of which is evaluated separately. Access is granted if any Ingress Policy grants it. Must be empty for a perimeter bridge.",
    ).optional(),
    resources: z.array(z.string()).describe(
      "A list of Google Cloud resources that are inside of the service perimeter. Currently only projects and VPCs are allowed. Project format: `projects/{project_number}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`.",
    ).optional(),
    restrictedServices: z.array(z.string()).describe(
      "Google Cloud services that are subject to the Service Perimeter restrictions. For example, if `storage.googleapis.com` is specified, access to the storage buckets inside the perimeter must meet the perimeter's access restrictions.",
    ).optional(),
    vpcAccessibleServices: z.object({
      allowedServices: z.array(z.string()).describe(
        "The list of APIs usable within the Service Perimeter. Must be empty unless 'enable_restriction' is True. You can specify a list of individual services, as well as include the 'RESTRICTED-SERVICES' value, which automatically includes all of the services protected by the perimeter.",
      ).optional(),
      enableRestriction: z.boolean().describe(
        "Whether to restrict API calls within the Service Perimeter to the list of APIs specified in 'allowed_services'.",
      ).optional(),
    }).describe(
      "Specifies how APIs are allowed to communicate within the Service Perimeter.",
    ).optional(),
  }).describe(
    "`ServicePerimeterConfig` specifies a set of Google Cloud resources that describe specific Service Perimeter configuration.",
  ).optional(),
  status: z.object({
    accessLevels: z.array(z.string()).describe(
      'A list of `AccessLevel` resource names that allow resources within the `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed must be in the same policy as this `ServicePerimeter`. Referencing a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter Bridge, must be empty.',
    ).optional(),
    egressPolicies: z.array(z.object({
      egressFrom: z.object({
        identities: z.array(z.unknown()).describe(
          "A list of identities that are allowed access through [EgressPolicy]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities.",
        ).optional(),
        identityType: z.enum([
          "IDENTITY_TYPE_UNSPECIFIED",
          "ANY_IDENTITY",
          "ANY_USER_ACCOUNT",
          "ANY_SERVICE_ACCOUNT",
        ]).describe(
          "Specifies the type of identities that are allowed access to outside the perimeter. If left unspecified, then members of `identities` field will be allowed access.",
        ).optional(),
        sourceRestriction: z.enum([
          "SOURCE_RESTRICTION_UNSPECIFIED",
          "SOURCE_RESTRICTION_ENABLED",
          "SOURCE_RESTRICTION_DISABLED",
        ]).describe(
          "Whether to enforce traffic restrictions based on `sources` field. If the `sources` fields is non-empty, then this field must be set to `SOURCE_RESTRICTION_ENABLED`.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Sources that this EgressPolicy authorizes access from. If this field is not empty, then `source_restriction` must be set to `SOURCE_RESTRICTION_ENABLED`.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an EgressPolicy matches a request. Conditions based on information about the source of the request. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed.",
      ).optional(),
      egressTo: z.object({
        externalResources: z.array(z.unknown()).describe(
          "A list of external resources that are allowed to be accessed. Only AWS and Azure resources are supported. For Amazon S3, the supported formats are s3://BUCKET_NAME, s3a://BUCKET_NAME, and s3n://BUCKET_NAME. For Azure Storage, the supported format is azure://myaccount.blob.core.windows.net/CONTAINER_NAME. A request matches if it contains an external resource in this list (Example: s3://bucket/path). Currently '*' is not allowed.",
        ).optional(),
        operations: z.array(z.unknown()).describe(
          "A list of ApiOperations allowed to be performed by the sources specified in the corresponding EgressFrom. A request matches if it uses an operation/service in this list.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "A list of resources, currently only projects in the form `projects/`, that are allowed to be accessed by sources defined in the corresponding EgressFrom. A request matches if it contains a resource in this list. If `*` is specified for `resources`, then this EgressTo rule will authorize access to all resources outside the perimeter.",
        ).optional(),
        roles: z.array(z.unknown()).describe(
          "IAM roles that represent the set of operations that the sources specified in the corresponding EgressFrom. are allowed to perform in this ServicePerimeter.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an EgressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the `resources` specified. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed. The request must match `operations` AND `resources` fields in order to be allowed egress out of the perimeter.",
      ).optional(),
      title: z.string().describe(
        "Optional. Human-readable title for the egress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters.",
      ).optional(),
    })).describe(
      "List of EgressPolicies to apply to the perimeter. A perimeter may have multiple EgressPolicies, each of which is evaluated separately. Access is granted if any EgressPolicy grants it. Must be empty for a perimeter bridge.",
    ).optional(),
    ingressPolicies: z.array(z.object({
      ingressFrom: z.object({
        identities: z.array(z.unknown()).describe(
          "A list of identities that are allowed access through [IngressPolicy]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities.",
        ).optional(),
        identityType: z.enum([
          "IDENTITY_TYPE_UNSPECIFIED",
          "ANY_IDENTITY",
          "ANY_USER_ACCOUNT",
          "ANY_SERVICE_ACCOUNT",
        ]).describe(
          "Specifies the type of identities that are allowed access from outside the perimeter. If left unspecified, then members of `identities` field will be allowed access.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Sources that this IngressPolicy authorizes access from.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the source of the request. The request must satisfy what is defined in `sources` AND identity related fields in order to match.",
      ).optional(),
      ingressTo: z.object({
        operations: z.array(z.unknown()).describe(
          "A list of ApiOperations allowed to be performed by the sources specified in corresponding IngressFrom in this ServicePerimeter.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "A list of resources, currently only projects in the form `projects/`, protected by this ServicePerimeter that are allowed to be accessed by sources defined in the corresponding IngressFrom. If a single `*` is specified, then access to all resources inside the perimeter are allowed.",
        ).optional(),
        roles: z.array(z.unknown()).describe(
          "IAM roles that represent the set of operations that the sources specified in the corresponding IngressFrom are allowed to perform in this ServicePerimeter.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the target resource of the request. The request must satisfy what is defined in `operations` AND `resources` in order to match.",
      ).optional(),
      title: z.string().describe(
        "Optional. Human-readable title for the ingress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters.",
      ).optional(),
    })).describe(
      "List of IngressPolicies to apply to the perimeter. A perimeter may have multiple IngressPolicies, each of which is evaluated separately. Access is granted if any Ingress Policy grants it. Must be empty for a perimeter bridge.",
    ).optional(),
    resources: z.array(z.string()).describe(
      "A list of Google Cloud resources that are inside of the service perimeter. Currently only projects and VPCs are allowed. Project format: `projects/{project_number}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`.",
    ).optional(),
    restrictedServices: z.array(z.string()).describe(
      "Google Cloud services that are subject to the Service Perimeter restrictions. For example, if `storage.googleapis.com` is specified, access to the storage buckets inside the perimeter must meet the perimeter's access restrictions.",
    ).optional(),
    vpcAccessibleServices: z.object({
      allowedServices: z.array(z.string()).describe(
        "The list of APIs usable within the Service Perimeter. Must be empty unless 'enable_restriction' is True. You can specify a list of individual services, as well as include the 'RESTRICTED-SERVICES' value, which automatically includes all of the services protected by the perimeter.",
      ).optional(),
      enableRestriction: z.boolean().describe(
        "Whether to restrict API calls within the Service Perimeter to the list of APIs specified in 'allowed_services'.",
      ).optional(),
    }).describe(
      "Specifies how APIs are allowed to communicate within the Service Perimeter.",
    ).optional(),
  }).describe(
    "`ServicePerimeterConfig` specifies a set of Google Cloud resources that describe specific Service Perimeter configuration.",
  ).optional(),
  title: z.string().describe(
    "Human readable title. Must be unique within the Policy.",
  ).optional(),
  useExplicitDryRunSpec: z.boolean().describe(
    'Use explicit dry run spec flag. Ordinarily, a dry-run spec implicitly exists for all Service Perimeters, and that spec is identical to the status for those Service Perimeters. When this flag is set, it inhibits the generation of the implicit spec, thereby allowing the user to explicitly provide a configuration ("spec") to use in a dry-run version of the Service Perimeter. This allows the user to test changes to the enforced config ("status") without actually enforcing them. This testing is done through analyzing the differences between currently enforced and suggested restrictions. use_explicit_dry_run_spec must bet set to True if any of the fields in the spec are set to non-default values.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  perimeterType: z.string().optional(),
  spec: z.object({
    accessLevels: z.array(z.string()),
    egressPolicies: z.array(z.object({
      egressFrom: z.object({
        identities: z.array(z.unknown()),
        identityType: z.string(),
        sourceRestriction: z.string(),
        sources: z.array(z.unknown()),
      }),
      egressTo: z.object({
        externalResources: z.array(z.unknown()),
        operations: z.array(z.unknown()),
        resources: z.array(z.unknown()),
        roles: z.array(z.unknown()),
      }),
      title: z.string(),
    })),
    ingressPolicies: z.array(z.object({
      ingressFrom: z.object({
        identities: z.array(z.unknown()),
        identityType: z.string(),
        sources: z.array(z.unknown()),
      }),
      ingressTo: z.object({
        operations: z.array(z.unknown()),
        resources: z.array(z.unknown()),
        roles: z.array(z.unknown()),
      }),
      title: z.string(),
    })),
    resources: z.array(z.string()),
    restrictedServices: z.array(z.string()),
    vpcAccessibleServices: z.object({
      allowedServices: z.array(z.string()),
      enableRestriction: z.boolean(),
    }),
  }).optional(),
  status: z.object({
    accessLevels: z.array(z.string()),
    egressPolicies: z.array(z.object({
      egressFrom: z.object({
        identities: z.array(z.unknown()),
        identityType: z.string(),
        sourceRestriction: z.string(),
        sources: z.array(z.unknown()),
      }),
      egressTo: z.object({
        externalResources: z.array(z.unknown()),
        operations: z.array(z.unknown()),
        resources: z.array(z.unknown()),
        roles: z.array(z.unknown()),
      }),
      title: z.string(),
    })),
    ingressPolicies: z.array(z.object({
      ingressFrom: z.object({
        identities: z.array(z.unknown()),
        identityType: z.string(),
        sources: z.array(z.unknown()),
      }),
      ingressTo: z.object({
        operations: z.array(z.unknown()),
        resources: z.array(z.unknown()),
        roles: z.array(z.unknown()),
      }),
      title: z.string(),
    })),
    resources: z.array(z.string()),
    restrictedServices: z.array(z.string()),
    vpcAccessibleServices: z.object({
      allowedServices: z.array(z.string()),
      enableRestriction: z.boolean(),
    }),
  }).optional(),
  title: z.string().optional(),
  useExplicitDryRunSpec: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe(
    "Description of the `ServicePerimeter` and its use. Does not affect behavior.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name for the `ServicePerimeter`. Format: `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The `service_perimeter` component must begin with a letter, followed by alphanumeric characters or `_`. After you create a `ServicePerimeter`, you cannot change its `name`.",
  ).optional(),
  perimeterType: z.enum(["PERIMETER_TYPE_REGULAR", "PERIMETER_TYPE_BRIDGE"])
    .describe(
      "Perimeter type indicator. A single project or VPC network is allowed to be a member of single regular perimeter, but multiple service perimeter bridges. A project cannot be a included in a perimeter bridge without being included in regular perimeter. For perimeter bridges, the restricted service list as well as access level lists must be empty.",
    ).optional(),
  spec: z.object({
    accessLevels: z.array(z.string()).describe(
      'A list of `AccessLevel` resource names that allow resources within the `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed must be in the same policy as this `ServicePerimeter`. Referencing a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter Bridge, must be empty.',
    ).optional(),
    egressPolicies: z.array(z.object({
      egressFrom: z.object({
        identities: z.array(z.unknown()).describe(
          "A list of identities that are allowed access through [EgressPolicy]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities.",
        ).optional(),
        identityType: z.enum([
          "IDENTITY_TYPE_UNSPECIFIED",
          "ANY_IDENTITY",
          "ANY_USER_ACCOUNT",
          "ANY_SERVICE_ACCOUNT",
        ]).describe(
          "Specifies the type of identities that are allowed access to outside the perimeter. If left unspecified, then members of `identities` field will be allowed access.",
        ).optional(),
        sourceRestriction: z.enum([
          "SOURCE_RESTRICTION_UNSPECIFIED",
          "SOURCE_RESTRICTION_ENABLED",
          "SOURCE_RESTRICTION_DISABLED",
        ]).describe(
          "Whether to enforce traffic restrictions based on `sources` field. If the `sources` fields is non-empty, then this field must be set to `SOURCE_RESTRICTION_ENABLED`.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Sources that this EgressPolicy authorizes access from. If this field is not empty, then `source_restriction` must be set to `SOURCE_RESTRICTION_ENABLED`.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an EgressPolicy matches a request. Conditions based on information about the source of the request. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed.",
      ).optional(),
      egressTo: z.object({
        externalResources: z.array(z.unknown()).describe(
          "A list of external resources that are allowed to be accessed. Only AWS and Azure resources are supported. For Amazon S3, the supported formats are s3://BUCKET_NAME, s3a://BUCKET_NAME, and s3n://BUCKET_NAME. For Azure Storage, the supported format is azure://myaccount.blob.core.windows.net/CONTAINER_NAME. A request matches if it contains an external resource in this list (Example: s3://bucket/path). Currently '*' is not allowed.",
        ).optional(),
        operations: z.array(z.unknown()).describe(
          "A list of ApiOperations allowed to be performed by the sources specified in the corresponding EgressFrom. A request matches if it uses an operation/service in this list.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "A list of resources, currently only projects in the form `projects/`, that are allowed to be accessed by sources defined in the corresponding EgressFrom. A request matches if it contains a resource in this list. If `*` is specified for `resources`, then this EgressTo rule will authorize access to all resources outside the perimeter.",
        ).optional(),
        roles: z.array(z.unknown()).describe(
          "IAM roles that represent the set of operations that the sources specified in the corresponding EgressFrom. are allowed to perform in this ServicePerimeter.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an EgressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the `resources` specified. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed. The request must match `operations` AND `resources` fields in order to be allowed egress out of the perimeter.",
      ).optional(),
      title: z.string().describe(
        "Optional. Human-readable title for the egress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters.",
      ).optional(),
    })).describe(
      "List of EgressPolicies to apply to the perimeter. A perimeter may have multiple EgressPolicies, each of which is evaluated separately. Access is granted if any EgressPolicy grants it. Must be empty for a perimeter bridge.",
    ).optional(),
    ingressPolicies: z.array(z.object({
      ingressFrom: z.object({
        identities: z.array(z.unknown()).describe(
          "A list of identities that are allowed access through [IngressPolicy]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities.",
        ).optional(),
        identityType: z.enum([
          "IDENTITY_TYPE_UNSPECIFIED",
          "ANY_IDENTITY",
          "ANY_USER_ACCOUNT",
          "ANY_SERVICE_ACCOUNT",
        ]).describe(
          "Specifies the type of identities that are allowed access from outside the perimeter. If left unspecified, then members of `identities` field will be allowed access.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Sources that this IngressPolicy authorizes access from.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the source of the request. The request must satisfy what is defined in `sources` AND identity related fields in order to match.",
      ).optional(),
      ingressTo: z.object({
        operations: z.array(z.unknown()).describe(
          "A list of ApiOperations allowed to be performed by the sources specified in corresponding IngressFrom in this ServicePerimeter.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "A list of resources, currently only projects in the form `projects/`, protected by this ServicePerimeter that are allowed to be accessed by sources defined in the corresponding IngressFrom. If a single `*` is specified, then access to all resources inside the perimeter are allowed.",
        ).optional(),
        roles: z.array(z.unknown()).describe(
          "IAM roles that represent the set of operations that the sources specified in the corresponding IngressFrom are allowed to perform in this ServicePerimeter.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the target resource of the request. The request must satisfy what is defined in `operations` AND `resources` in order to match.",
      ).optional(),
      title: z.string().describe(
        "Optional. Human-readable title for the ingress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters.",
      ).optional(),
    })).describe(
      "List of IngressPolicies to apply to the perimeter. A perimeter may have multiple IngressPolicies, each of which is evaluated separately. Access is granted if any Ingress Policy grants it. Must be empty for a perimeter bridge.",
    ).optional(),
    resources: z.array(z.string()).describe(
      "A list of Google Cloud resources that are inside of the service perimeter. Currently only projects and VPCs are allowed. Project format: `projects/{project_number}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`.",
    ).optional(),
    restrictedServices: z.array(z.string()).describe(
      "Google Cloud services that are subject to the Service Perimeter restrictions. For example, if `storage.googleapis.com` is specified, access to the storage buckets inside the perimeter must meet the perimeter's access restrictions.",
    ).optional(),
    vpcAccessibleServices: z.object({
      allowedServices: z.array(z.string()).describe(
        "The list of APIs usable within the Service Perimeter. Must be empty unless 'enable_restriction' is True. You can specify a list of individual services, as well as include the 'RESTRICTED-SERVICES' value, which automatically includes all of the services protected by the perimeter.",
      ).optional(),
      enableRestriction: z.boolean().describe(
        "Whether to restrict API calls within the Service Perimeter to the list of APIs specified in 'allowed_services'.",
      ).optional(),
    }).describe(
      "Specifies how APIs are allowed to communicate within the Service Perimeter.",
    ).optional(),
  }).describe(
    "`ServicePerimeterConfig` specifies a set of Google Cloud resources that describe specific Service Perimeter configuration.",
  ).optional(),
  status: z.object({
    accessLevels: z.array(z.string()).describe(
      'A list of `AccessLevel` resource names that allow resources within the `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed must be in the same policy as this `ServicePerimeter`. Referencing a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter Bridge, must be empty.',
    ).optional(),
    egressPolicies: z.array(z.object({
      egressFrom: z.object({
        identities: z.array(z.unknown()).describe(
          "A list of identities that are allowed access through [EgressPolicy]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities.",
        ).optional(),
        identityType: z.enum([
          "IDENTITY_TYPE_UNSPECIFIED",
          "ANY_IDENTITY",
          "ANY_USER_ACCOUNT",
          "ANY_SERVICE_ACCOUNT",
        ]).describe(
          "Specifies the type of identities that are allowed access to outside the perimeter. If left unspecified, then members of `identities` field will be allowed access.",
        ).optional(),
        sourceRestriction: z.enum([
          "SOURCE_RESTRICTION_UNSPECIFIED",
          "SOURCE_RESTRICTION_ENABLED",
          "SOURCE_RESTRICTION_DISABLED",
        ]).describe(
          "Whether to enforce traffic restrictions based on `sources` field. If the `sources` fields is non-empty, then this field must be set to `SOURCE_RESTRICTION_ENABLED`.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Sources that this EgressPolicy authorizes access from. If this field is not empty, then `source_restriction` must be set to `SOURCE_RESTRICTION_ENABLED`.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an EgressPolicy matches a request. Conditions based on information about the source of the request. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed.",
      ).optional(),
      egressTo: z.object({
        externalResources: z.array(z.unknown()).describe(
          "A list of external resources that are allowed to be accessed. Only AWS and Azure resources are supported. For Amazon S3, the supported formats are s3://BUCKET_NAME, s3a://BUCKET_NAME, and s3n://BUCKET_NAME. For Azure Storage, the supported format is azure://myaccount.blob.core.windows.net/CONTAINER_NAME. A request matches if it contains an external resource in this list (Example: s3://bucket/path). Currently '*' is not allowed.",
        ).optional(),
        operations: z.array(z.unknown()).describe(
          "A list of ApiOperations allowed to be performed by the sources specified in the corresponding EgressFrom. A request matches if it uses an operation/service in this list.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "A list of resources, currently only projects in the form `projects/`, that are allowed to be accessed by sources defined in the corresponding EgressFrom. A request matches if it contains a resource in this list. If `*` is specified for `resources`, then this EgressTo rule will authorize access to all resources outside the perimeter.",
        ).optional(),
        roles: z.array(z.unknown()).describe(
          "IAM roles that represent the set of operations that the sources specified in the corresponding EgressFrom. are allowed to perform in this ServicePerimeter.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an EgressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the `resources` specified. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed. The request must match `operations` AND `resources` fields in order to be allowed egress out of the perimeter.",
      ).optional(),
      title: z.string().describe(
        "Optional. Human-readable title for the egress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters.",
      ).optional(),
    })).describe(
      "List of EgressPolicies to apply to the perimeter. A perimeter may have multiple EgressPolicies, each of which is evaluated separately. Access is granted if any EgressPolicy grants it. Must be empty for a perimeter bridge.",
    ).optional(),
    ingressPolicies: z.array(z.object({
      ingressFrom: z.object({
        identities: z.array(z.unknown()).describe(
          "A list of identities that are allowed access through [IngressPolicy]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities.",
        ).optional(),
        identityType: z.enum([
          "IDENTITY_TYPE_UNSPECIFIED",
          "ANY_IDENTITY",
          "ANY_USER_ACCOUNT",
          "ANY_SERVICE_ACCOUNT",
        ]).describe(
          "Specifies the type of identities that are allowed access from outside the perimeter. If left unspecified, then members of `identities` field will be allowed access.",
        ).optional(),
        sources: z.array(z.unknown()).describe(
          "Sources that this IngressPolicy authorizes access from.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the source of the request. The request must satisfy what is defined in `sources` AND identity related fields in order to match.",
      ).optional(),
      ingressTo: z.object({
        operations: z.array(z.unknown()).describe(
          "A list of ApiOperations allowed to be performed by the sources specified in corresponding IngressFrom in this ServicePerimeter.",
        ).optional(),
        resources: z.array(z.unknown()).describe(
          "A list of resources, currently only projects in the form `projects/`, protected by this ServicePerimeter that are allowed to be accessed by sources defined in the corresponding IngressFrom. If a single `*` is specified, then access to all resources inside the perimeter are allowed.",
        ).optional(),
        roles: z.array(z.unknown()).describe(
          "IAM roles that represent the set of operations that the sources specified in the corresponding IngressFrom are allowed to perform in this ServicePerimeter.",
        ).optional(),
      }).describe(
        "Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the target resource of the request. The request must satisfy what is defined in `operations` AND `resources` in order to match.",
      ).optional(),
      title: z.string().describe(
        "Optional. Human-readable title for the ingress rule. The title must be unique within the perimeter and can not exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters.",
      ).optional(),
    })).describe(
      "List of IngressPolicies to apply to the perimeter. A perimeter may have multiple IngressPolicies, each of which is evaluated separately. Access is granted if any Ingress Policy grants it. Must be empty for a perimeter bridge.",
    ).optional(),
    resources: z.array(z.string()).describe(
      "A list of Google Cloud resources that are inside of the service perimeter. Currently only projects and VPCs are allowed. Project format: `projects/{project_number}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`.",
    ).optional(),
    restrictedServices: z.array(z.string()).describe(
      "Google Cloud services that are subject to the Service Perimeter restrictions. For example, if `storage.googleapis.com` is specified, access to the storage buckets inside the perimeter must meet the perimeter's access restrictions.",
    ).optional(),
    vpcAccessibleServices: z.object({
      allowedServices: z.array(z.string()).describe(
        "The list of APIs usable within the Service Perimeter. Must be empty unless 'enable_restriction' is True. You can specify a list of individual services, as well as include the 'RESTRICTED-SERVICES' value, which automatically includes all of the services protected by the perimeter.",
      ).optional(),
      enableRestriction: z.boolean().describe(
        "Whether to restrict API calls within the Service Perimeter to the list of APIs specified in 'allowed_services'.",
      ).optional(),
    }).describe(
      "Specifies how APIs are allowed to communicate within the Service Perimeter.",
    ).optional(),
  }).describe(
    "`ServicePerimeterConfig` specifies a set of Google Cloud resources that describe specific Service Perimeter configuration.",
  ).optional(),
  title: z.string().describe(
    "Human readable title. Must be unique within the Policy.",
  ).optional(),
  useExplicitDryRunSpec: z.boolean().describe(
    'Use explicit dry run spec flag. Ordinarily, a dry-run spec implicitly exists for all Service Perimeters, and that spec is identical to the status for those Service Perimeters. When this flag is set, it inhibits the generation of the implicit spec, thereby allowing the user to explicitly provide a configuration ("spec") to use in a dry-run version of the Service Perimeter. This allows the user to test changes to the enforced config ("status") without actually enforcing them. This testing is done through analyzing the differences between currently enforced and suggested restrictions. use_explicit_dry_run_spec must bet set to True if any of the fields in the spec are set to non-default values.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Access Context Manager AccessPolicies.ServicePerimeters. Registered at `@swamp/gcp/accesscontextmanager/accesspolicies-serviceperimeters`. */
export const model = {
  type: "@swamp/gcp/accesscontextmanager/accesspolicies-serviceperimeters",
  version: "2026.06.08.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "`ServicePerimeter` describes a set of Google Cloud resources which can freely...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a servicePerimeters",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["perimeterType"] !== undefined) {
          body["perimeterType"] = g["perimeterType"];
        }
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["useExplicitDryRunSpec"] !== undefined) {
          body["useExplicitDryRunSpec"] = g["useExplicitDryRunSpec"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a servicePerimeters",
      arguments: z.object({
        identifier: z.string().describe("The name of the servicePerimeters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update servicePerimeters attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["perimeterType"] !== undefined) {
          body["perimeterType"] = g["perimeterType"];
        }
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["useExplicitDryRunSpec"] !== undefined) {
          body["useExplicitDryRunSpec"] = g["useExplicitDryRunSpec"];
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
      description: "Delete the servicePerimeters",
      arguments: z.object({
        identifier: z.string().describe("The name of the servicePerimeters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync servicePerimeters state from GCP",
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
            String(g["parent"] ?? ""),
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
      description: "List servicePerimeters resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Number of Service Perimeters to include in the list. Default 100.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "servicePerimeters",
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
    commit: {
      description: "commit",
      arguments: z.object({
        etag: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "accesscontextmanager.accessPolicies.servicePerimeters.commit",
            "path": "v1/{+parent}/servicePerimeters:commit",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    replace_all: {
      description: "replace all",
      arguments: z.object({
        etag: z.any().optional(),
        servicePerimeters: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["servicePerimeters"] !== undefined) {
          body["servicePerimeters"] = args["servicePerimeters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "accesscontextmanager.accessPolicies.servicePerimeters.replaceAll",
            "path": "v1/{+parent}/servicePerimeters:replaceAll",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
              "accesscontextmanager.accessPolicies.servicePerimeters.testIamPermissions",
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
