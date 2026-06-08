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
  restrictedClientApplications: z.array(z.object({
    clientId: z.string().describe("The OAuth client ID of the application.")
      .optional(),
    name: z.string().describe(
      'The name of the application. Example: "Cloud Console"',
    ).optional(),
  })).describe(
    "Optional. A list of applications that are subject to this binding's restrictions. If the list is empty, the binding restrictions will universally apply to all applications.",
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
          "Optional. The session length. Setting this field to zero is equal to disabling session. Also can set infinite session by flipping the enabled bit to false below. If use_oidc_max_age is true, for OIDC apps, the session length will be the minimum of this field and OIDC max_age param.",
        ).optional(),
        sessionLengthEnabled: z.boolean().describe(
          "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite.",
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
        "Stores settings related to Google Cloud Session Length including session duration, the type of challenge (i.e. method) they should face when their session expires, and other related settings.",
      ).optional(),
    }).describe(
      "Access settings represent the set of conditions that must be met for access to be granted. At least one of the fields must be set.",
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
          "Optional. The session length. Setting this field to zero is equal to disabling session. Also can set infinite session by flipping the enabled bit to false below. If use_oidc_max_age is true, for OIDC apps, the session length will be the minimum of this field and OIDC max_age param.",
        ).optional(),
        sessionLengthEnabled: z.boolean().describe(
          "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite.",
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
        "Stores settings related to Google Cloud Session Length including session duration, the type of challenge (i.e. method) they should face when their session expires, and other related settings.",
      ).optional(),
    }).describe(
      "Access settings represent the set of conditions that must be met for access to be granted. At least one of the fields must be set.",
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
        }).describe("An application that accesses Google Cloud APIs.")
          .optional(),
      }).describe(
        "Client scope represents the application, etc. subject to this binding's restrictions.",
      ).optional(),
    }).describe(
      "Access scope represents the client scope, etc. to which the settings will be applied to.",
    ).optional(),
  })).describe(
    "Optional. A list of scoped access settings that set this binding's restrictions on a subset of applications. This field cannot be set if restricted_client_applications is set.",
  ).optional(),
  sessionSettings: z.object({
    maxInactivity: z.string().describe(
      "Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps.",
    ).optional(),
    sessionLength: z.string().describe(
      "Optional. The session length. Setting this field to zero is equal to disabling session. Also can set infinite session by flipping the enabled bit to false below. If use_oidc_max_age is true, for OIDC apps, the session length will be the minimum of this field and OIDC max_age param.",
    ).optional(),
    sessionLengthEnabled: z.boolean().describe(
      "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite.",
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
    "Stores settings related to Google Cloud Session Length including session duration, the type of challenge (i.e. method) they should face when their session expires, and other related settings.",
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
  restrictedClientApplications: z.array(z.object({
    clientId: z.string(),
    name: z.string(),
  })).optional(),
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
  restrictedClientApplications: z.array(z.object({
    clientId: z.string().describe("The OAuth client ID of the application.")
      .optional(),
    name: z.string().describe(
      'The name of the application. Example: "Cloud Console"',
    ).optional(),
  })).describe(
    "Optional. A list of applications that are subject to this binding's restrictions. If the list is empty, the binding restrictions will universally apply to all applications.",
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
          "Optional. The session length. Setting this field to zero is equal to disabling session. Also can set infinite session by flipping the enabled bit to false below. If use_oidc_max_age is true, for OIDC apps, the session length will be the minimum of this field and OIDC max_age param.",
        ).optional(),
        sessionLengthEnabled: z.boolean().describe(
          "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite.",
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
        "Stores settings related to Google Cloud Session Length including session duration, the type of challenge (i.e. method) they should face when their session expires, and other related settings.",
      ).optional(),
    }).describe(
      "Access settings represent the set of conditions that must be met for access to be granted. At least one of the fields must be set.",
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
          "Optional. The session length. Setting this field to zero is equal to disabling session. Also can set infinite session by flipping the enabled bit to false below. If use_oidc_max_age is true, for OIDC apps, the session length will be the minimum of this field and OIDC max_age param.",
        ).optional(),
        sessionLengthEnabled: z.boolean().describe(
          "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite.",
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
        "Stores settings related to Google Cloud Session Length including session duration, the type of challenge (i.e. method) they should face when their session expires, and other related settings.",
      ).optional(),
    }).describe(
      "Access settings represent the set of conditions that must be met for access to be granted. At least one of the fields must be set.",
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
        }).describe("An application that accesses Google Cloud APIs.")
          .optional(),
      }).describe(
        "Client scope represents the application, etc. subject to this binding's restrictions.",
      ).optional(),
    }).describe(
      "Access scope represents the client scope, etc. to which the settings will be applied to.",
    ).optional(),
  })).describe(
    "Optional. A list of scoped access settings that set this binding's restrictions on a subset of applications. This field cannot be set if restricted_client_applications is set.",
  ).optional(),
  sessionSettings: z.object({
    maxInactivity: z.string().describe(
      "Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps.",
    ).optional(),
    sessionLength: z.string().describe(
      "Optional. The session length. Setting this field to zero is equal to disabling session. Also can set infinite session by flipping the enabled bit to false below. If use_oidc_max_age is true, for OIDC apps, the session length will be the minimum of this field and OIDC max_age param.",
    ).optional(),
    sessionLengthEnabled: z.boolean().describe(
      "Optional. This field enables or disables Google Cloud session length. When false, all fields set above will be disregarded and the session length is basically infinite.",
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
    "Stores settings related to Google Cloud Session Length including session duration, the type of challenge (i.e. method) they should face when their session expires, and other related settings.",
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

/** Swamp extension model for Google Cloud Access Context Manager GcpUserAccessBindings. Registered at `@swamp/gcp/accesscontextmanager/gcpuseraccessbindings`. */
export const model = {
  type: "@swamp/gcp/accesscontextmanager/gcpuseraccessbindings",
  version: "2026.06.08.1",
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
        if (g["restrictedClientApplications"] !== undefined) {
          body["restrictedClientApplications"] =
            g["restrictedClientApplications"];
        }
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
      description: "Get a gcpUserAccessBindings",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the gcpUserAccessBindings",
        ),
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
      description: "Update gcpUserAccessBindings attributes",
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
        if (g["accessLevels"] !== undefined) {
          body["accessLevels"] = g["accessLevels"];
        }
        if (g["dryRunAccessLevels"] !== undefined) {
          body["dryRunAccessLevels"] = g["dryRunAccessLevels"];
        }
        if (g["restrictedClientApplications"] !== undefined) {
          body["restrictedClientApplications"] =
            g["restrictedClientApplications"];
        }
        if (g["scopedAccessSettings"] !== undefined) {
          body["scopedAccessSettings"] = g["scopedAccessSettings"];
        }
        if (g["sessionSettings"] !== undefined) {
          body["sessionSettings"] = g["sessionSettings"];
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
      description: "Delete the gcpUserAccessBindings",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the gcpUserAccessBindings",
        ),
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
      description: "Sync gcpUserAccessBindings state from GCP",
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
      description: "List gcpUserAccessBindings resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Maximum number of items to return. The server may return fewer items. If left blank, the server may return any number of items.",
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
