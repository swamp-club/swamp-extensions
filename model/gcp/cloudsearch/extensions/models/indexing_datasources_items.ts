// Auto-generated extension model for @swamp/gcp/cloudsearch/indexing-datasources-items
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Search Indexing.Datasources.Items.
 *
 * Represents a single object that is an item in the search index, such as a file, folder, or a database record.
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

const BASE_URL = "https://cloudsearch.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudsearch.indexing.datasources.items.get",
  "path": "v1/indexing/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "connectorName": {
      "location": "query",
    },
    "debugOptions.enableDebugging": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "cloudsearch.indexing.datasources.items.delete",
  "path": "v1/indexing/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "connectorName": {
      "location": "query",
    },
    "debugOptions.enableDebugging": {
      "location": "query",
    },
    "mode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "version": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudsearch.indexing.datasources.items.list",
  "path": "v1/indexing/{+name}/items",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "brief": {
      "location": "query",
    },
    "connectorName": {
      "location": "query",
    },
    "debugOptions.enableDebugging": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
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
});

const StateSchema = z.object({
  acl: z.object({
    aclInheritanceType: z.string(),
    deniedReaders: z.array(z.object({
      groupResourceName: z.string(),
      gsuitePrincipal: z.object({
        gsuiteDomain: z.boolean(),
        gsuiteGroupEmail: z.string(),
        gsuiteUserEmail: z.string(),
      }),
      userResourceName: z.string(),
    })),
    inheritAclFrom: z.string(),
    owners: z.array(z.object({
      groupResourceName: z.string(),
      gsuitePrincipal: z.object({
        gsuiteDomain: z.boolean(),
        gsuiteGroupEmail: z.string(),
        gsuiteUserEmail: z.string(),
      }),
      userResourceName: z.string(),
    })),
    readers: z.array(z.object({
      groupResourceName: z.string(),
      gsuitePrincipal: z.object({
        gsuiteDomain: z.boolean(),
        gsuiteGroupEmail: z.string(),
        gsuiteUserEmail: z.string(),
      }),
      userResourceName: z.string(),
    })),
  }).optional(),
  content: z.object({
    contentDataRef: z.object({
      name: z.string(),
    }),
    contentFormat: z.string(),
    hash: z.string(),
    inlineContent: z.string(),
  }).optional(),
  itemType: z.string().optional(),
  metadata: z.object({
    containerName: z.string(),
    contentLanguage: z.string(),
    contextAttributes: z.array(z.object({
      name: z.string(),
      values: z.array(z.string()),
    })),
    createTime: z.string(),
    hash: z.string(),
    interactions: z.array(z.object({
      interactionTime: z.string(),
      principal: z.object({
        groupResourceName: z.string(),
        gsuitePrincipal: z.object({
          gsuiteDomain: z.unknown(),
          gsuiteGroupEmail: z.unknown(),
          gsuiteUserEmail: z.unknown(),
        }),
        userResourceName: z.string(),
      }),
      type: z.string(),
    })),
    keywords: z.array(z.string()),
    mimeType: z.string(),
    objectType: z.string(),
    searchQualityMetadata: z.object({
      quality: z.number(),
    }),
    sourceRepositoryUrl: z.string(),
    title: z.string(),
    updateTime: z.string(),
  }).optional(),
  name: z.string(),
  payload: z.string().optional(),
  queue: z.string().optional(),
  status: z.object({
    code: z.string(),
    processingErrors: z.array(z.object({
      code: z.string(),
      errorMessage: z.string(),
      fieldViolations: z.array(z.object({
        description: z.unknown(),
        field: z.unknown(),
      })),
    })),
    repositoryErrors: z.array(z.object({
      errorMessage: z.string(),
      httpStatusCode: z.number(),
      type: z.string(),
    })),
  }).optional(),
  structuredData: z.object({
    hash: z.string(),
    object: z.object({
      properties: z.array(z.object({
        booleanValue: z.boolean(),
        dateValues: z.object({
          values: z.unknown(),
        }),
        doubleValues: z.object({
          values: z.unknown(),
        }),
        enumValues: z.object({
          values: z.unknown(),
        }),
        htmlValues: z.object({
          values: z.unknown(),
        }),
        integerValues: z.object({
          values: z.unknown(),
        }),
        name: z.string(),
        objectValues: z.object({
          values: z.unknown(),
        }),
        textValues: z.object({
          values: z.unknown(),
        }),
        timestampValues: z.object({
          values: z.unknown(),
        }),
      })),
    }),
  }).optional(),
  version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

/** Swamp extension model for Google Cloud Search Indexing.Datasources.Items. Registered at `@swamp/gcp/cloudsearch/indexing-datasources-items`. */
export const model = {
  type: "@swamp/gcp/cloudsearch/indexing-datasources-items",
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
        "Represents a single object that is an item in the search index, such as a fil...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a items",
      arguments: z.object({
        identifier: z.string().describe("The name of the items"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Delete the items",
      arguments: z.object({
        identifier: z.string().describe("The name of the items"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync items state from GCP",
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
      description: "List items resources",
      arguments: z.object({
        brief: z.boolean().describe(
          "When set to true, the indexing system only populates the following fields: name, version, queue. metadata.hash, metadata.title, metadata.sourceRepositoryURL, metadata.objectType, metadata.createTime, metadata.updateTime, metadata.contentLanguage, metadata.mimeType, structured_data.hash, content.hash, itemType, itemStatus.code, itemStatus.processingError.code, itemStatus.repositoryError.type, If this value is false, then all the fields are populated in Item.",
        ).optional(),
        connectorName: z.string().describe(
          "The name of connector making this call. Format: datasources/{source_id}/connectors/{ID}",
        ).optional(),
        debugOptions_enableDebugging: z.boolean().describe(
          "If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field.",
        ).optional(),
        pageSize: z.number().describe(
          "Maximum number of items to fetch in a request. The max value is 1000 when brief is true. The max value is 10 if brief is false. The default value is 10",
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
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        if (args["brief"] !== undefined) {
          params["brief"] = String(args["brief"]);
        }
        if (args["connectorName"] !== undefined) {
          params["connectorName"] = String(args["connectorName"]);
        }
        if (args["debugOptions_enableDebugging"] !== undefined) {
          params["debugOptions.enableDebugging"] = String(
            args["debugOptions_enableDebugging"],
          );
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
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
    index: {
      description: "index",
      arguments: z.object({
        connectorName: z.any().optional(),
        debugOptions: z.any().optional(),
        indexItemOptions: z.any().optional(),
        item: z.any().optional(),
        mode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["connectorName"] !== undefined) {
          body["connectorName"] = args["connectorName"];
        }
        if (args["debugOptions"] !== undefined) {
          body["debugOptions"] = args["debugOptions"];
        }
        if (args["indexItemOptions"] !== undefined) {
          body["indexItemOptions"] = args["indexItemOptions"];
        }
        if (args["item"] !== undefined) body["item"] = args["item"];
        if (args["mode"] !== undefined) body["mode"] = args["mode"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudsearch.indexing.datasources.items.index",
            "path": "v1/indexing/{+name}:index",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    poll: {
      description: "poll",
      arguments: z.object({
        connectorName: z.any().optional(),
        debugOptions: z.any().optional(),
        limit: z.any().optional(),
        queue: z.any().optional(),
        statusCodes: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["connectorName"] !== undefined) {
          body["connectorName"] = args["connectorName"];
        }
        if (args["debugOptions"] !== undefined) {
          body["debugOptions"] = args["debugOptions"];
        }
        if (args["limit"] !== undefined) body["limit"] = args["limit"];
        if (args["queue"] !== undefined) body["queue"] = args["queue"];
        if (args["statusCodes"] !== undefined) {
          body["statusCodes"] = args["statusCodes"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudsearch.indexing.datasources.items.poll",
            "path": "v1/indexing/{+name}/items:poll",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    push: {
      description: "push",
      arguments: z.object({
        connectorName: z.any().optional(),
        debugOptions: z.any().optional(),
        item: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["connectorName"] !== undefined) {
          body["connectorName"] = args["connectorName"];
        }
        if (args["debugOptions"] !== undefined) {
          body["debugOptions"] = args["debugOptions"];
        }
        if (args["item"] !== undefined) body["item"] = args["item"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudsearch.indexing.datasources.items.push",
            "path": "v1/indexing/{+name}:push",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    unreserve: {
      description: "unreserve",
      arguments: z.object({
        connectorName: z.any().optional(),
        debugOptions: z.any().optional(),
        queue: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["connectorName"] !== undefined) {
          body["connectorName"] = args["connectorName"];
        }
        if (args["debugOptions"] !== undefined) {
          body["debugOptions"] = args["debugOptions"];
        }
        if (args["queue"] !== undefined) body["queue"] = args["queue"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudsearch.indexing.datasources.items.unreserve",
            "path": "v1/indexing/{+name}/items:unreserve",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    upload: {
      description: "upload",
      arguments: z.object({
        connectorName: z.any().optional(),
        debugOptions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["connectorName"] !== undefined) {
          body["connectorName"] = args["connectorName"];
        }
        if (args["debugOptions"] !== undefined) {
          body["debugOptions"] = args["debugOptions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudsearch.indexing.datasources.items.upload",
            "path": "v1/indexing/{+name}:upload",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
