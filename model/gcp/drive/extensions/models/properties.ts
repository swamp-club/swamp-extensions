// Auto-generated extension model for @swamp/gcp/drive/properties
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Drive Properties.
 *
 * A key-value pair attached to a file that is either public or private to an application. The following limits apply to file properties: * Maximum of 100 properties total per file * Maximum of 30 private properties per app * Maximum of 30 public properties * Maximum of 124 bytes size limit on (key + value) string in UTF-8 encoding for a single property Some resource methods (such as `properties.update`) require a `propertyKey`. Use the `properties.list` method to retrieve the key for a property.
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

const BASE_URL = "https://www.googleapis.com/drive/v2/";

const GET_CONFIG = {
  "id": "drive.properties.get",
  "path": "files/{fileId}/properties/{propertyKey}",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
    "propertyKey",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "propertyKey": {
      "location": "path",
      "required": true,
    },
    "visibility": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "drive.properties.insert",
  "path": "files/{fileId}/properties",
  "httpMethod": "POST",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "drive.properties.update",
  "path": "files/{fileId}/properties/{propertyKey}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "fileId",
    "propertyKey",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "propertyKey": {
      "location": "path",
      "required": true,
    },
    "visibility": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drive.properties.delete",
  "path": "files/{fileId}/properties/{propertyKey}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "fileId",
    "propertyKey",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "propertyKey": {
      "location": "path",
      "required": true,
    },
    "visibility": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "drive.properties.list",
  "path": "files/{fileId}/properties",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "fileId": {
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
  key: z.string().describe("The key of this property."),
  value: z.string().describe("The value of this property.").optional(),
  visibility: z.string().describe(
    "The visibility of this property. Allowed values are PRIVATE (default) and PUBLIC. Private properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with a OAuth 2 client ID. You cannot use an API key to retrieve private properties.",
  ).optional(),
  fileId: z.string().describe("The ID of the file."),
});

const StateSchema = z.object({
  etag: z.string().optional(),
  key: z.string().optional(),
  kind: z.string().optional(),
  selfLink: z.string().optional(),
  value: z.string().optional(),
  visibility: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  key: z.string().describe("The key of this property.").optional(),
  value: z.string().describe("The value of this property.").optional(),
  visibility: z.string().describe(
    "The visibility of this property. Allowed values are PRIVATE (default) and PUBLIC. Private properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with a OAuth 2 client ID. You cannot use an API key to retrieve private properties.",
  ).optional(),
  fileId: z.string().describe("The ID of the file.").optional(),
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

/** Swamp extension model for Google Cloud Google Drive Properties. Registered at `@swamp/gcp/drive/properties`. */
export const model = {
  type: "@swamp/gcp/drive/properties",
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
      description:
        "A key-value pair attached to a file that is either public or private to an ap...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a properties",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        const body: Record<string, unknown> = {};
        if (g["key"] !== undefined) body["key"] = g["key"];
        if (g["value"] !== undefined) body["value"] = g["value"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
        if (g["name"] !== undefined) params["propertyKey"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "fileId": String(g["fileId"] ?? "") },
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
      description: "Get a properties",
      arguments: z.object({
        identifier: z.string().describe("The name of the properties"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        params["propertyKey"] = args.identifier;
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
      description: "Update properties attributes",
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
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        else if (existing["fileId"]) {
          params["fileId"] = String(existing["fileId"]);
        }
        params["propertyKey"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["key"] !== undefined) body["key"] = g["key"];
        if (g["value"] !== undefined) body["value"] = g["value"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
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
      description: "Delete the properties",
      arguments: z.object({
        identifier: z.string().describe("The name of the properties"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        params["propertyKey"] = args.identifier;
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
      description: "Sync properties state from GCP",
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
          if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
          else if (existing["fileId"]) {
            params["fileId"] = String(existing["fileId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["propertyKey"] = identifier;
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
      description: "List properties resources",
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
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
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
