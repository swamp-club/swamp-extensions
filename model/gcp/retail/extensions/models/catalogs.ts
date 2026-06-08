// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/retail/catalogs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI Search for commerce Catalogs.
 *
 * The catalog configuration.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://retail.googleapis.com/";

const PATCH_CONFIG = {
  "id": "retail.projects.locations.catalogs.patch",
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

const LIST_CONFIG = {
  "id": "retail.projects.locations.catalogs.list",
  "path": "v2/{+parent}/catalogs",
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
  displayName: z.string().describe(
    "Required. Immutable. The catalog display name. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  name: z.string().describe(
    "Required. Immutable. The fully qualified resource name of the catalog.",
  ).optional(),
  productLevelConfig: z.object({
    ingestionProductType: z.string().describe(
      "The type of Products allowed to be ingested into the catalog. Acceptable values are: * `primary` (default): You can ingest Products of all types. When ingesting a Product, its type will default to Product.Type.PRIMARY if unset. * `variant` (incompatible with Retail Search): You can only ingest Product.Type.VARIANT Products. This means Product.primary_product_id cannot be empty. If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. If this field is `variant` and merchant_center_product_id_field is `itemGroupId`, an INVALID_ARGUMENT error is returned. See [Product levels](https://cloud.google.com/retail/docs/catalog#product-levels) for more details.",
    ).optional(),
    merchantCenterProductIdField: z.string().describe(
      "Which field of [Merchant Center Product](/bigquery-transfer/docs/merchant-center-products-schema) should be imported as Product.id. Acceptable values are: * `offerId` (default): Import `offerId` as the product ID. * `itemGroupId`: Import `itemGroupId` as the product ID. Notice that Retail API will choose one item from the ones with the same `itemGroupId`, and use it to represent the item group. If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. If this field is `itemGroupId` and ingestion_product_type is `variant`, an INVALID_ARGUMENT error is returned. See [Product levels](https://cloud.google.com/retail/docs/catalog#product-levels) for more details.",
    ).optional(),
  }).describe(
    "Configures what level the product should be uploaded with regards to how users will be send events and how predictions will be made.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  displayName: z.string().optional(),
  name: z.string(),
  productLevelConfig: z.object({
    ingestionProductType: z.string(),
    merchantCenterProductIdField: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  displayName: z.string().describe(
    "Required. Immutable. The catalog display name. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  name: z.string().describe(
    "Required. Immutable. The fully qualified resource name of the catalog.",
  ).optional(),
  productLevelConfig: z.object({
    ingestionProductType: z.string().describe(
      "The type of Products allowed to be ingested into the catalog. Acceptable values are: * `primary` (default): You can ingest Products of all types. When ingesting a Product, its type will default to Product.Type.PRIMARY if unset. * `variant` (incompatible with Retail Search): You can only ingest Product.Type.VARIANT Products. This means Product.primary_product_id cannot be empty. If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. If this field is `variant` and merchant_center_product_id_field is `itemGroupId`, an INVALID_ARGUMENT error is returned. See [Product levels](https://cloud.google.com/retail/docs/catalog#product-levels) for more details.",
    ).optional(),
    merchantCenterProductIdField: z.string().describe(
      "Which field of [Merchant Center Product](/bigquery-transfer/docs/merchant-center-products-schema) should be imported as Product.id. Acceptable values are: * `offerId` (default): Import `offerId` as the product ID. * `itemGroupId`: Import `itemGroupId` as the product ID. Notice that Retail API will choose one item from the ones with the same `itemGroupId`, and use it to represent the item group. If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. If this field is `itemGroupId` and ingestion_product_type is `variant`, an INVALID_ARGUMENT error is returned. See [Product levels](https://cloud.google.com/retail/docs/catalog#product-levels) for more details.",
    ).optional(),
  }).describe(
    "Configures what level the product should be uploaded with regards to how users will be send events and how predictions will be made.",
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

/** Swamp extension model for Google Cloud Vertex AI Search for commerce Catalogs. Registered at `@swamp/gcp/retail/catalogs`. */
export const model = {
  type: "@swamp/gcp/retail/catalogs",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The catalog configuration.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a catalogs",
      arguments: z.object({
        identifier: z.string().describe("The name of the catalogs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    update: {
      description: "Update catalogs attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["productLevelConfig"] !== undefined) {
          body["productLevelConfig"] = g["productLevelConfig"];
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
          undefined,
          undefined,
          credentials,
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
      description: "Sync catalogs state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List catalogs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of Catalogs to return. If unspecified, defaults to 50. The maximum allowed value is 1000. Values above 1000 will be coerced to 1000. If this field is negative, an INVALID_ARGUMENT is returned.",
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
          "catalogs",
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
    complete_query: {
      description: "complete query",
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
        params["catalog"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.completeQuery",
            "path": "v2/{+catalog}:completeQuery",
            "httpMethod": "GET",
            "parameterOrder": ["catalog"],
            "parameters": {
              "catalog": { "location": "path", "required": true },
              "dataset": { "location": "query" },
              "deviceType": { "location": "query" },
              "enableAttributeSuggestions": { "location": "query" },
              "entity": { "location": "query" },
              "languageCodes": { "location": "query" },
              "maxSuggestions": { "location": "query" },
              "query": { "location": "query" },
              "visitorId": { "location": "query" },
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
    export_analytics_metrics: {
      description: "export analytics metrics",
      arguments: z.object({
        filter: z.any().optional(),
        outputConfig: z.any().optional(),
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
        params["catalog"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["outputConfig"] !== undefined) {
          body["outputConfig"] = args["outputConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.exportAnalyticsMetrics",
            "path": "v2/{+catalog}:exportAnalyticsMetrics",
            "httpMethod": "POST",
            "parameterOrder": ["catalog"],
            "parameters": {
              "catalog": { "location": "path", "required": true },
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
    get_attributes_config: {
      description: "get attributes config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.getAttributesConfig",
            "path": "v2/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_completion_config: {
      description: "get completion config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.getCompletionConfig",
            "path": "v2/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_conversational_search_customization_config: {
      description: "get conversational search customization config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "retail.projects.locations.catalogs.getConversationalSearchCustomizationConfig",
            "path": "v2/{+name}/conversationalSearchCustomizationConfig",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    get_default_branch: {
      description: "get default branch",
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
        params["catalog"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.getDefaultBranch",
            "path": "v2/{+catalog}:getDefaultBranch",
            "httpMethod": "GET",
            "parameterOrder": ["catalog"],
            "parameters": {
              "catalog": { "location": "path", "required": true },
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
    get_generative_question_feature: {
      description: "get generative question feature",
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
        params["catalog"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "retail.projects.locations.catalogs.getGenerativeQuestionFeature",
            "path": "v2/{+catalog}/generativeQuestionFeature",
            "httpMethod": "GET",
            "parameterOrder": ["catalog"],
            "parameters": {
              "catalog": { "location": "path", "required": true },
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
    set_default_branch: {
      description: "set default branch",
      arguments: z.object({
        branchId: z.any().optional(),
        force: z.any().optional(),
        note: z.any().optional(),
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
        params["catalog"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["branchId"] !== undefined) body["branchId"] = args["branchId"];
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["note"] !== undefined) body["note"] = args["note"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.setDefaultBranch",
            "path": "v2/{+catalog}:setDefaultBranch",
            "httpMethod": "POST",
            "parameterOrder": ["catalog"],
            "parameters": {
              "catalog": { "location": "path", "required": true },
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
    update_attributes_config: {
      description: "update attributes config",
      arguments: z.object({
        attributeConfigLevel: z.any().optional(),
        catalogAttributes: z.any().optional(),
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["attributeConfigLevel"] !== undefined) {
          body["attributeConfigLevel"] = args["attributeConfigLevel"];
        }
        if (args["catalogAttributes"] !== undefined) {
          body["catalogAttributes"] = args["catalogAttributes"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.updateAttributesConfig",
            "path": "v2/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
    update_completion_config: {
      description: "update completion config",
      arguments: z.object({
        allowlistInputConfig: z.any().optional(),
        autoLearning: z.any().optional(),
        denylistInputConfig: z.any().optional(),
        lastAllowlistImportOperation: z.any().optional(),
        lastDenylistImportOperation: z.any().optional(),
        lastSuggestionsImportOperation: z.any().optional(),
        matchingOrder: z.any().optional(),
        maxSuggestions: z.any().optional(),
        minPrefixLength: z.any().optional(),
        name: z.any().optional(),
        suggestionsInputConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["allowlistInputConfig"] !== undefined) {
          body["allowlistInputConfig"] = args["allowlistInputConfig"];
        }
        if (args["autoLearning"] !== undefined) {
          body["autoLearning"] = args["autoLearning"];
        }
        if (args["denylistInputConfig"] !== undefined) {
          body["denylistInputConfig"] = args["denylistInputConfig"];
        }
        if (args["lastAllowlistImportOperation"] !== undefined) {
          body["lastAllowlistImportOperation"] =
            args["lastAllowlistImportOperation"];
        }
        if (args["lastDenylistImportOperation"] !== undefined) {
          body["lastDenylistImportOperation"] =
            args["lastDenylistImportOperation"];
        }
        if (args["lastSuggestionsImportOperation"] !== undefined) {
          body["lastSuggestionsImportOperation"] =
            args["lastSuggestionsImportOperation"];
        }
        if (args["matchingOrder"] !== undefined) {
          body["matchingOrder"] = args["matchingOrder"];
        }
        if (args["maxSuggestions"] !== undefined) {
          body["maxSuggestions"] = args["maxSuggestions"];
        }
        if (args["minPrefixLength"] !== undefined) {
          body["minPrefixLength"] = args["minPrefixLength"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["suggestionsInputConfig"] !== undefined) {
          body["suggestionsInputConfig"] = args["suggestionsInputConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.updateCompletionConfig",
            "path": "v2/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
    update_conversational_search_customization_config: {
      description: "update conversational search customization config",
      arguments: z.object({
        catalog: z.any().optional(),
        intentClassificationConfig: z.any().optional(),
        retailerDisplayName: z.any().optional(),
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
        params["catalog"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["catalog"] !== undefined) body["catalog"] = args["catalog"];
        if (args["intentClassificationConfig"] !== undefined) {
          body["intentClassificationConfig"] =
            args["intentClassificationConfig"];
        }
        if (args["retailerDisplayName"] !== undefined) {
          body["retailerDisplayName"] = args["retailerDisplayName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "retail.projects.locations.catalogs.updateConversationalSearchCustomizationConfig",
            "path": "v2/{+catalog}/conversationalSearchCustomizationConfig",
            "httpMethod": "PATCH",
            "parameterOrder": ["catalog"],
            "parameters": {
              "catalog": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
    update_generative_question: {
      description: "update generative question",
      arguments: z.object({
        allowedInConversation: z.any().optional(),
        catalog: z.any().optional(),
        exampleValues: z.any().optional(),
        facet: z.any().optional(),
        finalQuestion: z.any().optional(),
        frequency: z.any().optional(),
        generatedQuestion: z.any().optional(),
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
        params["catalog"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["allowedInConversation"] !== undefined) {
          body["allowedInConversation"] = args["allowedInConversation"];
        }
        if (args["catalog"] !== undefined) body["catalog"] = args["catalog"];
        if (args["exampleValues"] !== undefined) {
          body["exampleValues"] = args["exampleValues"];
        }
        if (args["facet"] !== undefined) body["facet"] = args["facet"];
        if (args["finalQuestion"] !== undefined) {
          body["finalQuestion"] = args["finalQuestion"];
        }
        if (args["frequency"] !== undefined) {
          body["frequency"] = args["frequency"];
        }
        if (args["generatedQuestion"] !== undefined) {
          body["generatedQuestion"] = args["generatedQuestion"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.updateGenerativeQuestion",
            "path": "v2/{+catalog}/generativeQuestion",
            "httpMethod": "PATCH",
            "parameterOrder": ["catalog"],
            "parameters": {
              "catalog": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
    update_generative_question_feature: {
      description: "update generative question feature",
      arguments: z.object({
        catalog: z.any().optional(),
        featureEnabled: z.any().optional(),
        minimumProducts: z.any().optional(),
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
        params["catalog"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["catalog"] !== undefined) body["catalog"] = args["catalog"];
        if (args["featureEnabled"] !== undefined) {
          body["featureEnabled"] = args["featureEnabled"];
        }
        if (args["minimumProducts"] !== undefined) {
          body["minimumProducts"] = args["minimumProducts"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "retail.projects.locations.catalogs.updateGenerativeQuestionFeature",
            "path": "v2/{+catalog}/generativeQuestionFeature",
            "httpMethod": "PATCH",
            "parameterOrder": ["catalog"],
            "parameters": {
              "catalog": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
