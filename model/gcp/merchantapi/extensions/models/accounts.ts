// Auto-generated extension model for @swamp/gcp/merchantapi/accounts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.
 *
 * The `Account` message represents a business's account within Merchant Center. It's the primary entity for managing product data, settings, and interactions with Google's services and external providers. Accounts can operate as standalone entities or be part of a advanced account structure. In an advanced account setup the parent account manages multiple sub-accounts. Establishing an account involves configuring attributes like the account name, time zone, and language preferences. The `Account` message is the parent entity for many other resources, for example, `AccountRelationship`, `Homepage`, `BusinessInfo` and so on.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.get",
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
  "id": "merchantapi.accounts.patch",
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

const DELETE_CONFIG = {
  "id": "merchantapi.accounts.delete",
  "path": "accounts/v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "merchantapi.accounts.list",
  "path": "accounts/v1/accounts",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "filter": {
      "location": "query",
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
  accountId: z.string().describe("Output only. The ID of the account.")
    .optional(),
  accountName: z.string().describe(
    'Required. A human-readable name of the account. Don\'t use punctuation, capitalization, or non-alphanumeric symbols such as the "/" or "_" symbols. See [Adding a business name](https://support.google.com/merchants/answer/12159159) for more information.',
  ).optional(),
  adultContent: z.boolean().describe(
    "Optional. Whether this account contains adult content.",
  ).optional(),
  languageCode: z.string().describe(
    "Required. The account's [BCP-47 language code](https://tools.ietf.org/html/bcp47), such as `en-US` or `sr-Latn`.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the account. Format: `accounts/{account}`",
  ).optional(),
  testAccount: z.boolean().describe(
    "Output only. Whether this is a test account.",
  ).optional(),
  timeZone: z.object({
    id: z.string().describe(
      'IANA Time Zone Database time zone. For example "America/New_York".',
    ).optional(),
    version: z.string().describe(
      'Optional. IANA Time Zone Database version number. For example "2019a".',
    ).optional(),
  }).describe(
    "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  accountName: z.string().optional(),
  adultContent: z.boolean().optional(),
  languageCode: z.string().optional(),
  name: z.string(),
  testAccount: z.boolean().optional(),
  timeZone: z.object({
    id: z.string(),
    version: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("Output only. The ID of the account.")
    .optional(),
  accountName: z.string().describe(
    'Required. A human-readable name of the account. Don\'t use punctuation, capitalization, or non-alphanumeric symbols such as the "/" or "_" symbols. See [Adding a business name](https://support.google.com/merchants/answer/12159159) for more information.',
  ).optional(),
  adultContent: z.boolean().describe(
    "Optional. Whether this account contains adult content.",
  ).optional(),
  languageCode: z.string().describe(
    "Required. The account's [BCP-47 language code](https://tools.ietf.org/html/bcp47), such as `en-US` or `sr-Latn`.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the account. Format: `accounts/{account}`",
  ).optional(),
  testAccount: z.boolean().describe(
    "Output only. Whether this is a test account.",
  ).optional(),
  timeZone: z.object({
    id: z.string().describe(
      'IANA Time Zone Database time zone. For example "America/New_York".',
    ).optional(),
    version: z.string().describe(
      'Optional. IANA Time Zone Database version number. For example "2019a".',
    ).optional(),
  }).describe(
    "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Merchant Accounts. Registered at `@swamp/gcp/merchantapi/accounts`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The `Account` message represents a business's account within Merchant Center....",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a accounts",
      arguments: z.object({
        identifier: z.string().describe("The name of the accounts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
      description: "Update accounts attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["accountName"] !== undefined) {
          body["accountName"] = g["accountName"];
        }
        if (g["adultContent"] !== undefined) {
          body["adultContent"] = g["adultContent"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["testAccount"] !== undefined) {
          body["testAccount"] = g["testAccount"];
        }
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
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
    delete: {
      description: "Delete the accounts",
      arguments: z.object({
        identifier: z.string().describe("The name of the accounts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync accounts state from GCP",
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
    list: {
      description: "List accounts resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Returns only accounts that match the [filter](https://developers.google.com/merchant/api/guides/accounts/filter). For more details, see the [filter syntax reference](https://developers.google.com/merchant/api/guides/accounts/filter-syntax).",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of accounts to return. The service may return fewer than this value. If unspecified, at most 250 accounts are returned. The maximum value is 500; values above 500 are coerced to 500.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "accounts",
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
    create_and_configure: {
      description: "create and configure",
      arguments: z.object({
        account: z.any().optional(),
        service: z.any().optional(),
        setAlias: z.any().optional(),
        user: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["account"] !== undefined) body["account"] = args["account"];
        if (args["service"] !== undefined) body["service"] = args["service"];
        if (args["setAlias"] !== undefined) body["setAlias"] = args["setAlias"];
        if (args["user"] !== undefined) body["user"] = args["user"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "merchantapi.accounts.createAndConfigure",
            "path": "accounts/v1/accounts:createAndConfigure",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
    create_test_account: {
      description: "create test account",
      arguments: z.object({
        accountId: z.any().optional(),
        accountName: z.any().optional(),
        adultContent: z.any().optional(),
        languageCode: z.any().optional(),
        name: z.any().optional(),
        testAccount: z.any().optional(),
        timeZone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["accountId"] !== undefined) {
          body["accountId"] = args["accountId"];
        }
        if (args["accountName"] !== undefined) {
          body["accountName"] = args["accountName"];
        }
        if (args["adultContent"] !== undefined) {
          body["adultContent"] = args["adultContent"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["testAccount"] !== undefined) {
          body["testAccount"] = args["testAccount"];
        }
        if (args["timeZone"] !== undefined) body["timeZone"] = args["timeZone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "merchantapi.accounts.createTestAccount",
            "path": "accounts/v1/{+parent}:createTestAccount",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_subaccounts: {
      description: "list subaccounts",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["provider"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "merchantapi.accounts.listSubaccounts",
            "path": "accounts/v1/{+provider}:listSubaccounts",
            "httpMethod": "GET",
            "parameterOrder": ["provider"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "provider": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
