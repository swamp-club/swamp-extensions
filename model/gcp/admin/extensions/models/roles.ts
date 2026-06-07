// Auto-generated extension model for @swamp/gcp/admin/roles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Roles.
 *
 * Retrieves a role.
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

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "directory.roles.get",
  "path": "admin/directory/v1/customer/{customer}/roles/{roleId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customer",
    "roleId",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "roleId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "directory.roles.insert",
  "path": "admin/directory/v1/customer/{customer}/roles",
  "httpMethod": "POST",
  "parameterOrder": [
    "customer",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "directory.roles.update",
  "path": "admin/directory/v1/customer/{customer}/roles/{roleId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "customer",
    "roleId",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "roleId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "directory.roles.delete",
  "path": "admin/directory/v1/customer/{customer}/roles/{roleId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "customer",
    "roleId",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "roleId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.roles.list",
  "path": "admin/directory/v1/customer/{customer}/roles",
  "httpMethod": "GET",
  "parameterOrder": [
    "customer",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  isSuperAdminRole: z.boolean().describe(
    "Returns `true` if the role is a super admin role.",
  ).optional(),
  isSystemRole: z.boolean().describe(
    "Returns `true` if this is a pre-defined system role.",
  ).optional(),
  roleDescription: z.string().describe("A short description of the role.")
    .optional(),
  roleId: z.string().describe("ID of the role.").optional(),
  roleName: z.string().describe("Name of the role."),
  rolePrivileges: z.array(z.object({
    privilegeName: z.string().describe("The name of the privilege.").optional(),
    serviceId: z.string().describe(
      "The obfuscated ID of the service this privilege is for. This value is returned with [`Privileges.list()`](https://developers.google.com/workspace/admin/directory/v1/reference/privileges/list).",
    ).optional(),
  })).describe("The set of privileges that are granted to this role."),
  customer: z.string().describe(
    "Immutable ID of the Google Workspace account.",
  ),
});

const StateSchema = z.object({
  etag: z.string().optional(),
  isSuperAdminRole: z.boolean().optional(),
  isSystemRole: z.boolean().optional(),
  kind: z.string().optional(),
  roleDescription: z.string().optional(),
  roleId: z.string().optional(),
  roleName: z.string().optional(),
  rolePrivileges: z.array(z.object({
    privilegeName: z.string(),
    serviceId: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  isSuperAdminRole: z.boolean().describe(
    "Returns `true` if the role is a super admin role.",
  ).optional(),
  isSystemRole: z.boolean().describe(
    "Returns `true` if this is a pre-defined system role.",
  ).optional(),
  roleDescription: z.string().describe("A short description of the role.")
    .optional(),
  roleId: z.string().describe("ID of the role.").optional(),
  roleName: z.string().describe("Name of the role.").optional(),
  rolePrivileges: z.array(z.object({
    privilegeName: z.string().describe("The name of the privilege.").optional(),
    serviceId: z.string().describe(
      "The obfuscated ID of the service this privilege is for. This value is returned with [`Privileges.list()`](https://developers.google.com/workspace/admin/directory/v1/reference/privileges/list).",
    ).optional(),
  })).describe("The set of privileges that are granted to this role.")
    .optional(),
  customer: z.string().describe("Immutable ID of the Google Workspace account.")
    .optional(),
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

/** Swamp extension model for Google Cloud Admin SDK Roles. Registered at `@swamp/gcp/admin/roles`. */
export const model = {
  type: "@swamp/gcp/admin/roles",
  version: "2026.06.07.1",
  upgrades: [
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
      description: "Retrieves a role.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a roles",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        const body: Record<string, unknown> = {};
        if (g["isSuperAdminRole"] !== undefined) {
          body["isSuperAdminRole"] = g["isSuperAdminRole"];
        }
        if (g["isSystemRole"] !== undefined) {
          body["isSystemRole"] = g["isSystemRole"];
        }
        if (g["roleDescription"] !== undefined) {
          body["roleDescription"] = g["roleDescription"];
        }
        if (g["roleId"] !== undefined) body["roleId"] = g["roleId"];
        if (g["roleName"] !== undefined) body["roleName"] = g["roleName"];
        if (g["rolePrivileges"] !== undefined) {
          body["rolePrivileges"] = g["rolePrivileges"];
        }
        if (g["name"] !== undefined) params["roleId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "customer": String(g["customer"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a roles",
      arguments: z.object({
        identifier: z.string().describe("The name of the roles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["roleId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update roles attributes",
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
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        } else if (existing["customer"]) {
          params["customer"] = String(existing["customer"]);
        }
        params["roleId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["isSuperAdminRole"] !== undefined) {
          body["isSuperAdminRole"] = g["isSuperAdminRole"];
        }
        if (g["isSystemRole"] !== undefined) {
          body["isSystemRole"] = g["isSystemRole"];
        }
        if (g["roleDescription"] !== undefined) {
          body["roleDescription"] = g["roleDescription"];
        }
        if (g["roleName"] !== undefined) body["roleName"] = g["roleName"];
        if (g["rolePrivileges"] !== undefined) {
          body["rolePrivileges"] = g["rolePrivileges"];
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
      description: "Delete the roles",
      arguments: z.object({
        identifier: z.string().describe("The name of the roles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["roleId"] = args.identifier;
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
      description: "Sync roles state from GCP",
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
          if (g["customer"] !== undefined) {
            params["customer"] = String(g["customer"]);
          } else if (existing["customer"]) {
            params["customer"] = String(existing["customer"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["roleId"] = identifier;
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
      description: "List roles resources",
      arguments: z.object({
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
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
  },
};
