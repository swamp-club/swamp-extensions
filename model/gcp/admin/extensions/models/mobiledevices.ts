// Auto-generated extension model for @swamp/gcp/admin/mobiledevices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Mobiledevices.
 *
 * Google Workspace Mobile Management includes Android, [Google Sync](https://support.google.com/a/answer/135937), and iOS devices. For more information about common group mobile device API tasks, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-mobile-devices.html).
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
  "id": "directory.mobiledevices.get",
  "path":
    "admin/directory/v1/customer/{customerId}/devices/mobile/{resourceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customerId",
    "resourceId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
    "projection": {
      "location": "query",
    },
    "resourceId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "directory.mobiledevices.delete",
  "path":
    "admin/directory/v1/customer/{customerId}/devices/mobile/{resourceId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "customerId",
    "resourceId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
    "resourceId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.mobiledevices.list",
  "path": "admin/directory/v1/customer/{customerId}/devices/mobile",
  "httpMethod": "GET",
  "parameterOrder": [
    "customerId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projection": {
      "location": "query",
    },
    "query": {
      "location": "query",
    },
    "sortOrder": {
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
  adbStatus: z.boolean().optional(),
  applications: z.array(z.object({
    displayName: z.string(),
    packageName: z.string(),
    permission: z.array(z.string()),
    versionCode: z.number(),
    versionName: z.string(),
  })).optional(),
  basebandVersion: z.string().optional(),
  bootloaderVersion: z.string().optional(),
  brand: z.string().optional(),
  buildNumber: z.string().optional(),
  defaultLanguage: z.string().optional(),
  developerOptionsStatus: z.boolean().optional(),
  deviceCompromisedStatus: z.string().optional(),
  deviceId: z.string().optional(),
  devicePasswordStatus: z.string().optional(),
  email: z.array(z.string()).optional(),
  encryptionStatus: z.string().optional(),
  etag: z.string().optional(),
  firstSync: z.string().optional(),
  hardware: z.string().optional(),
  hardwareId: z.string().optional(),
  imei: z.string().optional(),
  kernelVersion: z.string().optional(),
  kind: z.string().optional(),
  lastSync: z.string().optional(),
  managedAccountIsOnOwnerProfile: z.boolean().optional(),
  manufacturer: z.string().optional(),
  meid: z.string().optional(),
  model: z.string().optional(),
  name: z.array(z.string()).optional(),
  networkOperator: z.string().optional(),
  os: z.string().optional(),
  otherAccountsInfo: z.array(z.string()).optional(),
  privilege: z.string().optional(),
  releaseVersion: z.string().optional(),
  resourceId: z.string().optional(),
  securityPatchLevel: z.string().optional(),
  serialNumber: z.string().optional(),
  status: z.string().optional(),
  supportsWorkProfile: z.boolean().optional(),
  type: z.string().optional(),
  unknownSourcesStatus: z.boolean().optional(),
  userAgent: z.string().optional(),
  wifiMacAddress: z.string().optional(),
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

/** Swamp extension model for Google Cloud Admin SDK Mobiledevices. Registered at `@swamp/gcp/admin/mobiledevices`. */
export const model = {
  type: "@swamp/gcp/admin/mobiledevices",
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
        "Google Workspace Mobile Management includes Android, [Google Sync](https://su...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a mobiledevices",
      arguments: z.object({
        identifier: z.string().describe("The id of the mobiledevices"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        params["resourceId"] = args.identifier;
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
      description: "Delete the mobiledevices",
      arguments: z.object({
        identifier: z.string().describe("The id of the mobiledevices"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        params["resourceId"] = args.identifier;
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
      description: "Sync mobiledevices state from GCP",
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
          if (g["customerId"] !== undefined) {
            params["customerId"] = String(g["customerId"]);
          } else if (existing["customerId"]) {
            params["customerId"] = String(existing["customerId"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["resourceId"] = identifier;
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
      description: "List mobiledevices resources",
      arguments: z.object({
        maxResults: z.number().describe(
          "Maximum number of results to return. Max allowed value is 100.",
        ).optional(),
        orderBy: z.string().describe(
          "Device property to use for sorting results.",
        ).optional(),
        projection: z.string().describe(
          "Restrict information returned to a set of selected fields.",
        ).optional(),
        query: z.string().describe(
          "Search string in the format given at https://developers.google.com/workspace/admin/directory/v1/search-operators",
        ).optional(),
        sortOrder: z.string().describe(
          "Whether to return results in ascending or descending order. Must be used with the `orderBy` parameter.",
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
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["projection"] !== undefined) {
          params["projection"] = String(args["projection"]);
        }
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "mobiledevices",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
    action: {
      description: "action",
      arguments: z.object({
        action: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
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
        params["customerId"] = existing["customerId"]?.toString() ??
          g["customerId"]?.toString() ?? "";
        params["resourceId"] = existing["id"]?.toString() ??
          g["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["action"] !== undefined) body["action"] = args["action"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "directory.mobiledevices.action",
            "path":
              "admin/directory/v1/customer/{customerId}/devices/mobile/{resourceId}/action",
            "httpMethod": "POST",
            "parameterOrder": ["customerId", "resourceId"],
            "parameters": {
              "customerId": { "location": "path", "required": true },
              "resourceId": { "location": "path", "required": true },
            },
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
