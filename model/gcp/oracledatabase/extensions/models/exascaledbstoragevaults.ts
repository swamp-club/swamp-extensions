// Auto-generated extension model for @swamp/gcp/oracledatabase/exascaledbstoragevaults
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Oracle Database@Google Cloud ExascaleDbStorageVaults.
 *
 * ExascaleDbStorageVault represents a storage vault exadb vm cluster resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/ExascaleDbStorageVault/
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
  return `${parent}/exascaleDbStorageVaults/${shortName}`;
}

const BASE_URL = "https://oracledatabase.googleapis.com/";

const GET_CONFIG = {
  "id": "oracledatabase.projects.locations.exascaleDbStorageVaults.get",
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
  "id": "oracledatabase.projects.locations.exascaleDbStorageVaults.create",
  "path": "v1/{+parent}/exascaleDbStorageVaults",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "exascaleDbStorageVaultId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "oracledatabase.projects.locations.exascaleDbStorageVaults.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "oracledatabase.projects.locations.exascaleDbStorageVaults.list",
  "path": "v1/{+parent}/exascaleDbStorageVaults",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  displayName: z.string().describe(
    "Required. The display name for the ExascaleDbStorageVault. The name does not have to be unique within your project. The name must be 1-255 characters long and can only contain alphanumeric characters.",
  ).optional(),
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle ExascaleDbStorageVault is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the ExascaleDbStorageVault.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the ExascaleDbStorageVault. Format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}",
  ).optional(),
  properties: z.object({
    additionalFlashCachePercent: z.number().int().describe(
      "Optional. The size of additional flash cache in percentage of high capacity database storage.",
    ).optional(),
    attachedShapeAttributes: z.array(
      z.enum(["SHAPE_ATTRIBUTE_UNSPECIFIED", "SMART_STORAGE", "BLOCK_STORAGE"]),
    ).describe(
      "Output only. The shape attributes of the VM clusters attached to the ExascaleDbStorageVault.",
    ).optional(),
    availableShapeAttributes: z.array(
      z.enum(["SHAPE_ATTRIBUTE_UNSPECIFIED", "SMART_STORAGE", "BLOCK_STORAGE"]),
    ).describe(
      "Output only. The shape attributes available for the VM clusters to be attached to the ExascaleDbStorageVault.",
    ).optional(),
    description: z.string().describe(
      "Optional. The description of the ExascaleDbStorageVault.",
    ).optional(),
    exascaleDbStorageDetails: z.object({
      availableSizeGbs: z.number().int().describe(
        "Output only. The available storage capacity for the ExascaleDbStorageVault, in gigabytes (GB).",
      ).optional(),
      totalSizeGbs: z.number().int().describe(
        "Required. The total storage allocation for the ExascaleDbStorageVault, in gigabytes (GB).",
      ).optional(),
    }).describe("The storage details of the ExascaleDbStorageVault.")
      .optional(),
    ociUri: z.string().describe(
      "Output only. Deep link to the OCI console to view this resource.",
    ).optional(),
    ocid: z.string().describe(
      "Output only. The OCID for the ExascaleDbStorageVault.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
    ]).describe("Output only. The state of the ExascaleDbStorageVault.")
      .optional(),
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
    vmClusterCount: z.number().int().describe(
      "Output only. The number of VM clusters associated with the ExascaleDbStorageVault.",
    ).optional(),
    vmClusterIds: z.array(z.string()).describe(
      "Output only. The list of VM cluster OCIDs associated with the ExascaleDbStorageVault.",
    ).optional(),
  }).describe("The properties of the ExascaleDbStorageVault. next ID: 12")
    .optional(),
  exascaleDbStorageVaultId: z.string().describe(
    "Required. The ID of the ExascaleDbStorageVault to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  entitlementId: z.string().optional(),
  gcpOracleZone: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  properties: z.object({
    additionalFlashCachePercent: z.number(),
    attachedShapeAttributes: z.array(z.string()),
    availableShapeAttributes: z.array(z.string()),
    description: z.string(),
    exascaleDbStorageDetails: z.object({
      availableSizeGbs: z.number(),
      totalSizeGbs: z.number(),
    }),
    ociUri: z.string(),
    ocid: z.string(),
    state: z.string(),
    timeZone: z.object({
      id: z.string(),
      version: z.string(),
    }),
    vmClusterCount: z.number(),
    vmClusterIds: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  displayName: z.string().describe(
    "Required. The display name for the ExascaleDbStorageVault. The name does not have to be unique within your project. The name must be 1-255 characters long and can only contain alphanumeric characters.",
  ).optional(),
  gcpOracleZone: z.string().describe(
    "Optional. The GCP Oracle zone where Oracle ExascaleDbStorageVault is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels or tags associated with the ExascaleDbStorageVault.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the ExascaleDbStorageVault. Format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault}",
  ).optional(),
  properties: z.object({
    additionalFlashCachePercent: z.number().int().describe(
      "Optional. The size of additional flash cache in percentage of high capacity database storage.",
    ).optional(),
    attachedShapeAttributes: z.array(
      z.enum(["SHAPE_ATTRIBUTE_UNSPECIFIED", "SMART_STORAGE", "BLOCK_STORAGE"]),
    ).describe(
      "Output only. The shape attributes of the VM clusters attached to the ExascaleDbStorageVault.",
    ).optional(),
    availableShapeAttributes: z.array(
      z.enum(["SHAPE_ATTRIBUTE_UNSPECIFIED", "SMART_STORAGE", "BLOCK_STORAGE"]),
    ).describe(
      "Output only. The shape attributes available for the VM clusters to be attached to the ExascaleDbStorageVault.",
    ).optional(),
    description: z.string().describe(
      "Optional. The description of the ExascaleDbStorageVault.",
    ).optional(),
    exascaleDbStorageDetails: z.object({
      availableSizeGbs: z.number().int().describe(
        "Output only. The available storage capacity for the ExascaleDbStorageVault, in gigabytes (GB).",
      ).optional(),
      totalSizeGbs: z.number().int().describe(
        "Required. The total storage allocation for the ExascaleDbStorageVault, in gigabytes (GB).",
      ).optional(),
    }).describe("The storage details of the ExascaleDbStorageVault.")
      .optional(),
    ociUri: z.string().describe(
      "Output only. Deep link to the OCI console to view this resource.",
    ).optional(),
    ocid: z.string().describe(
      "Output only. The OCID for the ExascaleDbStorageVault.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PROVISIONING",
      "AVAILABLE",
      "UPDATING",
      "TERMINATING",
      "TERMINATED",
      "FAILED",
    ]).describe("Output only. The state of the ExascaleDbStorageVault.")
      .optional(),
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
    vmClusterCount: z.number().int().describe(
      "Output only. The number of VM clusters associated with the ExascaleDbStorageVault.",
    ).optional(),
    vmClusterIds: z.array(z.string()).describe(
      "Output only. The list of VM cluster OCIDs associated with the ExascaleDbStorageVault.",
    ).optional(),
  }).describe("The properties of the ExascaleDbStorageVault. next ID: 12")
    .optional(),
  exascaleDbStorageVaultId: z.string().describe(
    "Required. The ID of the ExascaleDbStorageVault to create. This value is restricted to (^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$) and must be a maximum of 63 characters in length. The value must start with a letter and end with a letter or a number.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Oracle Database@Google Cloud ExascaleDbStorageVaults. Registered at `@swamp/gcp/oracledatabase/exascaledbstoragevaults`. */
export const model = {
  type: "@swamp/gcp/oracledatabase/exascaledbstoragevaults",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
        "ExascaleDbStorageVault represents a storage vault exadb vm cluster resource. ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a exascaleDbStorageVaults",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gcpOracleZone"] !== undefined) {
          body["gcpOracleZone"] = g["gcpOracleZone"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["exascaleDbStorageVaultId"] !== undefined) {
          body["exascaleDbStorageVaultId"] = g["exascaleDbStorageVaultId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a exascaleDbStorageVaults",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the exascaleDbStorageVaults",
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
      description: "Delete the exascaleDbStorageVaults",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the exascaleDbStorageVaults",
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
      description: "Sync exascaleDbStorageVaults state from GCP",
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
      description: "List exascaleDbStorageVaults resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. An expression for filtering the results of the request. Filter the list as specified in https://google.aip.dev/160.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. An expression for ordering the results of the request. Order results as specified in https://google.aip.dev/132.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of items to return. If unspecified, at most 50 ExascaleDbStorageVaults will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "exascaleDbStorageVaults",
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
