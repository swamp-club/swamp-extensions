// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-relationships
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.Relationships.
 *
 * The `AccountRelationship` message defines a formal connection between a merchant's account and a service provider's account. This relationship enables the provider to offer specific services to the business, such as product management or campaign management. It specifies the access rights and permissions to the business's data relevant to those services. Establishing an account relationship involves linking the merchant's account with a provider's account. The provider could be another Google account (like Google Ads or Google My Business) or a third-party platform (such as Shopify or WooCommerce).
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/relationships/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.relationships.get",
  "path": "accounts/v1/{+name}",
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

const PATCH_CONFIG = {
  "id": "merchantapi.accounts.relationships.patch",
  "path": "accounts/v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "merchantapi.accounts.relationships.list",
  "path": "accounts/v1/{+parent}/relationships",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  accountIdAlias: z.string().describe(
    "Optional. An optional alias you can assign to this account relationship. This alias acts as a convenient identifier for your own reference and management. It must be unique among all your account relationships with the same provider. For example, you might use `account_id_alias` to assign a friendly name to this relationship for easier identification in your systems.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the account relationship. Format: `accounts/{account}/relationships/{relationship}`. For example, `accounts/123456/relationships/567890`.",
  ).optional(),
  provider: z.string().describe(
    "Immutable. The provider of the service. Either the reference to an account such as `providers/123` or a well-known service provider (one of `providers/GOOGLE_ADS` or `providers/GOOGLE_BUSINESS_PROFILE`).",
  ).optional(),
  providerDisplayName: z.string().describe(
    "Output only. The human-readable display name of the provider account.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountIdAlias: z.string().optional(),
  name: z.string(),
  provider: z.string().optional(),
  providerDisplayName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountIdAlias: z.string().describe(
    "Optional. An optional alias you can assign to this account relationship. This alias acts as a convenient identifier for your own reference and management. It must be unique among all your account relationships with the same provider. For example, you might use `account_id_alias` to assign a friendly name to this relationship for easier identification in your systems.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the account relationship. Format: `accounts/{account}/relationships/{relationship}`. For example, `accounts/123456/relationships/567890`.",
  ).optional(),
  provider: z.string().describe(
    "Immutable. The provider of the service. Either the reference to an account such as `providers/123` or a well-known service provider (one of `providers/GOOGLE_ADS` or `providers/GOOGLE_BUSINESS_PROFILE`).",
  ).optional(),
  providerDisplayName: z.string().describe(
    "Output only. The human-readable display name of the provider account.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Merchant Accounts.Relationships. Registered at `@swamp/gcp/merchantapi/accounts-relationships`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-relationships",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The `AccountRelationship` message defines a formal connection between a merch...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a relationships",
      arguments: z.object({
        identifier: z.string().describe("The name of the relationships"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Update relationships attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["accountIdAlias"] !== undefined) {
          body["accountIdAlias"] = g["accountIdAlias"];
        }
        if (g["provider"] !== undefined) body["provider"] = g["provider"];
        if (g["providerDisplayName"] !== undefined) {
          body["providerDisplayName"] = g["providerDisplayName"];
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
          PATCH_CONFIG,
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
    sync: {
      description: "Sync relationships state from GCP",
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
      description: "List relationships resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of elements to return in the response. Use for paging. If no `page_size` is specified, `100` is used as the default value. The maximum allowed value is `1000`.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "accountRelationships",
          (args.maxPages as number | undefined) ?? 10,
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
