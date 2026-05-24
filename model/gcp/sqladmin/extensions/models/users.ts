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
  getProjectId,
  isResourceNotFoundError,
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
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
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
    }).describe("Read-only password status.").optional(),
  }).describe("User level password validation policy.").optional(),
  project: z.string().describe(
    "The project ID of the project containing the Cloud SQL database. The Google apps domain is prefixed if applicable. Can be omitted for `update` because it is already specified on the URL.",
  ).optional(),
  sqlserverUserDetails: z.object({
    disabled: z.boolean().describe("If the user has been disabled").optional(),
    serverRoles: z.array(z.string()).describe("The server roles for this user")
      .optional(),
  }).describe("Represents a Sql Server user on the Cloud SQL instance.")
    .optional(),
  type: z.enum([
    "BUILT_IN",
    "CLOUD_IAM_USER",
    "CLOUD_IAM_SERVICE_ACCOUNT",
    "CLOUD_IAM_GROUP",
    "CLOUD_IAM_GROUP_USER",
    "CLOUD_IAM_GROUP_SERVICE_ACCOUNT",
    "ENTRAID_USER",
  ]).describe(
    "The user type. It determines the method to authenticate the user during login. The default is the database's built-in user type.",
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
  sqlserverUserDetails: z.object({
    disabled: z.boolean(),
    serverRoles: z.array(z.string()),
  }).optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
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
    }).describe("Read-only password status.").optional(),
  }).describe("User level password validation policy.").optional(),
  project: z.string().describe(
    "The project ID of the project containing the Cloud SQL database. The Google apps domain is prefixed if applicable. Can be omitted for `update` because it is already specified on the URL.",
  ).optional(),
  sqlserverUserDetails: z.object({
    disabled: z.boolean().describe("If the user has been disabled").optional(),
    serverRoles: z.array(z.string()).describe("The server roles for this user")
      .optional(),
  }).describe("Represents a Sql Server user on the Cloud SQL instance.")
    .optional(),
  type: z.enum([
    "BUILT_IN",
    "CLOUD_IAM_USER",
    "CLOUD_IAM_SERVICE_ACCOUNT",
    "CLOUD_IAM_GROUP",
    "CLOUD_IAM_GROUP_USER",
    "CLOUD_IAM_GROUP_SERVICE_ACCOUNT",
    "ENTRAID_USER",
  ]).describe(
    "The user type. It determines the method to authenticate the user during login. The default is the database's built-in user type.",
  ).optional(),
});

/** Swamp extension model for Google Cloud SQL Admin Users. Registered at `@swamp/gcp/sqladmin/users`. */
export const model = {
  type: "@swamp/gcp/sqladmin/users",
  version: "2026.05.24.1",
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
        const projectId = await getProjectId();
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
        if (g["sqlserverUserDetails"] !== undefined) {
          body["sqlserverUserDetails"] = g["sqlserverUserDetails"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
              "instance": String(g["instance"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a users",
      arguments: z.object({
        identifier: z.string().describe("The name of the users"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["instance"] !== undefined) {
          params["instance"] = String(g["instance"]);
        }
        params["name"] = args.identifier;
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
      description: "Update users attributes",
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
        params["instance"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["databaseRoles"] !== undefined) {
          body["databaseRoles"] = g["databaseRoles"];
        }
        if (g["dualPasswordType"] !== undefined) {
          body["dualPasswordType"] = g["dualPasswordType"];
        }
        if (g["iamEmail"] !== undefined) body["iamEmail"] = g["iamEmail"];
        if (g["iamStatus"] !== undefined) body["iamStatus"] = g["iamStatus"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["password"] !== undefined) body["password"] = g["password"];
        if (g["passwordPolicy"] !== undefined) {
          body["passwordPolicy"] = g["passwordPolicy"];
        }
        if (g["sqlserverUserDetails"] !== undefined) {
          body["sqlserverUserDetails"] = g["sqlserverUserDetails"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the users",
      arguments: z.object({
        identifier: z.string().describe("The name of the users"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["instance"] = args.identifier;
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
      description: "Sync users state from GCP",
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
