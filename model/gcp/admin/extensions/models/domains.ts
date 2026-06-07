// Auto-generated extension model for @swamp/gcp/admin/domains
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Domains.
 *
 * Retrieves a domain of the customer.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "directory.domains.get",
  "path": "admin/directory/v1/customer/{customer}/domains/{domainName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customer",
    "domainName",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "domainName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "directory.domains.insert",
  "path": "admin/directory/v1/customer/{customer}/domains",
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

const DELETE_CONFIG = {
  "id": "directory.domains.delete",
  "path": "admin/directory/v1/customer/{customer}/domains/{domainName}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "customer",
    "domainName",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "domainName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.domains.list",
  "path": "admin/directory/v1/customer/{customer}/domains",
  "httpMethod": "GET",
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
  creationTime: z.string().describe(
    "Creation time of the domain. Expressed in [Unix time](https://en.wikipedia.org/wiki/Epoch_time) format. (Read-only).",
  ).optional(),
  domainAliases: z.array(z.object({
    creationTime: z.string().describe(
      "The creation time of the domain alias. (Read-only).",
    ).optional(),
    domainAliasName: z.string().describe("The domain alias name.").optional(),
    etag: z.string().describe("ETag of the resource.").optional(),
    kind: z.string().describe("Kind of resource this is.").optional(),
    parentDomainName: z.string().describe(
      "The parent domain name that the domain alias is associated with. This can either be a primary or secondary domain name within a customer.",
    ).optional(),
    verified: z.boolean().describe(
      "Indicates the verification state of a domain alias. (Read-only)",
    ).optional(),
  })).describe("A list of domain alias objects. (Read-only)").optional(),
  domainName: z.string().describe("The domain name of the customer."),
  isPrimary: z.boolean().describe(
    "Indicates if the domain is a primary domain (Read-only).",
  ).optional(),
  verified: z.boolean().describe(
    "Indicates the verification state of a domain. (Read-only).",
  ).optional(),
  customer: z.string().describe(
    "Immutable ID of the Google Workspace account.",
  ),
});

const StateSchema = z.object({
  creationTime: z.string().optional(),
  domainAliases: z.array(z.object({
    creationTime: z.string(),
    domainAliasName: z.string(),
    etag: z.string(),
    kind: z.string(),
    parentDomainName: z.string(),
    verified: z.boolean(),
  })).optional(),
  domainName: z.string().optional(),
  etag: z.string().optional(),
  isPrimary: z.boolean().optional(),
  kind: z.string().optional(),
  verified: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  creationTime: z.string().describe(
    "Creation time of the domain. Expressed in [Unix time](https://en.wikipedia.org/wiki/Epoch_time) format. (Read-only).",
  ).optional(),
  domainAliases: z.array(z.object({
    creationTime: z.string().describe(
      "The creation time of the domain alias. (Read-only).",
    ).optional(),
    domainAliasName: z.string().describe("The domain alias name.").optional(),
    etag: z.string().describe("ETag of the resource.").optional(),
    kind: z.string().describe("Kind of resource this is.").optional(),
    parentDomainName: z.string().describe(
      "The parent domain name that the domain alias is associated with. This can either be a primary or secondary domain name within a customer.",
    ).optional(),
    verified: z.boolean().describe(
      "Indicates the verification state of a domain alias. (Read-only)",
    ).optional(),
  })).describe("A list of domain alias objects. (Read-only)").optional(),
  domainName: z.string().describe("The domain name of the customer.")
    .optional(),
  isPrimary: z.boolean().describe(
    "Indicates if the domain is a primary domain (Read-only).",
  ).optional(),
  verified: z.boolean().describe(
    "Indicates the verification state of a domain. (Read-only).",
  ).optional(),
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

/** Swamp extension model for Google Cloud Admin SDK Domains. Registered at `@swamp/gcp/admin/domains`. */
export const model = {
  type: "@swamp/gcp/admin/domains",
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
      description: "Retrieves a domain of the customer.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a domains",
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
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["domainAliases"] !== undefined) {
          body["domainAliases"] = g["domainAliases"];
        }
        if (g["domainName"] !== undefined) body["domainName"] = g["domainName"];
        if (g["isPrimary"] !== undefined) body["isPrimary"] = g["isPrimary"];
        if (g["verified"] !== undefined) body["verified"] = g["verified"];
        if (g["name"] !== undefined) params["domainName"] = String(g["name"]);
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
      description: "Get a domains",
      arguments: z.object({
        identifier: z.string().describe("The name of the domains"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["domainName"] = args.identifier;
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
    delete: {
      description: "Delete the domains",
      arguments: z.object({
        identifier: z.string().describe("The name of the domains"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["domainName"] = args.identifier;
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
      description: "Sync domains state from GCP",
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
          params["domainName"] = identifier;
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
      description: "List domains resources",
      arguments: z.object({
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
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "domains",
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
