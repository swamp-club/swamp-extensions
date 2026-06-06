// Auto-generated extension model for @swamp/gcp/iam/workloadidentitypools-providers-keys
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkloadIdentityPools.Providers.Keys.
 *
 * Represents a public key configuration for your workload identity pool provider. The key can be configured in your identity provider to encrypt the SAML assertions. Google holds the corresponding private key which it uses to decrypt encrypted tokens.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/keys/${shortName}`;
}

const BASE_URL = "https://iam.googleapis.com/";

const GET_CONFIG = {
  "id": "iam.projects.locations.workloadIdentityPools.providers.keys.get",
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
  },
} as const;

const INSERT_CONFIG = {
  "id": "iam.projects.locations.workloadIdentityPools.providers.keys.create",
  "path": "v1/{+parent}/keys",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "workloadIdentityPoolProviderKeyId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "iam.projects.locations.workloadIdentityPools.providers.keys.delete",
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
  "id": "iam.projects.locations.workloadIdentityPools.providers.keys.list",
  "path": "v1/{+parent}/keys",
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
    "showDeleted": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  keyData: z.object({
    format: z.enum(["KEY_FORMAT_UNSPECIFIED", "RSA_X509_PEM"]).describe(
      "Output only. The format of the key.",
    ).optional(),
    key: z.string().describe(
      "Output only. The key data. The format of the key is represented by the format field.",
    ).optional(),
    keySpec: z.enum([
      "KEY_SPEC_UNSPECIFIED",
      "RSA_2048",
      "RSA_3072",
      "RSA_4096",
    ]).describe("Required. The specifications for the key.").optional(),
    notAfterTime: z.string().describe(
      "Output only. Latest timestamp when this key is valid. Attempts to use this key after this time will fail. Only present if the key data represents a X.509 certificate.",
    ).optional(),
    notBeforeTime: z.string().describe(
      "Output only. Earliest timestamp when this key is valid. Attempts to use this key before this time will fail. Only present if the key data represents a X.509 certificate.",
    ).optional(),
  }).describe("Represents a public key data along with its format.").optional(),
  name: z.string().describe("Identifier. The resource name of the key.")
    .optional(),
  use: z.enum(["KEY_USE_UNSPECIFIED", "ENCRYPTION"]).describe(
    "Required. The purpose of the key.",
  ).optional(),
  workloadIdentityPoolProviderKeyId: z.string().describe(
    "Required. The ID to use for the key, which becomes the final component of the resource name. This value should be 4-32 characters, and may contain the characters [a-z0-9-].",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  expireTime: z.string().optional(),
  keyData: z.object({
    format: z.string(),
    key: z.string(),
    keySpec: z.string(),
    notAfterTime: z.string(),
    notBeforeTime: z.string(),
  }).optional(),
  name: z.string(),
  state: z.string().optional(),
  use: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  keyData: z.object({
    format: z.enum(["KEY_FORMAT_UNSPECIFIED", "RSA_X509_PEM"]).describe(
      "Output only. The format of the key.",
    ).optional(),
    key: z.string().describe(
      "Output only. The key data. The format of the key is represented by the format field.",
    ).optional(),
    keySpec: z.enum([
      "KEY_SPEC_UNSPECIFIED",
      "RSA_2048",
      "RSA_3072",
      "RSA_4096",
    ]).describe("Required. The specifications for the key.").optional(),
    notAfterTime: z.string().describe(
      "Output only. Latest timestamp when this key is valid. Attempts to use this key after this time will fail. Only present if the key data represents a X.509 certificate.",
    ).optional(),
    notBeforeTime: z.string().describe(
      "Output only. Earliest timestamp when this key is valid. Attempts to use this key before this time will fail. Only present if the key data represents a X.509 certificate.",
    ).optional(),
  }).describe("Represents a public key data along with its format.").optional(),
  name: z.string().describe("Identifier. The resource name of the key.")
    .optional(),
  use: z.enum(["KEY_USE_UNSPECIFIED", "ENCRYPTION"]).describe(
    "Required. The purpose of the key.",
  ).optional(),
  workloadIdentityPoolProviderKeyId: z.string().describe(
    "Required. The ID to use for the key, which becomes the final component of the resource name. This value should be 4-32 characters, and may contain the characters [a-z0-9-].",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkloadIdentityPools.Providers.Keys. Registered at `@swamp/gcp/iam/workloadidentitypools-providers-keys`. */
export const model = {
  type: "@swamp/gcp/iam/workloadidentitypools-providers-keys",
  version: "2026.06.06.2",
  upgrades: [
    {
      toVersion: "2026.06.06.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a public key configuration for your workload identity pool provide...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a keys",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["keyData"] !== undefined) body["keyData"] = g["keyData"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["use"] !== undefined) body["use"] = g["use"];
        if (g["workloadIdentityPoolProviderKeyId"] !== undefined) {
          body["workloadIdentityPoolProviderKeyId"] =
            g["workloadIdentityPoolProviderKeyId"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    delete: {
      description: "Delete the keys",
      arguments: z.object({
        identifier: z.string().describe("The name of the keys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List keys resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of keys to return. If unspecified, all keys are returned. The maximum value is 10; values above 10 are truncated to 10.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Whether to return soft deleted resources as well.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "workloadIdentityPoolProviderKeys",
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
    undelete: {
      description: "undelete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "iam.projects.locations.workloadIdentityPools.providers.keys.undelete",
            "path": "v1/{+name}:undelete",
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
  },
};
