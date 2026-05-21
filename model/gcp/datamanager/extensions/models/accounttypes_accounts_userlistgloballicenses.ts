// Auto-generated extension model for @swamp/gcp/datamanager/accounttypes-accounts-userlistgloballicenses
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Data Manager AccountTypes.Accounts.UserListGlobalLicenses.
 *
 * A user list global license. This feature is only available to data partners.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/userListGlobalLicenses/${shortName}`;
}

const BASE_URL = "https://datamanager.googleapis.com/";

const GET_CONFIG = {
  "id": "datamanager.accountTypes.accounts.userListGlobalLicenses.get",
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
  "id": "datamanager.accountTypes.accounts.userListGlobalLicenses.create",
  "path": "v1/{+parent}/userListGlobalLicenses",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "datamanager.accountTypes.accounts.userListGlobalLicenses.patch",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "datamanager.accountTypes.accounts.userListGlobalLicenses.list",
  "path": "v1/{+parent}/userListGlobalLicenses",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
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
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  licenseType: z.enum([
    "USER_LIST_GLOBAL_LICENSE_TYPE_UNSPECIFIED",
    "USER_LIST_GLOBAL_LICENSE_TYPE_RESELLER",
    "USER_LIST_GLOBAL_LICENSE_TYPE_DATA_MART_SELL_SIDE",
    "USER_LIST_GLOBAL_LICENSE_TYPE_DATA_MART_BUY_SIDE",
  ]).describe(
    "Immutable. Product type of client customer which the user list is being licensed to.",
  ).optional(),
  metrics: z.object({
    clickCount: z.string().describe(
      "Output only. The number of clicks for the user list license.",
    ).optional(),
    endDate: z.string().describe(
      "Output only. The end date (inclusive) of the metrics in the format YYYYMMDD. For example, 20260102 represents January 2, 2026. If `start_date` is used in the filter, `end_date` is also required. If neither `start_date` nor `end_date` are included in the filter, the UserListLicenseMetrics fields will not be populated in the response.",
    ).optional(),
    impressionCount: z.string().describe(
      "Output only. The number of impressions for the user list license.",
    ).optional(),
    revenueUsdMicros: z.string().describe(
      "Output only. The revenue for the user list license in USD micros.",
    ).optional(),
    startDate: z.string().describe(
      "Output only. The start date (inclusive) of the metrics in the format YYYYMMDD. For example, 20260102 represents January 2, 2026. If `end_date` is used in the filter, `start_date` is also required. If neither `start_date` nor `end_date` are included in the filter, the UserListLicenseMetrics fields will not be populated in the response.",
    ).optional(),
  }).describe("Metrics related to a user list license.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the user list global license.",
  ).optional(),
  pricing: z.object({
    buyerApprovalState: z.enum([
      "USER_LIST_PRICING_BUYER_APPROVAL_STATE_UNSPECIFIED",
      "PENDING",
      "APPROVED",
      "REJECTED",
    ]).describe(
      "Output only. The buyer approval state of this pricing. This field is read-only.",
    ).optional(),
    costMicros: z.string().describe(
      "Optional. The cost associated with the model, in micro units (10^-6), in the currency specified by the currency_code field. For example, 2000000 means $2 if `currency_code` is `USD`.",
    ).optional(),
    costType: z.enum([
      "USER_LIST_PRICING_COST_TYPE_UNSPECIFIED",
      "CPC",
      "CPM",
      "MEDIA_SHARE",
    ]).describe(
      "Immutable. The cost type of this pricing. Can be set only in the `create` operation. Can't be updated for an existing license.",
    ).optional(),
    currencyCode: z.string().describe(
      "Optional. The currency in which cost and max_cost is specified. Must be a three-letter currency code defined in ISO 4217.",
    ).optional(),
    endTime: z.string().describe("Optional. End time of the pricing.")
      .optional(),
    maxCostMicros: z.string().describe(
      "Optional. The maximum CPM a commerce audience can be charged when the MEDIA_SHARE cost type is used. The value is in micro units (10^-6) and in the currency specified by the currency_code field. For example, 2000000 means $2 if `currency_code` is `USD`. This is only relevant when cost_type is MEDIA_SHARE. When cost_type is not MEDIA_SHARE, and this field is set, a MAX_COST_NOT_ALLOWED error will be returned. If not set or set to`0`, there is no cap.",
    ).optional(),
    pricingActive: z.boolean().describe(
      "Output only. Whether this pricing is active.",
    ).optional(),
    pricingId: z.string().describe("Output only. The ID of this pricing.")
      .optional(),
    startTime: z.string().describe("Output only. Start time of the pricing.")
      .optional(),
  }).describe("A user list license pricing.").optional(),
  status: z.enum([
    "USER_LIST_LICENSE_STATUS_UNSPECIFIED",
    "USER_LIST_LICENSE_STATUS_ENABLED",
    "USER_LIST_LICENSE_STATUS_DISABLED",
  ]).describe(
    "Optional. Status of UserListGlobalLicense - ENABLED or DISABLED.",
  ).optional(),
  userListId: z.string().describe(
    "Immutable. ID of the user list being licensed.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  historicalPricings: z.array(z.object({
    buyerApprovalState: z.string(),
    costMicros: z.string(),
    costType: z.string(),
    currencyCode: z.string(),
    endTime: z.string(),
    maxCostMicros: z.string(),
    pricingActive: z.boolean(),
    pricingId: z.string(),
    startTime: z.string(),
  })).optional(),
  licenseType: z.string().optional(),
  metrics: z.object({
    clickCount: z.string(),
    endDate: z.string(),
    impressionCount: z.string(),
    revenueUsdMicros: z.string(),
    startDate: z.string(),
  }).optional(),
  name: z.string(),
  pricing: z.object({
    buyerApprovalState: z.string(),
    costMicros: z.string(),
    costType: z.string(),
    currencyCode: z.string(),
    endTime: z.string(),
    maxCostMicros: z.string(),
    pricingActive: z.boolean(),
    pricingId: z.string(),
    startTime: z.string(),
  }).optional(),
  status: z.string().optional(),
  userListDisplayName: z.string().optional(),
  userListId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  licenseType: z.enum([
    "USER_LIST_GLOBAL_LICENSE_TYPE_UNSPECIFIED",
    "USER_LIST_GLOBAL_LICENSE_TYPE_RESELLER",
    "USER_LIST_GLOBAL_LICENSE_TYPE_DATA_MART_SELL_SIDE",
    "USER_LIST_GLOBAL_LICENSE_TYPE_DATA_MART_BUY_SIDE",
  ]).describe(
    "Immutable. Product type of client customer which the user list is being licensed to.",
  ).optional(),
  metrics: z.object({
    clickCount: z.string().describe(
      "Output only. The number of clicks for the user list license.",
    ).optional(),
    endDate: z.string().describe(
      "Output only. The end date (inclusive) of the metrics in the format YYYYMMDD. For example, 20260102 represents January 2, 2026. If `start_date` is used in the filter, `end_date` is also required. If neither `start_date` nor `end_date` are included in the filter, the UserListLicenseMetrics fields will not be populated in the response.",
    ).optional(),
    impressionCount: z.string().describe(
      "Output only. The number of impressions for the user list license.",
    ).optional(),
    revenueUsdMicros: z.string().describe(
      "Output only. The revenue for the user list license in USD micros.",
    ).optional(),
    startDate: z.string().describe(
      "Output only. The start date (inclusive) of the metrics in the format YYYYMMDD. For example, 20260102 represents January 2, 2026. If `end_date` is used in the filter, `start_date` is also required. If neither `start_date` nor `end_date` are included in the filter, the UserListLicenseMetrics fields will not be populated in the response.",
    ).optional(),
  }).describe("Metrics related to a user list license.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the user list global license.",
  ).optional(),
  pricing: z.object({
    buyerApprovalState: z.enum([
      "USER_LIST_PRICING_BUYER_APPROVAL_STATE_UNSPECIFIED",
      "PENDING",
      "APPROVED",
      "REJECTED",
    ]).describe(
      "Output only. The buyer approval state of this pricing. This field is read-only.",
    ).optional(),
    costMicros: z.string().describe(
      "Optional. The cost associated with the model, in micro units (10^-6), in the currency specified by the currency_code field. For example, 2000000 means $2 if `currency_code` is `USD`.",
    ).optional(),
    costType: z.enum([
      "USER_LIST_PRICING_COST_TYPE_UNSPECIFIED",
      "CPC",
      "CPM",
      "MEDIA_SHARE",
    ]).describe(
      "Immutable. The cost type of this pricing. Can be set only in the `create` operation. Can't be updated for an existing license.",
    ).optional(),
    currencyCode: z.string().describe(
      "Optional. The currency in which cost and max_cost is specified. Must be a three-letter currency code defined in ISO 4217.",
    ).optional(),
    endTime: z.string().describe("Optional. End time of the pricing.")
      .optional(),
    maxCostMicros: z.string().describe(
      "Optional. The maximum CPM a commerce audience can be charged when the MEDIA_SHARE cost type is used. The value is in micro units (10^-6) and in the currency specified by the currency_code field. For example, 2000000 means $2 if `currency_code` is `USD`. This is only relevant when cost_type is MEDIA_SHARE. When cost_type is not MEDIA_SHARE, and this field is set, a MAX_COST_NOT_ALLOWED error will be returned. If not set or set to`0`, there is no cap.",
    ).optional(),
    pricingActive: z.boolean().describe(
      "Output only. Whether this pricing is active.",
    ).optional(),
    pricingId: z.string().describe("Output only. The ID of this pricing.")
      .optional(),
    startTime: z.string().describe("Output only. Start time of the pricing.")
      .optional(),
  }).describe("A user list license pricing.").optional(),
  status: z.enum([
    "USER_LIST_LICENSE_STATUS_UNSPECIFIED",
    "USER_LIST_LICENSE_STATUS_ENABLED",
    "USER_LIST_LICENSE_STATUS_DISABLED",
  ]).describe(
    "Optional. Status of UserListGlobalLicense - ENABLED or DISABLED.",
  ).optional(),
  userListId: z.string().describe(
    "Immutable. ID of the user list being licensed.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Data Manager AccountTypes.Accounts.UserListGlobalLicenses. Registered at `@swamp/gcp/datamanager/accounttypes-accounts-userlistgloballicenses`. */
export const model = {
  type: "@swamp/gcp/datamanager/accounttypes-accounts-userlistgloballicenses",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A user list global license. This feature is only available to data partners.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a userListGlobalLicenses",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["licenseType"] !== undefined) {
          body["licenseType"] = g["licenseType"];
        }
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pricing"] !== undefined) body["pricing"] = g["pricing"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["userListId"] !== undefined) body["userListId"] = g["userListId"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a userListGlobalLicenses",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the userListGlobalLicenses",
        ),
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
      description: "Update userListGlobalLicenses attributes",
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
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["pricing"] !== undefined) body["pricing"] = g["pricing"];
        if (g["status"] !== undefined) body["status"] = g["status"];
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
      description: "Sync userListGlobalLicenses state from GCP",
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
  },
};
