// Auto-generated extension model for @swamp/gcp/admin/domainaliases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK DomainAliases.
 *
 * Retrieves a domain alias of the customer.
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
  "id": "directory.domainAliases.get",
  "path":
    "admin/directory/v1/customer/{customer}/domainaliases/{domainAliasName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customer",
    "domainAliasName",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "domainAliasName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "directory.domainAliases.insert",
  "path": "admin/directory/v1/customer/{customer}/domainaliases",
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
  "id": "directory.domainAliases.delete",
  "path":
    "admin/directory/v1/customer/{customer}/domainaliases/{domainAliasName}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "customer",
    "domainAliasName",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "domainAliasName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.domainAliases.list",
  "path": "admin/directory/v1/customer/{customer}/domainaliases",
  "httpMethod": "GET",
  "parameterOrder": [
    "customer",
  ],
  "parameters": {
    "customer": {
      "location": "path",
      "required": true,
    },
    "parentDomainName": {
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
  creationTime: z.string().describe(
    "The creation time of the domain alias. (Read-only).",
  ).optional(),
  domainAliasName: z.string().describe("The domain alias name.").optional(),
  parentDomainName: z.string().describe(
    "The parent domain name that the domain alias is associated with. This can either be a primary or secondary domain name within a customer.",
  ).optional(),
  verified: z.boolean().describe(
    "Indicates the verification state of a domain alias. (Read-only)",
  ).optional(),
  customer: z.string().describe(
    "Immutable ID of the Google Workspace account.",
  ),
});

const StateSchema = z.object({
  creationTime: z.string().optional(),
  domainAliasName: z.string().optional(),
  etag: z.string().optional(),
  kind: z.string().optional(),
  parentDomainName: z.string().optional(),
  verified: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  creationTime: z.string().describe(
    "The creation time of the domain alias. (Read-only).",
  ).optional(),
  domainAliasName: z.string().describe("The domain alias name.").optional(),
  parentDomainName: z.string().describe(
    "The parent domain name that the domain alias is associated with. This can either be a primary or secondary domain name within a customer.",
  ).optional(),
  verified: z.boolean().describe(
    "Indicates the verification state of a domain alias. (Read-only)",
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

/** Swamp extension model for Google Cloud Admin SDK DomainAliases. Registered at `@swamp/gcp/admin/domainaliases`. */
export const model = {
  type: "@swamp/gcp/admin/domainaliases",
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
      description: "Retrieves a domain alias of the customer.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a domainAliases",
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
        if (g["domainAliasName"] !== undefined) {
          body["domainAliasName"] = g["domainAliasName"];
        }
        if (g["parentDomainName"] !== undefined) {
          body["parentDomainName"] = g["parentDomainName"];
        }
        if (g["verified"] !== undefined) body["verified"] = g["verified"];
        if (g["name"] !== undefined) {
          params["domainAliasName"] = String(g["name"]);
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
      description: "Get a domainAliases",
      arguments: z.object({
        identifier: z.string().describe("The name of the domainAliases"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["domainAliasName"] = args.identifier;
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
      description: "Delete the domainAliases",
      arguments: z.object({
        identifier: z.string().describe("The name of the domainAliases"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        params["domainAliasName"] = args.identifier;
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
      description: "Sync domainAliases state from GCP",
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
          params["domainAliasName"] = identifier;
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
      description: "List domainAliases resources",
      arguments: z.object({
        parentDomainName: z.string().describe(
          "Name of the parent domain for which domain aliases are to be fetched.",
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
        if (g["customer"] !== undefined) {
          params["customer"] = String(g["customer"]);
        }
        if (args["parentDomainName"] !== undefined) {
          params["parentDomainName"] = String(args["parentDomainName"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "domainAliases",
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
