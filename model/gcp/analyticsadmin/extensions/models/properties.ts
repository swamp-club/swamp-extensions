// Auto-generated extension model for @swamp/gcp/analyticsadmin/properties
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Admin Properties.
 *
 * A resource message representing a Google Analytics property.
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

const BASE_URL = "https://analyticsadmin.googleapis.com/";

const GET_CONFIG = {
  "id": "analyticsadmin.properties.get",
  "path": "v1beta/{+name}",
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
  "id": "analyticsadmin.properties.create",
  "path": "v1beta/properties",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const PATCH_CONFIG = {
  "id": "analyticsadmin.properties.patch",
  "path": "v1beta/{+name}",
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
  "id": "analyticsadmin.properties.delete",
  "path": "v1beta/{+name}",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  account: z.string().describe(
    'Immutable. The resource name of the parent account Format: accounts/{account_id} Example: "accounts/123"',
  ).optional(),
  currencyCode: z.string().describe(
    'The currency type used in reports involving monetary values. Format: https://en.wikipedia.org/wiki/ISO_4217 Examples: "USD", "EUR", "JPY"',
  ).optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name for this property. The max allowed display name length is 100 UTF-16 code units.",
  ).optional(),
  industryCategory: z.enum([
    "INDUSTRY_CATEGORY_UNSPECIFIED",
    "AUTOMOTIVE",
    "BUSINESS_AND_INDUSTRIAL_MARKETS",
    "FINANCE",
    "HEALTHCARE",
    "TECHNOLOGY",
    "TRAVEL",
    "OTHER",
    "ARTS_AND_ENTERTAINMENT",
    "BEAUTY_AND_FITNESS",
    "BOOKS_AND_LITERATURE",
    "FOOD_AND_DRINK",
    "GAMES",
    "HOBBIES_AND_LEISURE",
    "HOME_AND_GARDEN",
    "INTERNET_AND_TELECOM",
    "LAW_AND_GOVERNMENT",
    "NEWS",
    "ONLINE_COMMUNITIES",
    "PEOPLE_AND_SOCIETY",
    "PETS_AND_ANIMALS",
    "REAL_ESTATE",
    "REFERENCE",
    "SCIENCE",
    "SPORTS",
    "JOBS_AND_EDUCATION",
    "SHOPPING",
  ]).describe(
    "Industry associated with this property Example: AUTOMOTIVE, FOOD_AND_DRINK",
  ).optional(),
  parent: z.string().describe(
    'Immutable. Resource name of this property\'s logical parent. Note: The Property-Moving UI can be used to change the parent. Format: accounts/{account}, properties/{property} Example: "accounts/100", "properties/101"',
  ).optional(),
  propertyType: z.enum([
    "PROPERTY_TYPE_UNSPECIFIED",
    "PROPERTY_TYPE_ORDINARY",
    "PROPERTY_TYPE_SUBPROPERTY",
    "PROPERTY_TYPE_ROLLUP",
  ]).describe(
    'Immutable. The property type for this Property resource. When creating a property, if the type is "PROPERTY_TYPE_UNSPECIFIED", then "ORDINARY_PROPERTY" will be implied.',
  ).optional(),
  timeZone: z.string().describe(
    'Required. Reporting Time Zone, used as the day boundary for reports, regardless of where the data originates. If the time zone honors DST, Analytics will automatically adjust for the changes. NOTE: Changing the time zone only affects data going forward, and is not applied retroactively. Format: https://www.iana.org/time-zones Example: "America/Los_Angeles"',
  ).optional(),
});

const StateSchema = z.object({
  account: z.string().optional(),
  createTime: z.string().optional(),
  currencyCode: z.string().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  expireTime: z.string().optional(),
  industryCategory: z.string().optional(),
  name: z.string(),
  parent: z.string().optional(),
  propertyType: z.string().optional(),
  serviceLevel: z.string().optional(),
  timeZone: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  account: z.string().describe(
    'Immutable. The resource name of the parent account Format: accounts/{account_id} Example: "accounts/123"',
  ).optional(),
  currencyCode: z.string().describe(
    'The currency type used in reports involving monetary values. Format: https://en.wikipedia.org/wiki/ISO_4217 Examples: "USD", "EUR", "JPY"',
  ).optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name for this property. The max allowed display name length is 100 UTF-16 code units.",
  ).optional(),
  industryCategory: z.enum([
    "INDUSTRY_CATEGORY_UNSPECIFIED",
    "AUTOMOTIVE",
    "BUSINESS_AND_INDUSTRIAL_MARKETS",
    "FINANCE",
    "HEALTHCARE",
    "TECHNOLOGY",
    "TRAVEL",
    "OTHER",
    "ARTS_AND_ENTERTAINMENT",
    "BEAUTY_AND_FITNESS",
    "BOOKS_AND_LITERATURE",
    "FOOD_AND_DRINK",
    "GAMES",
    "HOBBIES_AND_LEISURE",
    "HOME_AND_GARDEN",
    "INTERNET_AND_TELECOM",
    "LAW_AND_GOVERNMENT",
    "NEWS",
    "ONLINE_COMMUNITIES",
    "PEOPLE_AND_SOCIETY",
    "PETS_AND_ANIMALS",
    "REAL_ESTATE",
    "REFERENCE",
    "SCIENCE",
    "SPORTS",
    "JOBS_AND_EDUCATION",
    "SHOPPING",
  ]).describe(
    "Industry associated with this property Example: AUTOMOTIVE, FOOD_AND_DRINK",
  ).optional(),
  parent: z.string().describe(
    'Immutable. Resource name of this property\'s logical parent. Note: The Property-Moving UI can be used to change the parent. Format: accounts/{account}, properties/{property} Example: "accounts/100", "properties/101"',
  ).optional(),
  propertyType: z.enum([
    "PROPERTY_TYPE_UNSPECIFIED",
    "PROPERTY_TYPE_ORDINARY",
    "PROPERTY_TYPE_SUBPROPERTY",
    "PROPERTY_TYPE_ROLLUP",
  ]).describe(
    'Immutable. The property type for this Property resource. When creating a property, if the type is "PROPERTY_TYPE_UNSPECIFIED", then "ORDINARY_PROPERTY" will be implied.',
  ).optional(),
  timeZone: z.string().describe(
    'Required. Reporting Time Zone, used as the day boundary for reports, regardless of where the data originates. If the time zone honors DST, Analytics will automatically adjust for the changes. NOTE: Changing the time zone only affects data going forward, and is not applied retroactively. Format: https://www.iana.org/time-zones Example: "America/Los_Angeles"',
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Admin Properties. Registered at `@swamp/gcp/analyticsadmin/properties`. */
export const model = {
  type: "@swamp/gcp/analyticsadmin/properties",
  version: "2026.05.19.2",
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
      toVersion: "2026.05.18.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A resource message representing a Google Analytics property.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a properties",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["account"] !== undefined) body["account"] = g["account"];
        if (g["currencyCode"] !== undefined) {
          body["currencyCode"] = g["currencyCode"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["industryCategory"] !== undefined) {
          body["industryCategory"] = g["industryCategory"];
        }
        if (g["propertyType"] !== undefined) {
          body["propertyType"] = g["propertyType"];
        }
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a properties",
      arguments: z.object({
        identifier: z.string().describe("The name of the properties"),
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
    update: {
      description: "Update properties attributes",
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
        if (g["currencyCode"] !== undefined) {
          body["currencyCode"] = g["currencyCode"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["industryCategory"] !== undefined) {
          body["industryCategory"] = g["industryCategory"];
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
      description: "Delete the properties",
      arguments: z.object({
        identifier: z.string().describe("The name of the properties"),
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
      description: "Sync properties state from GCP",
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
    acknowledge_user_data_collection: {
      description: "acknowledge user data collection",
      arguments: z.object({
        acknowledgement: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["property"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["acknowledgement"] !== undefined) {
          body["acknowledgement"] = args["acknowledgement"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "analyticsadmin.properties.acknowledgeUserDataCollection",
            "path": "v1beta/{+property}:acknowledgeUserDataCollection",
            "httpMethod": "POST",
            "parameterOrder": ["property"],
            "parameters": {
              "property": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_data_retention_settings: {
      description: "get data retention settings",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "analyticsadmin.properties.getDataRetentionSettings",
            "path": "v1beta/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    run_access_report: {
      description: "run access report",
      arguments: z.object({
        dateRanges: z.any().optional(),
        dimensionFilter: z.any().optional(),
        dimensions: z.any().optional(),
        expandGroups: z.any().optional(),
        includeAllUsers: z.any().optional(),
        limit: z.any().optional(),
        metricFilter: z.any().optional(),
        metrics: z.any().optional(),
        offset: z.any().optional(),
        orderBys: z.any().optional(),
        returnEntityQuota: z.any().optional(),
        timeZone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["entity"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["dateRanges"] !== undefined) {
          body["dateRanges"] = args["dateRanges"];
        }
        if (args["dimensionFilter"] !== undefined) {
          body["dimensionFilter"] = args["dimensionFilter"];
        }
        if (args["dimensions"] !== undefined) {
          body["dimensions"] = args["dimensions"];
        }
        if (args["expandGroups"] !== undefined) {
          body["expandGroups"] = args["expandGroups"];
        }
        if (args["includeAllUsers"] !== undefined) {
          body["includeAllUsers"] = args["includeAllUsers"];
        }
        if (args["limit"] !== undefined) body["limit"] = args["limit"];
        if (args["metricFilter"] !== undefined) {
          body["metricFilter"] = args["metricFilter"];
        }
        if (args["metrics"] !== undefined) body["metrics"] = args["metrics"];
        if (args["offset"] !== undefined) body["offset"] = args["offset"];
        if (args["orderBys"] !== undefined) body["orderBys"] = args["orderBys"];
        if (args["returnEntityQuota"] !== undefined) {
          body["returnEntityQuota"] = args["returnEntityQuota"];
        }
        if (args["timeZone"] !== undefined) body["timeZone"] = args["timeZone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "analyticsadmin.properties.runAccessReport",
            "path": "v1beta/{+entity}:runAccessReport",
            "httpMethod": "POST",
            "parameterOrder": ["entity"],
            "parameters": {
              "entity": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_data_retention_settings: {
      description: "update data retention settings",
      arguments: z.object({
        eventDataRetention: z.any().optional(),
        name: z.any().optional(),
        resetUserDataOnNewActivity: z.any().optional(),
        userDataRetention: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["eventDataRetention"] !== undefined) {
          body["eventDataRetention"] = args["eventDataRetention"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["resetUserDataOnNewActivity"] !== undefined) {
          body["resetUserDataOnNewActivity"] =
            args["resetUserDataOnNewActivity"];
        }
        if (args["userDataRetention"] !== undefined) {
          body["userDataRetention"] = args["userDataRetention"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "analyticsadmin.properties.updateDataRetentionSettings",
            "path": "v1beta/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
