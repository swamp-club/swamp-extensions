// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-lfpstores
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.LfpStores.
 *
 * A store for the merchant. This will be used to match to a store under the Google Business Profile of the target merchant. If a matching store can't be found, the inventories or sales submitted with the store code will not be used.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/lfpStores/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.lfpStores.get",
  "path": "lfp/v1/{+name}",
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
  "id": "merchantapi.accounts.lfpStores.insert",
  "path": "lfp/v1/{+parent}/lfpStores:insert",
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

const DELETE_CONFIG = {
  "id": "merchantapi.accounts.lfpStores.delete",
  "path": "lfp/v1/{+name}",
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
  "id": "merchantapi.accounts.lfpStores.list",
  "path": "lfp/v1/{+parent}/lfpStores",
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
    "targetAccount": {
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
  gcidCategory: z.array(z.string()).describe(
    "Optional. [Google My Business category id](https://support.google.com/business/answer/7249669).",
  ).optional(),
  phoneNumber: z.string().describe(
    "Optional. The store phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format. Example: `+15556767888`",
  ).optional(),
  placeId: z.string().describe(
    "Optional. The [Google Place Id](https://developers.google.com/maps/documentation/places/web-service/place-id#id-overview) of the store location.",
  ).optional(),
  storeAddress: z.string().describe(
    "Required. The street address of the store. Example: 1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA.",
  ).optional(),
  storeCode: z.string().describe(
    "Required. Immutable. A store identifier that is unique for the target merchant.",
  ).optional(),
  storeName: z.string().describe("Optional. The merchant or store name.")
    .optional(),
  targetAccount: z.string().describe(
    "Required. The Merchant Center id of the merchant to submit the store for.",
  ).optional(),
  websiteUri: z.string().describe(
    "Optional. The website URL for the store or merchant.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  gcidCategory: z.array(z.string()).optional(),
  matchingState: z.string().optional(),
  matchingStateHint: z.string().optional(),
  name: z.string(),
  phoneNumber: z.string().optional(),
  placeId: z.string().optional(),
  storeAddress: z.string().optional(),
  storeCode: z.string().optional(),
  storeName: z.string().optional(),
  targetAccount: z.string().optional(),
  websiteUri: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  gcidCategory: z.array(z.string()).describe(
    "Optional. [Google My Business category id](https://support.google.com/business/answer/7249669).",
  ).optional(),
  phoneNumber: z.string().describe(
    "Optional. The store phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format. Example: `+15556767888`",
  ).optional(),
  placeId: z.string().describe(
    "Optional. The [Google Place Id](https://developers.google.com/maps/documentation/places/web-service/place-id#id-overview) of the store location.",
  ).optional(),
  storeAddress: z.string().describe(
    "Required. The street address of the store. Example: 1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA.",
  ).optional(),
  storeCode: z.string().describe(
    "Required. Immutable. A store identifier that is unique for the target merchant.",
  ).optional(),
  storeName: z.string().describe("Optional. The merchant or store name.")
    .optional(),
  targetAccount: z.string().describe(
    "Required. The Merchant Center id of the merchant to submit the store for.",
  ).optional(),
  websiteUri: z.string().describe(
    "Optional. The website URL for the store or merchant.",
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

/** Swamp extension model for Google Cloud Merchant Accounts.LfpStores. Registered at `@swamp/gcp/merchantapi/accounts-lfpstores`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-lfpstores",
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
        "A store for the merchant. This will be used to match to a store under the Goo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a lfpStores",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["gcidCategory"] !== undefined) {
          body["gcidCategory"] = g["gcidCategory"];
        }
        if (g["phoneNumber"] !== undefined) {
          body["phoneNumber"] = g["phoneNumber"];
        }
        if (g["placeId"] !== undefined) body["placeId"] = g["placeId"];
        if (g["storeAddress"] !== undefined) {
          body["storeAddress"] = g["storeAddress"];
        }
        if (g["storeCode"] !== undefined) body["storeCode"] = g["storeCode"];
        if (g["storeName"] !== undefined) body["storeName"] = g["storeName"];
        if (g["targetAccount"] !== undefined) {
          body["targetAccount"] = g["targetAccount"];
        }
        if (g["websiteUri"] !== undefined) body["websiteUri"] = g["websiteUri"];
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
      description: "Get a lfpStores",
      arguments: z.object({
        identifier: z.string().describe("The name of the lfpStores"),
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
      description: "Delete the lfpStores",
      arguments: z.object({
        identifier: z.string().describe("The name of the lfpStores"),
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
      description: "Sync lfpStores state from GCP",
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
      description: "List lfpStores resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of `LfpStore` resources for the given account to return. The service returns fewer than this value if the number of stores for the given account is less than the `pageSize`. The default value is 250. The maximum value is 1000; If a value higher than the maximum is specified, then the `pageSize` will default to the maximum.",
        ).optional(),
        targetAccount: z.string().describe(
          "Required. The Merchant Center id of the merchant to list stores for.",
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
        if (args["targetAccount"] !== undefined) {
          params["targetAccount"] = String(args["targetAccount"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "lfpStores",
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
