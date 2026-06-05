// Auto-generated extension model for @swamp/gcp/iam/serviceaccounts-keys
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity and Access Management (IAM) ServiceAccounts.Keys.
 *
 * Represents a service account key. A service account has two sets of key-pairs: user-managed, and system-managed. User-managed key-pairs can be created and deleted by users. Users are responsible for rotating these keys periodically to ensure security of their service accounts. Users retain the private key of these key-pairs, and Google retains ONLY the public key. System-managed keys are automatically rotated by Google, and are used for signing for a maximum of two weeks. The rotation process is probabilistic, and usage of the new key will gradually ramp up and down over the key's lifetime. If you cache the public key set for a service account, we recommend that you update the cache every 15 minutes. User-managed keys can be added and removed at any time, so it is important to update the cache frequently. For Google-managed keys, Google will publish a key at least 6 hours before it is first used for signing and will keep publishing it for at least 6 hours after it was last used for signing. Public keys for all service accounts are also published at the OAuth2 Service Account API.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://iam.googleapis.com/";

const GET_CONFIG = {
  "id": "iam.projects.serviceAccounts.keys.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "publicKeyType": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "iam.projects.serviceAccounts.keys.create",
  "path": "v1/{+name}/keys",
  "httpMethod": "POST",
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

const DELETE_CONFIG = {
  "id": "iam.projects.serviceAccounts.keys.delete",
  "path": "v1/{+name}",
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
  "id": "iam.projects.serviceAccounts.keys.list",
  "path": "v1/{+name}/keys",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "keyTypes": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  keyAlgorithm: z.enum([
    "KEY_ALG_UNSPECIFIED",
    "KEY_ALG_RSA_1024",
    "KEY_ALG_RSA_2048",
  ]).describe(
    "Which type of key and algorithm to use for the key. The default is currently a 2K RSA key. However this may change in the future.",
  ).optional(),
  privateKeyType: z.enum([
    "TYPE_UNSPECIFIED",
    "TYPE_PKCS12_FILE",
    "TYPE_GOOGLE_CREDENTIALS_FILE",
  ]).describe(
    "The output format of the private key. The default value is `TYPE_GOOGLE_CREDENTIALS_FILE`, which is the Google Credentials File format.",
  ).optional(),
  name: z.string().describe(
    "Required. The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error.",
  ),
});

const StateSchema = z.object({
  disableReason: z.string().optional(),
  disabled: z.boolean().optional(),
  extendedStatus: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
  keyAlgorithm: z.string().optional(),
  keyOrigin: z.string().optional(),
  keyType: z.string().optional(),
  name: z.string(),
  privateKeyData: z.string().optional(),
  privateKeyType: z.string().optional(),
  publicKeyData: z.string().optional(),
  validAfterTime: z.string().optional(),
  validBeforeTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  keyAlgorithm: z.enum([
    "KEY_ALG_UNSPECIFIED",
    "KEY_ALG_RSA_1024",
    "KEY_ALG_RSA_2048",
  ]).describe(
    "Which type of key and algorithm to use for the key. The default is currently a 2K RSA key. However this may change in the future.",
  ).optional(),
  privateKeyType: z.enum([
    "TYPE_UNSPECIFIED",
    "TYPE_PKCS12_FILE",
    "TYPE_GOOGLE_CREDENTIALS_FILE",
  ]).describe(
    "The output format of the private key. The default value is `TYPE_GOOGLE_CREDENTIALS_FILE`, which is the Google Credentials File format.",
  ).optional(),
  name: z.string().describe(
    "Required. The resource name of the service account. Use one of the following formats: * `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` * `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: * `projects/-/serviceAccounts/{EMAIL_ADDRESS}` * `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity and Access Management (IAM) ServiceAccounts.Keys. Registered at `@swamp/gcp/iam/serviceaccounts-keys`. */
export const model = {
  type: "@swamp/gcp/iam/serviceaccounts-keys",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a service account key. A service account has two sets of key-pairs...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a keys",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (g["keyAlgorithm"] !== undefined) {
          body["keyAlgorithm"] = g["keyAlgorithm"];
        }
        if (g["privateKeyType"] !== undefined) {
          body["privateKeyType"] = g["privateKeyType"];
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
            listParams: { "name": String(g["name"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a keys",
      arguments: z.object({
        identifier: z.string().describe("The name of the keys"),
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
    delete: {
      description: "Delete the keys",
      arguments: z.object({
        identifier: z.string().describe("The name of the keys"),
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
      description: "Sync keys state from GCP",
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
      description: "List keys resources",
      arguments: z.object({
        keyTypes: z.string().describe(
          "Filters the types of keys the user wants to include in the list response. Duplicate key types are not allowed. If no key type is provided, all keys are returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        if (args["keyTypes"] !== undefined) {
          params["keyTypes"] = String(args["keyTypes"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "keys",
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
    disable: {
      description: "disable",
      arguments: z.object({
        extendedStatusMessage: z.any().optional(),
        serviceAccountKeyDisableReason: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["extendedStatusMessage"] !== undefined) {
          body["extendedStatusMessage"] = args["extendedStatusMessage"];
        }
        if (args["serviceAccountKeyDisableReason"] !== undefined) {
          body["serviceAccountKeyDisableReason"] =
            args["serviceAccountKeyDisableReason"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "iam.projects.serviceAccounts.keys.disable",
            "path": "v1/{+name}:disable",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    enable: {
      description: "enable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "iam.projects.serviceAccounts.keys.enable",
            "path": "v1/{+name}:enable",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    upload: {
      description: "upload",
      arguments: z.object({
        publicKeyData: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["publicKeyData"] !== undefined) {
          body["publicKeyData"] = args["publicKeyData"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "iam.projects.serviceAccounts.keys.upload",
            "path": "v1/{+name}/keys:upload",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
