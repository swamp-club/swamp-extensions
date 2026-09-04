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

// Auto-generated extension model for @swamp/gcp/accesscontextmanager/gcpuseraccessbindings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Access Context Manager GcpUserAccessBindings.
 *
 * Restricts access to Cloud Console and Google Cloud APIs for a set of users using Context-Aware Access.
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
  return `${parent}/gcpUserAccessBindings/${shortName}`;
}

const BASE_URL = "https://accesscontextmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "accesscontextmanager.organizations.gcpUserAccessBindings.get",
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
  "id": "accesscontextmanager.organizations.gcpUserAccessBindings.create",
  "path": "v1/{+parent}/gcpUserAccessBindings",
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
  "id": "accesscontextmanager.organizations.gcpUserAccessBindings.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "append": {
      "location": "query",
    },
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
  "id": "accesscontextmanager.organizations.gcpUserAccessBindings.delete",
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
  "id": "accesscontextmanager.organizations.gcpUserAccessBindings.list",
  "path": "v1/{+parent}/gcpUserAccessBindings",
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
  accessLevels: z.array(z.string()).describe(
    'Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted"',
  ).optional(),
  dryRunAccessLevels: z.array(z.string()).describe(
    'Optional. Dry run access level that will be evaluated but will not be enforced. The access denial based on dry run policy will be logged. Only one access level is supported, not multiple. This list must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted"',
  ).optional(),
  groupKey: z.string().describe(
    'Optional. Immutable. Google Group id whose users are subject to this binding\'s restrictions. See "id" in the [Google Workspace Directory API\'s Group Resource] (https://developers.google.com/admin-sdk/directory/v1/reference/groups#resource). If a group\'s email address/alias is changed, this resource will continue to point at the changed group. This field does not accept group email addresses or aliases. Example: "01d520gv4vjcrht"',
  ).optional(),
  name: z.string().describe(
    'Immutable. Assigned by the server during creation. The last segment has an arbitrary length and has only URI unreserved characters (as defined by [RFC 3986 Section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)). Should not be specified by the client during creation. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N"',
  ).optional(),
  principal: z.object({
    federatedPrincipal: z.string().describe(
      "Immutable. The IAM principal identifier of the federated workforce or workload to assign the policy to. Examples include the following: * Single principal: `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}` * All workloads in a workload identity pool: `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*` * All Workforce Pools in a Google Cloud organization: `principalSet://cloudresourcemanager.googleapis.com/organizations/{organization_id}/type/WorkforcePool` Bindings created for all Workforce Pools in a Google Cloud organization support only `scoped_access_settings` with the `restricted_project` client scope and active `session_settings`. No other configurations are allowed.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Immutable. Service account email used to assign policies to a specific service account. If a service account is subject to multiple policies (e.g., if there is a policy for all service accounts in a project and a policy for the service account), the closest (i.e. the most specific) dry-run policy will be used for the dry-run functionality and the closest enforcement policy will be used for the enforcement.",
    ).optional(),
    serviceAccountProjectNumber: z.string().describe(
      "Immutable. Cloud project number used to assign policies to all service accounts owned by the project.",
    ).optional(),
  }).describe(
    "Optional. Immutable. The principal that is subject to the access policies in this policy binding.",
  ).optional(),
  scopedAccessSettings: z.array(z.object({
    activeSettings: z.object({
      accessLevels: z.array(z.string()).describe(
        'Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted"',
      ).optional(),
      sessionSettings: z.object({
        maxInactivity: z.string().describe(
          "Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps.",
        ).optional(),
        sessionLength: z.string().describe(
          "Optional. The session length. Setting this field to zero allows for sessions that are active indefinitely. Also, setting `session_length_enabled` to `false` disregards session limits, which means that sessions never expire. If `use_oidc_max_age` is `true`, for OIDC apps, the session length will be the minimum of this field and the OIDC `max_age` param. If this field is set to zero, `session_length_enabled` must be set to `false` or left unset.",
        ).optional(),
        sessionLengthEnabled: z.boolean().describe(
          "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite. If `session_length` is set to zero, this field must be set to false.",
        ).optional(),
        sessionReauthMethod: z.enum([
          "SESSION_REAUTH_METHOD_UNSPECIFIED",
          "LOGIN",
          "SECURITY_KEY",
          "PASSWORD",
        ]).describe(
          "Optional. Session method when user's Google Cloud session is up.",
        ).optional(),
        useOidcMaxAge: z.boolean().describe(
          "Optional. Only useful for OIDC apps. When false, the OIDC max_age param, if passed in the authentication request will be ignored. When true, the re-auth period will be the minimum of the session_length field and the max_age OIDC param.",
        ).optional(),
      }).describe(
        "Optional. Session settings applied to user access on a given AccessScope.",
      ).optional(),
    }).describe(
      "Optional. Access settings for this scoped access settings. This field may be empty if dry_run_settings is set.",
    ).optional(),
    dryRunSettings: z.object({
      accessLevels: z.array(z.string()).describe(
        'Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted"',
      ).optional(),
      sessionSettings: z.object({
        maxInactivity: z.string().describe(
          "Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps.",
        ).optional(),
        sessionLength: z.string().describe(
          "Optional. The session length. Setting this field to zero allows for sessions that are active indefinitely. Also, setting `session_length_enabled` to `false` disregards session limits, which means that sessions never expire. If `use_oidc_max_age` is `true`, for OIDC apps, the session length will be the minimum of this field and the OIDC `max_age` param. If this field is set to zero, `session_length_enabled` must be set to `false` or left unset.",
        ).optional(),
        sessionLengthEnabled: z.boolean().describe(
          "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite. If `session_length` is set to zero, this field must be set to false.",
        ).optional(),
        sessionReauthMethod: z.enum([
          "SESSION_REAUTH_METHOD_UNSPECIFIED",
          "LOGIN",
          "SECURITY_KEY",
          "PASSWORD",
        ]).describe(
          "Optional. Session method when user's Google Cloud session is up.",
        ).optional(),
        useOidcMaxAge: z.boolean().describe(
          "Optional. Only useful for OIDC apps. When false, the OIDC max_age param, if passed in the authentication request will be ignored. When true, the re-auth period will be the minimum of the session_length field and the max_age OIDC param.",
        ).optional(),
      }).describe(
        "Optional. Session settings applied to user access on a given AccessScope.",
      ).optional(),
    }).describe(
      "Optional. Dry-run access settings for this scoped access settings. This field may be empty if active_settings is set.",
    ).optional(),
    scope: z.object({
      clientScope: z.object({
        restrictedClientApplication: z.object({
          clientId: z.unknown().describe(
            "The OAuth client ID of the application.",
          ).optional(),
          name: z.unknown().describe(
            'The name of the application. Example: "Cloud Console"',
          ).optional(),
        }).describe(
          "Optional. The application that is subject to this binding's scope.",
        ).optional(),
        restrictedProject: z.object({
          name: z.unknown().describe(
            "The Google Cloud project resource name. Format: `projects/{project_number}`. Only the project number is supported. Example: `projects/1234567890`",
          ).optional(),
        }).describe(
          "Optional. The Google Cloud project that is subject to this binding's scope.",
        ).optional(),
      }).describe("Optional. Client scope for this access scope.").optional(),
    }).describe(
      "Optional. Application, etc. to which the access settings will be applied to. Implicitly, this is the scoped access settings key; as such, it must be unique and non-empty.",
    ).optional(),
  })).describe(
    "Optional. A list of scoped access settings that set this binding's restrictions on a subset of applications.",
  ).optional(),
  sessionSettings: z.object({
    maxInactivity: z.string().describe(
      "Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps.",
    ).optional(),
    sessionLength: z.string().describe(
      "Optional. The session length. Setting this field to zero allows for sessions that are active indefinitely. Also, setting `session_length_enabled` to `false` disregards session limits, which means that sessions never expire. If `use_oidc_max_age` is `true`, for OIDC apps, the session length will be the minimum of this field and the OIDC `max_age` param. If this field is set to zero, `session_length_enabled` must be set to `false` or left unset.",
    ).optional(),
    sessionLengthEnabled: z.boolean().describe(
      "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite. If `session_length` is set to zero, this field must be set to false.",
    ).optional(),
    sessionReauthMethod: z.enum([
      "SESSION_REAUTH_METHOD_UNSPECIFIED",
      "LOGIN",
      "SECURITY_KEY",
      "PASSWORD",
    ]).describe(
      "Optional. Session method when user's Google Cloud session is up.",
    ).optional(),
    useOidcMaxAge: z.boolean().describe(
      "Optional. Only useful for OIDC apps. When false, the OIDC max_age param, if passed in the authentication request will be ignored. When true, the re-auth period will be the minimum of the session_length field and the max_age OIDC param.",
    ).optional(),
  }).describe(
    "Optional. The Google Cloud session length (GCSL) policy for the group key.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accessLevels: z.array(z.string()).optional(),
  dryRunAccessLevels: z.array(z.string()).optional(),
  groupKey: z.string().optional(),
  name: z.string(),
  principal: z.object({
    federatedPrincipal: z.string(),
    serviceAccount: z.string(),
    serviceAccountProjectNumber: z.string(),
  }).optional(),
  scopedAccessSettings: z.array(z.object({
    activeSettings: z.object({
      accessLevels: z.array(z.string()),
      sessionSettings: z.object({
        maxInactivity: z.string(),
        sessionLength: z.string(),
        sessionLengthEnabled: z.boolean(),
        sessionReauthMethod: z.string(),
        useOidcMaxAge: z.boolean(),
      }),
    }),
    dryRunSettings: z.object({
      accessLevels: z.array(z.string()),
      sessionSettings: z.object({
        maxInactivity: z.string(),
        sessionLength: z.string(),
        sessionLengthEnabled: z.boolean(),
        sessionReauthMethod: z.string(),
        useOidcMaxAge: z.boolean(),
      }),
    }),
    scope: z.object({
      clientScope: z.object({
        restrictedClientApplication: z.object({
          clientId: z.unknown(),
          name: z.unknown(),
        }),
        restrictedProject: z.object({
          name: z.unknown(),
        }),
      }),
    }),
  })).optional(),
  sessionSettings: z.object({
    maxInactivity: z.string(),
    sessionLength: z.string(),
    sessionLengthEnabled: z.boolean(),
    sessionReauthMethod: z.string(),
    useOidcMaxAge: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  accessLevels: z.array(z.string()).describe(
    'Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted"',
  ).optional(),
  dryRunAccessLevels: z.array(z.string()).describe(
    'Optional. Dry run access level that will be evaluated but will not be enforced. The access denial based on dry run policy will be logged. Only one access level is supported, not multiple. This list must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted"',
  ).optional(),
  groupKey: z.string().describe(
    'Optional. Immutable. Google Group id whose users are subject to this binding\'s restrictions. See "id" in the [Google Workspace Directory API\'s Group Resource] (https://developers.google.com/admin-sdk/directory/v1/reference/groups#resource). If a group\'s email address/alias is changed, this resource will continue to point at the changed group. This field does not accept group email addresses or aliases. Example: "01d520gv4vjcrht"',
  ).optional(),
  name: z.string().describe(
    'Immutable. Assigned by the server during creation. The last segment has an arbitrary length and has only URI unreserved characters (as defined by [RFC 3986 Section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)). Should not be specified by the client during creation. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N"',
  ).optional(),
  principal: z.object({
    federatedPrincipal: z.string().describe(
      "Immutable. The IAM principal identifier of the federated workforce or workload to assign the policy to. Examples include the following: * Single principal: `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}` * All workloads in a workload identity pool: `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*` * All Workforce Pools in a Google Cloud organization: `principalSet://cloudresourcemanager.googleapis.com/organizations/{organization_id}/type/WorkforcePool` Bindings created for all Workforce Pools in a Google Cloud organization support only `scoped_access_settings` with the `restricted_project` client scope and active `session_settings`. No other configurations are allowed.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Immutable. Service account email used to assign policies to a specific service account. If a service account is subject to multiple policies (e.g., if there is a policy for all service accounts in a project and a policy for the service account), the closest (i.e. the most specific) dry-run policy will be used for the dry-run functionality and the closest enforcement policy will be used for the enforcement.",
    ).optional(),
    serviceAccountProjectNumber: z.string().describe(
      "Immutable. Cloud project number used to assign policies to all service accounts owned by the project.",
    ).optional(),
  }).describe(
    "Optional. Immutable. The principal that is subject to the access policies in this policy binding.",
  ).optional(),
  scopedAccessSettings: z.array(z.object({
    activeSettings: z.object({
      accessLevels: z.array(z.string()).describe(
        'Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted"',
      ).optional(),
      sessionSettings: z.object({
        maxInactivity: z.string().describe(
          "Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps.",
        ).optional(),
        sessionLength: z.string().describe(
          "Optional. The session length. Setting this field to zero allows for sessions that are active indefinitely. Also, setting `session_length_enabled` to `false` disregards session limits, which means that sessions never expire. If `use_oidc_max_age` is `true`, for OIDC apps, the session length will be the minimum of this field and the OIDC `max_age` param. If this field is set to zero, `session_length_enabled` must be set to `false` or left unset.",
        ).optional(),
        sessionLengthEnabled: z.boolean().describe(
          "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite. If `session_length` is set to zero, this field must be set to false.",
        ).optional(),
        sessionReauthMethod: z.enum([
          "SESSION_REAUTH_METHOD_UNSPECIFIED",
          "LOGIN",
          "SECURITY_KEY",
          "PASSWORD",
        ]).describe(
          "Optional. Session method when user's Google Cloud session is up.",
        ).optional(),
        useOidcMaxAge: z.boolean().describe(
          "Optional. Only useful for OIDC apps. When false, the OIDC max_age param, if passed in the authentication request will be ignored. When true, the re-auth period will be the minimum of the session_length field and the max_age OIDC param.",
        ).optional(),
      }).describe(
        "Optional. Session settings applied to user access on a given AccessScope.",
      ).optional(),
    }).describe(
      "Optional. Access settings for this scoped access settings. This field may be empty if dry_run_settings is set.",
    ).optional(),
    dryRunSettings: z.object({
      accessLevels: z.array(z.string()).describe(
        'Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: "accessPolicies/9522/accessLevels/device_trusted"',
      ).optional(),
      sessionSettings: z.object({
        maxInactivity: z.string().describe(
          "Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps.",
        ).optional(),
        sessionLength: z.string().describe(
          "Optional. The session length. Setting this field to zero allows for sessions that are active indefinitely. Also, setting `session_length_enabled` to `false` disregards session limits, which means that sessions never expire. If `use_oidc_max_age` is `true`, for OIDC apps, the session length will be the minimum of this field and the OIDC `max_age` param. If this field is set to zero, `session_length_enabled` must be set to `false` or left unset.",
        ).optional(),
        sessionLengthEnabled: z.boolean().describe(
          "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite. If `session_length` is set to zero, this field must be set to false.",
        ).optional(),
        sessionReauthMethod: z.enum([
          "SESSION_REAUTH_METHOD_UNSPECIFIED",
          "LOGIN",
          "SECURITY_KEY",
          "PASSWORD",
        ]).describe(
          "Optional. Session method when user's Google Cloud session is up.",
        ).optional(),
        useOidcMaxAge: z.boolean().describe(
          "Optional. Only useful for OIDC apps. When false, the OIDC max_age param, if passed in the authentication request will be ignored. When true, the re-auth period will be the minimum of the session_length field and the max_age OIDC param.",
        ).optional(),
      }).describe(
        "Optional. Session settings applied to user access on a given AccessScope.",
      ).optional(),
    }).describe(
      "Optional. Dry-run access settings for this scoped access settings. This field may be empty if active_settings is set.",
    ).optional(),
    scope: z.object({
      clientScope: z.object({
        restrictedClientApplication: z.object({
          clientId: z.unknown().describe(
            "The OAuth client ID of the application.",
          ).optional(),
          name: z.unknown().describe(
            'The name of the application. Example: "Cloud Console"',
          ).optional(),
        }).describe(
          "Optional. The application that is subject to this binding's scope.",
        ).optional(),
        restrictedProject: z.object({
          name: z.unknown().describe(
            "The Google Cloud project resource name. Format: `projects/{project_number}`. Only the project number is supported. Example: `projects/1234567890`",
          ).optional(),
        }).describe(
          "Optional. The Google Cloud project that is subject to this binding's scope.",
        ).optional(),
      }).describe("Optional. Client scope for this access scope.").optional(),
    }).describe(
      "Optional. Application, etc. to which the access settings will be applied to. Implicitly, this is the scoped access settings key; as such, it must be unique and non-empty.",
    ).optional(),
  })).describe(
    "Optional. A list of scoped access settings that set this binding's restrictions on a subset of applications.",
  ).optional(),
  sessionSettings: z.object({
    maxInactivity: z.string().describe(
      "Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps.",
    ).optional(),
    sessionLength: z.string().describe(
      "Optional. The session length. Setting this field to zero allows for sessions that are active indefinitely. Also, setting `session_length_enabled` to `false` disregards session limits, which means that sessions never expire. If `use_oidc_max_age` is `true`, for OIDC apps, the session length will be the minimum of this field and the OIDC `max_age` param. If this field is set to zero, `session_length_enabled` must be set to `false` or left unset.",
    ).optional(),
    sessionLengthEnabled: z.boolean().describe(
      "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite. If `session_length` is set to zero, this field must be set to false.",
    ).optional(),
    sessionReauthMethod: z.enum([
      "SESSION_REAUTH_METHOD_UNSPECIFIED",
      "LOGIN",
      "SECURITY_KEY",
      "PASSWORD",
    ]).describe(
      "Optional. Session method when user's Google Cloud session is up.",
    ).optional(),
    useOidcMaxAge: z.boolean().describe(
      "Optional. Only useful for OIDC apps. When false, the OIDC max_age param, if passed in the authentication request will be ignored. When true, the re-auth period will be the minimum of the session_length field and the max_age OIDC param.",
    ).optional(),
  }).describe(
    "Optional. The Google Cloud session length (GCSL) policy for the group key.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Access Context Manager GcpUserAccessBindings. Registered at `@swamp/gcp/accesscontextmanager/gcpuseraccessbindings`. */
export const model = {
  type: "@swamp/gcp/accesscontextmanager/gcpuseraccessbindings",
  version: "2026.09.04.1",
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
      toVersion: "2026.07.26.1",
      description: "Added: principal. Removed: restrictedClientApplications",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          restrictedClientApplications: _restrictedClientApplications,
          ...rest
        } = old;
        return rest;
      },
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
      toVersion: "2026.08.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Restricts access to Cloud Console and Google Cloud APIs for a set of users us...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a gcpUserAccessBindings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accessLevels"] !== undefined) {
          body["accessLevels"] = g["accessLevels"];
        }
        if (g["dryRunAccessLevels"] !== undefined) {
          body["dryRunAccessLevels"] = g["dryRunAccessLevels"];
        }
        if (g["groupKey"] !== undefined) body["groupKey"] = g["groupKey"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["principal"] !== undefined) body["principal"] = g["principal"];
        if (g["scopedAccessSettings"] !== undefined) {
          body["scopedAccessSettings"] = g["scopedAccessSettings"];
        }
        if (g["sessionSettings"] !== undefined) {
          body["sessionSettings"] = g["sessionSettings"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a gcpUserAccessBindings",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the gcpUserAccessBindings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Update gcpUserAccessBindings attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific gcpUserAccessBindings by name (e.g. one discovered by list)",
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
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["accessLevels"] !== undefined) {
          body["accessLevels"] = g["accessLevels"];
        }
        if (g["dryRunAccessLevels"] !== undefined) {
          body["dryRunAccessLevels"] = g["dryRunAccessLevels"];
        }
        if (g["scopedAccessSettings"] !== undefined) {
          body["scopedAccessSettings"] = g["scopedAccessSettings"];
        }
        if (g["sessionSettings"] !== undefined) {
          body["sessionSettings"] = g["sessionSettings"];
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
      description: "Delete the gcpUserAccessBindings",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the gcpUserAccessBindings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync gcpUserAccessBindings state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific gcpUserAccessBindings by name (e.g. one discovered by list)",
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
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
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
      description: "List gcpUserAccessBindings resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. The literal filter to apply to the results returned. See https://google.aip.dev/160 for more details. Accepts values: * `principal:group_key` * `principal:service_account` OR `principal:service_account_project_number`. If this field is empty or not one of the above, the default value is `"principal:group_key"`.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of items to return. The server may return fewer items. If left blank, the server may return any number of items.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "gcpUserAccessBindings",
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
