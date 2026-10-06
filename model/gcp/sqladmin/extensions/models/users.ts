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

// Auto-generated extension model for @swamp/gcp/sqladmin/users
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud SQL Admin Users.
 *
 * A Cloud SQL user resource.
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

const BASE_URL = "https://sqladmin.googleapis.com/";

const GET_CONFIG = {
  "id": "sql.users.get",
  "path": "v1/projects/{project}/instances/{instance}/users/{name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "instance",
    "name",
  ],
  "parameters": {
    "host": {
      "location": "query",
    },
    "instance": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "name": {
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
  "id": "sql.users.insert",
  "path": "v1/projects/{project}/instances/{instance}/users",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "instance",
  ],
  "parameters": {
    "instance": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "sql.users.update",
  "path": "v1/projects/{project}/instances/{instance}/users",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "instance",
  ],
  "parameters": {
    "databaseRoles": {
      "location": "query",
    },
    "host": {
      "location": "query",
    },
    "instance": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "name": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "revokeExistingRoles": {
      "location": "query",
    },
    "revokeExistingServerRoles": {
      "location": "query",
    },
    "serverRoles": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "sql.users.delete",
  "path": "v1/projects/{project}/instances/{instance}/users",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "instance",
  ],
  "parameters": {
    "host": {
      "location": "query",
    },
    "instance": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "name": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "sql.users.list",
  "path": "v1/projects/{project}/instances/{instance}/users",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "instance",
  ],
  "parameters": {
    "instance": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "project": {
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  databaseRoles: z.array(z.string()).describe(
    "Optional. Role memberships of the user",
  ).optional(),
  dualPasswordType: z.enum([
    "DUAL_PASSWORD_TYPE_UNSPECIFIED",
    "NO_MODIFY_DUAL_PASSWORD",
    "NO_DUAL_PASSWORD",
    "DUAL_PASSWORD",
  ]).describe("Dual password status for the user.").optional(),
  host: z.string().describe(
    "Optional. The host from which the user can connect. For `insert` operations, host defaults to an empty string. For `update` operations, host is specified as part of the request URL. The host name cannot be updated after insertion. For a MySQL instance, it's required; for a PostgreSQL or SQL Server instance, it's optional.",
  ).optional(),
  iamEmail: z.string().describe(
    "Optional. The full email for an IAM user. For normal database users, this will not be filled. Only applicable to MySQL database users.",
  ).optional(),
  iamStatus: z.enum(["IAM_STATUS_UNSPECIFIED", "INACTIVE", "ACTIVE"]).describe(
    "Indicates if a group is active or inactive for IAM database authentication.",
  ).optional(),
  instance: z.string().describe(
    "The name of the Cloud SQL instance. This does not include the project ID. Can be omitted for `update` because it is already specified on the URL.",
  ).optional(),
  name: z.string().describe(
    "The name of the user in the Cloud SQL instance. Can be omitted for `update` because it is already specified in the URL.",
  ).optional(),
  password: z.string().describe("The password for the user.").optional(),
  passwordPolicy: z.object({
    allowedFailedAttempts: z.number().int().describe(
      "Number of failed login attempts allowed before user get locked.",
    ).optional(),
    enableFailedAttemptsCheck: z.boolean().describe(
      "If true, failed login attempts check will be enabled.",
    ).optional(),
    enablePasswordVerification: z.boolean().describe(
      "If true, the user must specify the current password before changing the password. This flag is supported only for MySQL.",
    ).optional(),
    passwordExpirationDuration: z.string().describe(
      "Expiration duration after password is updated.",
    ).optional(),
    status: z.object({
      locked: z.boolean().describe(
        "If true, user does not have login privileges.",
      ).optional(),
      passwordExpirationTime: z.string().describe(
        "The expiration time of the current password.",
      ).optional(),
    }).describe("Output only. Read-only password status.").optional(),
  }).describe("User level password validation policy.").optional(),
  project: z.string().describe(
    "The project ID of the project containing the Cloud SQL database. The Google apps domain is prefixed if applicable. Can be omitted for `update` because it is already specified on the URL.",
  ).optional(),
  serverRoles: z.array(z.string()).describe(
    "Optional. The server roles for the SQL Server login.",
  ).optional(),
  sqlserverUserDetails: z.object({
    disabled: z.boolean().describe("Indicates if the user has been disabled.")
      .optional(),
    serverRoles: z.array(z.string()).describe(
      "Indicates the server roles for this user.",
    ).optional(),
  }).describe("Represents a Sql Server user on the Cloud SQL instance.")
    .optional(),
  type: z.enum([
    "BUILT_IN",
    "CLOUD_IAM_USER",
    "CLOUD_IAM_SERVICE_ACCOUNT",
    "CLOUD_IAM_GROUP",
    "CLOUD_IAM_GROUP_USER",
    "CLOUD_IAM_GROUP_SERVICE_ACCOUNT",
    "CLOUD_IAM_WORKFORCE_IDENTITY",
    "ENTRAID_USER",
  ]).describe(
    "The user type. It determines the method to authenticate the user during login. The default is the database's built-in user type.",
  ).optional(),
  location: z.string().describe("Optional. Region of the Cloud SQL instance.")
    .optional(),
  revokeExistingRoles: z.string().describe(
    "Optional. Specifies whether to revoke existing roles that are not present in the `database_roles` field. If `false` or unset, the database roles specified in `database_roles` are added to the user's existing roles.",
  ).optional(),
  revokeExistingServerRoles: z.string().describe(
    "Optional. Specifies whether to revoke existing roles that are not present in the `server_roles` field. If `false` or unset, the server roles specified in `server_roles` are added to the user's existing server roles.",
  ).optional(),
});

const StateSchema = z.object({
  databaseRoles: z.array(z.string()).optional(),
  dualPasswordType: z.string().optional(),
  etag: z.string().optional(),
  host: z.string().optional(),
  iamEmail: z.string().optional(),
  iamStatus: z.string().optional(),
  instance: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  password: z.string().optional(),
  passwordPolicy: z.object({
    allowedFailedAttempts: z.number(),
    enableFailedAttemptsCheck: z.boolean(),
    enablePasswordVerification: z.boolean(),
    passwordExpirationDuration: z.string(),
    status: z.object({
      locked: z.boolean(),
      passwordExpirationTime: z.string(),
    }),
  }).optional(),
  project: z.string().optional(),
  serverRoles: z.array(z.string()).optional(),
  sqlserverUserDetails: z.object({
    disabled: z.boolean(),
    serverRoles: z.array(z.string()),
  }).optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  databaseRoles: z.array(z.string()).describe(
    "Optional. Role memberships of the user",
  ).optional(),
  dualPasswordType: z.enum([
    "DUAL_PASSWORD_TYPE_UNSPECIFIED",
    "NO_MODIFY_DUAL_PASSWORD",
    "NO_DUAL_PASSWORD",
    "DUAL_PASSWORD",
  ]).describe("Dual password status for the user.").optional(),
  host: z.string().describe(
    "Optional. The host from which the user can connect. For `insert` operations, host defaults to an empty string. For `update` operations, host is specified as part of the request URL. The host name cannot be updated after insertion. For a MySQL instance, it's required; for a PostgreSQL or SQL Server instance, it's optional.",
  ).optional(),
  iamEmail: z.string().describe(
    "Optional. The full email for an IAM user. For normal database users, this will not be filled. Only applicable to MySQL database users.",
  ).optional(),
  iamStatus: z.enum(["IAM_STATUS_UNSPECIFIED", "INACTIVE", "ACTIVE"]).describe(
    "Indicates if a group is active or inactive for IAM database authentication.",
  ).optional(),
  instance: z.string().describe(
    "The name of the Cloud SQL instance. This does not include the project ID. Can be omitted for `update` because it is already specified on the URL.",
  ).optional(),
  name: z.string().describe(
    "The name of the user in the Cloud SQL instance. Can be omitted for `update` because it is already specified in the URL.",
  ).optional(),
  password: z.string().describe("The password for the user.").optional(),
  passwordPolicy: z.object({
    allowedFailedAttempts: z.number().int().describe(
      "Number of failed login attempts allowed before user get locked.",
    ).optional(),
    enableFailedAttemptsCheck: z.boolean().describe(
      "If true, failed login attempts check will be enabled.",
    ).optional(),
    enablePasswordVerification: z.boolean().describe(
      "If true, the user must specify the current password before changing the password. This flag is supported only for MySQL.",
    ).optional(),
    passwordExpirationDuration: z.string().describe(
      "Expiration duration after password is updated.",
    ).optional(),
    status: z.object({
      locked: z.boolean().describe(
        "If true, user does not have login privileges.",
      ).optional(),
      passwordExpirationTime: z.string().describe(
        "The expiration time of the current password.",
      ).optional(),
    }).describe("Output only. Read-only password status.").optional(),
  }).describe("User level password validation policy.").optional(),
  project: z.string().describe(
    "The project ID of the project containing the Cloud SQL database. The Google apps domain is prefixed if applicable. Can be omitted for `update` because it is already specified on the URL.",
  ).optional(),
  serverRoles: z.array(z.string()).describe(
    "Optional. The server roles for the SQL Server login.",
  ).optional(),
  sqlserverUserDetails: z.object({
    disabled: z.boolean().describe("Indicates if the user has been disabled.")
      .optional(),
    serverRoles: z.array(z.string()).describe(
      "Indicates the server roles for this user.",
    ).optional(),
  }).describe("Represents a Sql Server user on the Cloud SQL instance.")
    .optional(),
  type: z.enum([
    "BUILT_IN",
    "CLOUD_IAM_USER",
    "CLOUD_IAM_SERVICE_ACCOUNT",
    "CLOUD_IAM_GROUP",
    "CLOUD_IAM_GROUP_USER",
    "CLOUD_IAM_GROUP_SERVICE_ACCOUNT",
    "CLOUD_IAM_WORKFORCE_IDENTITY",
    "ENTRAID_USER",
  ]).describe(
    "The user type. It determines the method to authenticate the user during login. The default is the database's built-in user type.",
  ).optional(),
  location: z.string().describe("Optional. Region of the Cloud SQL instance.")
    .optional(),
  revokeExistingRoles: z.string().describe(
    "Optional. Specifies whether to revoke existing roles that are not present in the `database_roles` field. If `false` or unset, the database roles specified in `database_roles` are added to the user's existing roles.",
  ).optional(),
  revokeExistingServerRoles: z.string().describe(
    "Optional. Specifies whether to revoke existing roles that are not present in the `server_roles` field. If `false` or unset, the server roles specified in `server_roles` are added to the user's existing server roles.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
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

/** Swamp extension model for Google Cloud SQL Admin Users. Registered at `@swamp/gcp/sqladmin/users`. */
export const model = {
  type: "@swamp/gcp/sqladmin/users",
  version: "2026.10.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.10.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
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
      toVersion: "2026.08.12.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.29.1",
      description: "Added: location",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "Added: revokeExistingRoles, revokeExistingServerRoles",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Cloud SQL user resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a users",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        const body: Record<string, unknown> = {};
        if (g["databaseRoles"] !== undefined) {
          body["databaseRoles"] = g["databaseRoles"];
        }
        if (g["dualPasswordType"] !== undefined) {
          body["dualPasswordType"] = g["dualPasswordType"];
        }
        if (g["host"] !== undefined) body["host"] = g["host"];
        if (g["iamEmail"] !== undefined) body["iamEmail"] = g["iamEmail"];
        if (g["iamStatus"] !== undefined) body["iamStatus"] = g["iamStatus"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["password"] !== undefined) body["password"] = g["password"];
        if (g["passwordPolicy"] !== undefined) {
          body["passwordPolicy"] = g["passwordPolicy"];
        }
        if (g["serverRoles"] !== undefined) {
          body["serverRoles"] = g["serverRoles"];
        }
        if (g["sqlserverUserDetails"] !== undefined) {
          body["sqlserverUserDetails"] = g["sqlserverUserDetails"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
              "instance": String(g["instance"] ?? ""),
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
      description: "Get a users",
      arguments: z.object({
        identifier: z.string().describe("The name of the users"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        params["name"] = args.identifier;
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
      description: "Update users attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific users by name (e.g. one discovered by list)",
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
        const resourceId = existing["instance"]?.toString() ??
          g["instance"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["instance"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["databaseRoles"] !== undefined) {
          params["databaseRoles"] = String(g["databaseRoles"]);
        } else if (existing["databaseRoles"] !== undefined) {
          params["databaseRoles"] = String(existing["databaseRoles"]);
        }
        if (g["dualPasswordType"] !== undefined) {
          body["dualPasswordType"] = g["dualPasswordType"];
        }
        if (g["iamEmail"] !== undefined) body["iamEmail"] = g["iamEmail"];
        if (g["iamStatus"] !== undefined) body["iamStatus"] = g["iamStatus"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        else if (existing["name"] !== undefined) {
          params["name"] = String(existing["name"]);
        }
        if (g["password"] !== undefined) body["password"] = g["password"];
        if (g["passwordPolicy"] !== undefined) {
          body["passwordPolicy"] = g["passwordPolicy"];
        }
        if (g["serverRoles"] !== undefined) {
          params["serverRoles"] = String(g["serverRoles"]);
        } else if (existing["serverRoles"] !== undefined) {
          params["serverRoles"] = String(existing["serverRoles"]);
        }
        if (g["sqlserverUserDetails"] !== undefined) {
          body["sqlserverUserDetails"] = g["sqlserverUserDetails"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["revokeExistingRoles"] !== undefined) {
          params["revokeExistingRoles"] = String(g["revokeExistingRoles"]);
        } else if (existing["revokeExistingRoles"] !== undefined) {
          params["revokeExistingRoles"] = String(
            existing["revokeExistingRoles"],
          );
        }
        if (g["revokeExistingServerRoles"] !== undefined) {
          params["revokeExistingServerRoles"] = String(
            g["revokeExistingServerRoles"],
          );
        } else if (existing["revokeExistingServerRoles"] !== undefined) {
          params["revokeExistingServerRoles"] = String(
            existing["revokeExistingServerRoles"],
          );
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
      description: "Delete the users",
      arguments: z.object({
        identifier: z.string().describe("The name of the users"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["instance"] = args.identifier;
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
      description: "Sync users state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific users by name (e.g. one discovered by list)",
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
          if (g["instance"] !== undefined) {
            params["instance"] = String(g["instance"]);
          } else if (existing["instance"]) {
            params["instance"] = String(existing["instance"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
      description: "List users resources",
      arguments: z.object({
        location: z.string().describe(
          "Optional. Region of the Cloud SQL instance.",
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
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        if (args["location"] !== undefined) {
          params["location"] = String(args["location"]);
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
  },
};
