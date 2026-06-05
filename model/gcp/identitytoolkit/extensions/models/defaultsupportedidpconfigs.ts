// Auto-generated extension model for @swamp/gcp/identitytoolkit/defaultsupportedidpconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity Toolkit DefaultSupportedIdpConfigs.
 *
 * Configurations options for authenticating with a the standard set of Identity Toolkit-trusted IDPs.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/defaultSupportedIdpConfigs/${shortName}`;
}

const BASE_URL = "https://identitytoolkit.googleapis.com/";

const GET_CONFIG = {
  "id": "identitytoolkit.projects.defaultSupportedIdpConfigs.get",
  "path": "v2/{+name}",
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
  "id": "identitytoolkit.projects.defaultSupportedIdpConfigs.create",
  "path": "v2/{+parent}/defaultSupportedIdpConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "idpId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "identitytoolkit.projects.defaultSupportedIdpConfigs.patch",
  "path": "v2/{+name}",
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
  "id": "identitytoolkit.projects.defaultSupportedIdpConfigs.delete",
  "path": "v2/{+name}",
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
  "id": "identitytoolkit.projects.defaultSupportedIdpConfigs.list",
  "path": "v2/{+parent}/defaultSupportedIdpConfigs",
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
  appleSignInConfig: z.object({
    bundleIds: z.array(z.string()).describe(
      "A list of Bundle ID's usable by this project",
    ).optional(),
    codeFlowConfig: z.object({
      keyId: z.string().describe("Key ID for the private key.").optional(),
      privateKey: z.string().describe(
        "Private key used for signing the client secret JWT.",
      ).optional(),
      teamId: z.string().describe("Apple Developer Team ID.").optional(),
    }).describe("Additional config for Apple for code flow.").optional(),
  }).describe("Additional config for SignInWithApple.").optional(),
  clientId: z.string().describe("OAuth client ID.").optional(),
  clientSecret: z.string().describe("OAuth client secret.").optional(),
  enabled: z.boolean().describe(
    "True if allows the user to sign in with the provider.",
  ).optional(),
  name: z.string().describe(
    'The name of the DefaultSupportedIdpConfig resource, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com"',
  ).optional(),
  idpId: z.string().describe(
    "The id of the Idp to create a config for. Call ListDefaultSupportedIdps for list of all default supported Idps.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  appleSignInConfig: z.object({
    bundleIds: z.array(z.string()),
    codeFlowConfig: z.object({
      keyId: z.string(),
      privateKey: z.string(),
      teamId: z.string(),
    }),
  }).optional(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  enabled: z.boolean().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  appleSignInConfig: z.object({
    bundleIds: z.array(z.string()).describe(
      "A list of Bundle ID's usable by this project",
    ).optional(),
    codeFlowConfig: z.object({
      keyId: z.string().describe("Key ID for the private key.").optional(),
      privateKey: z.string().describe(
        "Private key used for signing the client secret JWT.",
      ).optional(),
      teamId: z.string().describe("Apple Developer Team ID.").optional(),
    }).describe("Additional config for Apple for code flow.").optional(),
  }).describe("Additional config for SignInWithApple.").optional(),
  clientId: z.string().describe("OAuth client ID.").optional(),
  clientSecret: z.string().describe("OAuth client secret.").optional(),
  enabled: z.boolean().describe(
    "True if allows the user to sign in with the provider.",
  ).optional(),
  name: z.string().describe(
    'The name of the DefaultSupportedIdpConfig resource, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com"',
  ).optional(),
  idpId: z.string().describe(
    "The id of the Idp to create a config for. Call ListDefaultSupportedIdps for list of all default supported Idps.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity Toolkit DefaultSupportedIdpConfigs. Registered at `@swamp/gcp/identitytoolkit/defaultsupportedidpconfigs`. */
export const model = {
  type: "@swamp/gcp/identitytoolkit/defaultsupportedidpconfigs",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configurations options for authenticating with a the standard set of Identity...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a defaultSupportedIdpConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["appleSignInConfig"] !== undefined) {
          body["appleSignInConfig"] = g["appleSignInConfig"];
        }
        if (g["clientId"] !== undefined) body["clientId"] = g["clientId"];
        if (g["clientSecret"] !== undefined) {
          body["clientSecret"] = g["clientSecret"];
        }
        if (g["enabled"] !== undefined) body["enabled"] = g["enabled"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["idpId"] !== undefined) body["idpId"] = g["idpId"];
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
          undefined,
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
      description: "Get a defaultSupportedIdpConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the defaultSupportedIdpConfigs",
        ),
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
    update: {
      description: "Update defaultSupportedIdpConfigs attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["appleSignInConfig"] !== undefined) {
          body["appleSignInConfig"] = g["appleSignInConfig"];
        }
        if (g["clientId"] !== undefined) body["clientId"] = g["clientId"];
        if (g["clientSecret"] !== undefined) {
          body["clientSecret"] = g["clientSecret"];
        }
        if (g["enabled"] !== undefined) body["enabled"] = g["enabled"];
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
      description: "Delete the defaultSupportedIdpConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the defaultSupportedIdpConfigs",
        ),
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
      description: "Sync defaultSupportedIdpConfigs state from GCP",
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
      description: "List defaultSupportedIdpConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe("The maximum number of items to return.")
          .optional(),
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
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "defaultSupportedIdpConfigs",
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
