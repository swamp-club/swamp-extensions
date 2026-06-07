// Auto-generated extension model for @swamp/gcp/discoveryengine/identitymappingstores
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine IdentityMappingStores.
 *
 * Identity Mapping Store which contains Identity Mapping Entries.
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
  return `${parent}/identityMappingStores/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.identityMappingStores.get",
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
  "id": "discoveryengine.projects.locations.identityMappingStores.create",
  "path": "v1/{+parent}/identityMappingStores",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "cmekConfigName": {
      "location": "query",
    },
    "disableCmek": {
      "location": "query",
    },
    "identityMappingStoreId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "discoveryengine.projects.locations.identityMappingStores.delete",
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
  "id": "discoveryengine.projects.locations.identityMappingStores.list",
  "path": "v1/{+parent}/identityMappingStores",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  cmekConfig: z.object({
    isDefault: z.boolean().describe(
      "Output only. The default CmekConfig for the Customer.",
    ).optional(),
    kmsKey: z.string().describe(
      "Required. KMS key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
    ).optional(),
    kmsKeyVersion: z.string().describe(
      "Output only. KMS key version resource name which will be used to encrypt resources `/cryptoKeyVersions/{keyVersion}`.",
    ).optional(),
    lastRotationTimestampMicros: z.string().describe(
      "Output only. The timestamp of the last key rotation.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the CmekConfig of the form `projects/{project}/locations/{location}/cmekConfig` or `projects/{project}/locations/{location}/cmekConfigs/{cmek_config}`.",
    ).optional(),
    notebooklmState: z.enum([
      "NOTEBOOK_LM_STATE_UNSPECIFIED",
      "NOTEBOOK_LM_NOT_READY",
      "NOTEBOOK_LM_READY",
      "NOTEBOOK_LM_NOT_ENABLED",
    ]).describe(
      "Output only. Whether the NotebookLM Corpus is ready to be used.",
    ).optional(),
    singleRegionKeys: z.array(z.object({
      kmsKey: z.string().describe(
        "Required. Single-regional kms key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
      ).optional(),
    })).describe(
      "Optional. Single-regional CMEKs that are required for some VAIS features.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "KEY_ISSUE",
      "DELETING",
      "DELETE_FAILED",
      "UNUSABLE",
      "ACTIVE_ROTATING",
      "DELETED",
      "EXPIRED",
    ]).describe("Output only. The states of the CmekConfig.").optional(),
  }).describe(
    "Configurations used to enable CMEK data encryption with Cloud KMS keys.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Input only. The KMS key to be used to protect this Identity Mapping Store at creation time. Must be set for requests that need to comply with CMEK Org Policy protections. If this field is set and processed successfully, the Identity Mapping Store will be protected by the KMS key, as indicated in the cmek_config field.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The full resource name of the identity mapping store. Format: `projects/{project}/locations/{location}/identityMappingStores/{identity_mapping_store}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  cmekConfigName: z.string().describe(
    "Resource name of the CmekConfig to use for protecting this Identity Mapping Store.",
  ).optional(),
  disableCmek: z.string().describe(
    "Identity Mapping Store without CMEK protections. If a default CmekConfig is set for the project, setting this field will override the default CmekConfig as well.",
  ).optional(),
  identityMappingStoreId: z.string().describe(
    "Required. The ID of the Identity Mapping Store to create. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 63 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  cmekConfig: z.object({
    isDefault: z.boolean(),
    kmsKey: z.string(),
    kmsKeyVersion: z.string(),
    lastRotationTimestampMicros: z.string(),
    name: z.string(),
    notebooklmState: z.string(),
    singleRegionKeys: z.array(z.object({
      kmsKey: z.string(),
    })),
    state: z.string(),
  }).optional(),
  kmsKeyName: z.string().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  cmekConfig: z.object({
    isDefault: z.boolean().describe(
      "Output only. The default CmekConfig for the Customer.",
    ).optional(),
    kmsKey: z.string().describe(
      "Required. KMS key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
    ).optional(),
    kmsKeyVersion: z.string().describe(
      "Output only. KMS key version resource name which will be used to encrypt resources `/cryptoKeyVersions/{keyVersion}`.",
    ).optional(),
    lastRotationTimestampMicros: z.string().describe(
      "Output only. The timestamp of the last key rotation.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the CmekConfig of the form `projects/{project}/locations/{location}/cmekConfig` or `projects/{project}/locations/{location}/cmekConfigs/{cmek_config}`.",
    ).optional(),
    notebooklmState: z.enum([
      "NOTEBOOK_LM_STATE_UNSPECIFIED",
      "NOTEBOOK_LM_NOT_READY",
      "NOTEBOOK_LM_READY",
      "NOTEBOOK_LM_NOT_ENABLED",
    ]).describe(
      "Output only. Whether the NotebookLM Corpus is ready to be used.",
    ).optional(),
    singleRegionKeys: z.array(z.object({
      kmsKey: z.string().describe(
        "Required. Single-regional kms key resource name which will be used to encrypt resources `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{keyId}`.",
      ).optional(),
    })).describe(
      "Optional. Single-regional CMEKs that are required for some VAIS features.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "KEY_ISSUE",
      "DELETING",
      "DELETE_FAILED",
      "UNUSABLE",
      "ACTIVE_ROTATING",
      "DELETED",
      "EXPIRED",
    ]).describe("Output only. The states of the CmekConfig.").optional(),
  }).describe(
    "Configurations used to enable CMEK data encryption with Cloud KMS keys.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Input only. The KMS key to be used to protect this Identity Mapping Store at creation time. Must be set for requests that need to comply with CMEK Org Policy protections. If this field is set and processed successfully, the Identity Mapping Store will be protected by the KMS key, as indicated in the cmek_config field.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The full resource name of the identity mapping store. Format: `projects/{project}/locations/{location}/identityMappingStores/{identity_mapping_store}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  cmekConfigName: z.string().describe(
    "Resource name of the CmekConfig to use for protecting this Identity Mapping Store.",
  ).optional(),
  disableCmek: z.string().describe(
    "Identity Mapping Store without CMEK protections. If a default CmekConfig is set for the project, setting this field will override the default CmekConfig as well.",
  ).optional(),
  identityMappingStoreId: z.string().describe(
    "Required. The ID of the Identity Mapping Store to create. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 63 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Discovery Engine IdentityMappingStores. Registered at `@swamp/gcp/discoveryengine/identitymappingstores`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/identitymappingstores",
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
      toVersion: "2026.05.18.1",
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
        "Identity Mapping Store which contains Identity Mapping Entries.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a identityMappingStores",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["cmekConfig"] !== undefined) body["cmekConfig"] = g["cmekConfig"];
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["cmekConfigName"] !== undefined) {
          body["cmekConfigName"] = g["cmekConfigName"];
        }
        if (g["disableCmek"] !== undefined) {
          body["disableCmek"] = g["disableCmek"];
        }
        if (g["identityMappingStoreId"] !== undefined) {
          body["identityMappingStoreId"] = g["identityMappingStoreId"];
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
      description: "Get a identityMappingStores",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the identityMappingStores",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Delete the identityMappingStores",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the identityMappingStores",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync identityMappingStores state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List identityMappingStores resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of IdentityMappingStores to return. If unspecified, defaults to 100. The maximum allowed value is 1000. Values above 1000 will be coerced to 1000.",
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
          "identityMappingStores",
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
    import_identity_mappings: {
      description: "import identity mappings",
      arguments: z.object({
        inlineSource: z.any().optional(),
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
        params["identityMappingStore"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["inlineSource"] !== undefined) {
          body["inlineSource"] = args["inlineSource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.identityMappingStores.importIdentityMappings",
            "path": "v1/{+identityMappingStore}:importIdentityMappings",
            "httpMethod": "POST",
            "parameterOrder": ["identityMappingStore"],
            "parameters": {
              "identityMappingStore": { "location": "path", "required": true },
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
    list_identity_mappings: {
      description: "list identity mappings",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["identityMappingStore"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.identityMappingStores.listIdentityMappings",
            "path": "v1/{+identityMappingStore}:listIdentityMappings",
            "httpMethod": "GET",
            "parameterOrder": ["identityMappingStore"],
            "parameters": {
              "identityMappingStore": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
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
    purge_identity_mappings: {
      description: "purge identity mappings",
      arguments: z.object({
        filter: z.any().optional(),
        force: z.any().optional(),
        inlineSource: z.any().optional(),
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
        params["identityMappingStore"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["inlineSource"] !== undefined) {
          body["inlineSource"] = args["inlineSource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.identityMappingStores.purgeIdentityMappings",
            "path": "v1/{+identityMappingStore}:purgeIdentityMappings",
            "httpMethod": "POST",
            "parameterOrder": ["identityMappingStore"],
            "parameters": {
              "identityMappingStore": { "location": "path", "required": true },
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
