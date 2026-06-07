// Auto-generated extension model for @swamp/gcp/storage/folders
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage JSON Folders.
 *
 * A folder. Only available in buckets with hierarchical namespace enabled.
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

const BASE_URL = "https://storage.googleapis.com/storage/v1/";

const GET_CONFIG = {
  "id": "storage.folders.get",
  "path": "b/{bucket}/folders/{folder}",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
    "folder",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "folder": {
      "location": "path",
      "required": true,
    },
    "ifMetagenerationMatch": {
      "location": "query",
    },
    "ifMetagenerationNotMatch": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "storage.folders.insert",
  "path": "b/{bucket}/folders",
  "httpMethod": "POST",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "recursive": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "storage.folders.delete",
  "path": "b/{bucket}/folders/{folder}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "bucket",
    "folder",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "folder": {
      "location": "path",
      "required": true,
    },
    "ifMetagenerationMatch": {
      "location": "query",
    },
    "ifMetagenerationNotMatch": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "storage.folders.list",
  "path": "b/{bucket}/folders",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "delimiter": {
      "location": "query",
    },
    "endOffset": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "prefix": {
      "location": "query",
    },
    "startOffset": {
      "location": "query",
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
  bucket: z.string().describe("The name of the bucket containing this folder.")
    .optional(),
  createTime: z.string().describe(
    "The creation time of the folder in RFC 3339 format.",
  ).optional(),
  id: z.string().describe(
    "The ID of the folder, including the bucket name, folder name.",
  ).optional(),
  metageneration: z.string().describe(
    "The version of the metadata for this folder. Used for preconditions and for detecting changes in metadata.",
  ).optional(),
  name: z.string().describe(
    "The name of the folder. Required if not specified by URL parameter.",
  ).optional(),
  pendingRenameInfo: z.object({
    operationId: z.string().describe("The ID of the rename folder operation.")
      .optional(),
  }).describe(
    "Only present if the folder is part of an ongoing rename folder operation. Contains information which can be used to query the operation status.",
  ).optional(),
  updateTime: z.string().describe(
    "The modification time of the folder metadata in RFC 3339 format.",
  ).optional(),
  recursive: z.string().describe(
    "If true, any parent folder which doesn't exist will be created automatically.",
  ).optional(),
});

const StateSchema = z.object({
  bucket: z.string().optional(),
  createTime: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  metageneration: z.string().optional(),
  name: z.string(),
  pendingRenameInfo: z.object({
    operationId: z.string(),
  }).optional(),
  selfLink: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  bucket: z.string().describe("The name of the bucket containing this folder.")
    .optional(),
  createTime: z.string().describe(
    "The creation time of the folder in RFC 3339 format.",
  ).optional(),
  id: z.string().describe(
    "The ID of the folder, including the bucket name, folder name.",
  ).optional(),
  metageneration: z.string().describe(
    "The version of the metadata for this folder. Used for preconditions and for detecting changes in metadata.",
  ).optional(),
  name: z.string().describe(
    "The name of the folder. Required if not specified by URL parameter.",
  ).optional(),
  pendingRenameInfo: z.object({
    operationId: z.string().describe("The ID of the rename folder operation.")
      .optional(),
  }).describe(
    "Only present if the folder is part of an ongoing rename folder operation. Contains information which can be used to query the operation status.",
  ).optional(),
  updateTime: z.string().describe(
    "The modification time of the folder metadata in RFC 3339 format.",
  ).optional(),
  recursive: z.string().describe(
    "If true, any parent folder which doesn't exist will be created automatically.",
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

/** Swamp extension model for Google Cloud Storage JSON Folders. Registered at `@swamp/gcp/storage/folders`. */
export const model = {
  type: "@swamp/gcp/storage/folders",
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
      toVersion: "2026.05.22.1",
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
        "A folder. Only available in buckets with hierarchical namespace enabled.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a folders",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["metageneration"] !== undefined) {
          body["metageneration"] = g["metageneration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pendingRenameInfo"] !== undefined) {
          body["pendingRenameInfo"] = g["pendingRenameInfo"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["recursive"] !== undefined) body["recursive"] = g["recursive"];
        if (g["name"] !== undefined) params["folder"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "bucket": String(g["bucket"] ?? "") },
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
      description: "Get a folders",
      arguments: z.object({
        identifier: z.string().describe("The name of the folders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        params["folder"] = args.identifier;
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
    delete: {
      description: "Delete the folders",
      arguments: z.object({
        identifier: z.string().describe("The name of the folders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        params["folder"] = args.identifier;
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
      description: "Sync folders state from GCP",
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
          if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
          else if (existing["bucket"]) {
            params["bucket"] = String(existing["bucket"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["folder"] = identifier;
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
      description: "List folders resources",
      arguments: z.object({
        delimiter: z.string().describe(
          "Returns results in a directory-like mode. The only supported value is '/'. If set, items will only contain folders that either exactly match the prefix, or are one level below the prefix.",
        ).optional(),
        endOffset: z.string().describe(
          "Filter results to folders whose names are lexicographically before endOffset. If startOffset is also set, the folders listed will have names between startOffset (inclusive) and endOffset (exclusive).",
        ).optional(),
        pageSize: z.number().describe(
          "Maximum number of items to return in a single page of responses.",
        ).optional(),
        prefix: z.string().describe(
          "Filter results to folders whose paths begin with this prefix. If set, the value must either be an empty string or end with a '/'.",
        ).optional(),
        startOffset: z.string().describe(
          "Filter results to folders whose names are lexicographically equal to or after startOffset. If endOffset is also set, the folders listed will have names between startOffset (inclusive) and endOffset (exclusive).",
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
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (args["delimiter"] !== undefined) {
          params["delimiter"] = String(args["delimiter"]);
        }
        if (args["endOffset"] !== undefined) {
          params["endOffset"] = String(args["endOffset"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["prefix"] !== undefined) {
          params["prefix"] = String(args["prefix"]);
        }
        if (args["startOffset"] !== undefined) {
          params["startOffset"] = String(args["startOffset"]);
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
    rename: {
      description: "rename",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
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
        params["sourceFolder"] = existing["sourceFolder"]?.toString() ??
          g["sourceFolder"]?.toString() ?? "";
        params["destinationFolder"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.folders.rename",
            "path":
              "b/{bucket}/folders/{sourceFolder}/renameTo/folders/{destinationFolder}",
            "httpMethod": "POST",
            "parameterOrder": ["bucket", "sourceFolder", "destinationFolder"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "destinationFolder": { "location": "path", "required": true },
              "ifSourceMetagenerationMatch": { "location": "query" },
              "ifSourceMetagenerationNotMatch": { "location": "query" },
              "sourceFolder": { "location": "path", "required": true },
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
  },
};
