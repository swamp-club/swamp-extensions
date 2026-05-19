// Auto-generated extension model for @swamp/gcp/dataplex/dataproducts-dataassets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex DataProducts.DataAssets.
 *
 * Represents a data asset resource that can be packaged and shared via a data product.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/dataAssets/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.dataProducts.dataAssets.get",
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
  "id": "dataplex.projects.locations.dataProducts.dataAssets.create",
  "path": "v1/{+parent}/dataAssets",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "dataAssetId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataplex.projects.locations.dataProducts.dataAssets.patch",
  "path": "v1/{+name}",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataplex.projects.locations.dataProducts.dataAssets.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessGroupConfigs: z.record(
    z.string(),
    z.object({
      iamRoles: z.array(z.string()).describe(
        'Optional. IAM roles granted on the resource to this access group. Role name follows https://cloud.google.com/iam/docs/reference/rest/v1/roles.Example: [ "roles/bigquery.dataViewer" ]',
      ).optional(),
    }),
  ).describe(
    'Optional. Access groups configurations for this data asset.The key is DataProduct.AccessGroup.id and the value is AccessGroupConfig.Example: { "analyst": { "iamRoles": ["roles/bigquery.dataViewer"] } } Currently, at most one IAM role is allowed per access group. For providing multiple predefined IAM roles, wrap them in a custom IAM role as per https://cloud.google.com/iam/docs/creating-custom-roles.',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. User-defined labels for the data asset.Example: { "environment": "production", "billing": "marketing-department" }',
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the data asset. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id}",
  ).optional(),
  resource: z.string().describe(
    "Required. Immutable. Full resource name of the cloud resource represented by the data asset. This must follow https://cloud.google.com/iam/docs/full-resource-names. Example: //bigquery.googleapis.com/projects/my_project_123/datasets/dataset_456/tables/table_789 Only BigQuery tables and datasets are currently supported. Data asset creator must have getIamPolicy and setIamPolicy permissions on the resource. Data asset creator must also have resource specific get permission, for instance, bigquery.tables.get for BigQuery tables.",
  ).optional(),
  dataAssetId: z.string().describe(
    "Optional. The ID of the data asset to create.The ID must conform to RFC-1034 and contain only lower-case letters (a-z), numbers (0-9), or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. Characters outside of ASCII are not permitted. Valid format regex: ^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$ If not provided, a system generated ID will be used.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  accessGroupConfigs: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  resource: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessGroupConfigs: z.record(
    z.string(),
    z.object({
      iamRoles: z.array(z.string()).describe(
        'Optional. IAM roles granted on the resource to this access group. Role name follows https://cloud.google.com/iam/docs/reference/rest/v1/roles.Example: [ "roles/bigquery.dataViewer" ]',
      ).optional(),
    }),
  ).describe(
    'Optional. Access groups configurations for this data asset.The key is DataProduct.AccessGroup.id and the value is AccessGroupConfig.Example: { "analyst": { "iamRoles": ["roles/bigquery.dataViewer"] } } Currently, at most one IAM role is allowed per access group. For providing multiple predefined IAM roles, wrap them in a custom IAM role as per https://cloud.google.com/iam/docs/creating-custom-roles.',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. User-defined labels for the data asset.Example: { "environment": "production", "billing": "marketing-department" }',
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the data asset. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id}",
  ).optional(),
  resource: z.string().describe(
    "Required. Immutable. Full resource name of the cloud resource represented by the data asset. This must follow https://cloud.google.com/iam/docs/full-resource-names. Example: //bigquery.googleapis.com/projects/my_project_123/datasets/dataset_456/tables/table_789 Only BigQuery tables and datasets are currently supported. Data asset creator must have getIamPolicy and setIamPolicy permissions on the resource. Data asset creator must also have resource specific get permission, for instance, bigquery.tables.get for BigQuery tables.",
  ).optional(),
  dataAssetId: z.string().describe(
    "Optional. The ID of the data asset to create.The ID must conform to RFC-1034 and contain only lower-case letters (a-z), numbers (0-9), or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. Characters outside of ASCII are not permitted. Valid format regex: ^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$ If not provided, a system generated ID will be used.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataplex DataProducts.DataAssets. Registered at `@swamp/gcp/dataplex/dataproducts-dataassets`. */
export const model = {
  type: "@swamp/gcp/dataplex/dataproducts-dataassets",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a data asset resource that can be packaged and shared via a data p...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dataAssets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["accessGroupConfigs"] !== undefined) {
          body["accessGroupConfigs"] = g["accessGroupConfigs"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["resource"] !== undefined) body["resource"] = g["resource"];
        if (g["dataAssetId"] !== undefined) {
          body["dataAssetId"] = g["dataAssetId"];
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
      description: "Get a dataAssets",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataAssets"),
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
      description: "Update dataAssets attributes",
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
        if (g["accessGroupConfigs"] !== undefined) {
          body["accessGroupConfigs"] = g["accessGroupConfigs"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
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
      description: "Delete the dataAssets",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataAssets"),
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
      description: "Sync dataAssets state from GCP",
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
  },
};
