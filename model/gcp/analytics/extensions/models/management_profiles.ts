// Auto-generated extension model for @swamp/gcp/analytics/management-profiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.Profiles.
 *
 * JSON template for an Analytics view (profile).
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

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.management.profiles.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "analytics.management.profiles.insert",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "analytics.management.profiles.update",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "analytics.management.profiles.delete",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID to which this view (profile) belongs.",
  ).optional(),
  botFilteringEnabled: z.boolean().describe(
    "Indicates whether bot filtering is enabled for this view (profile).",
  ).optional(),
  childLink: z.object({
    href: z.string().describe(
      "Link to the list of goals for this view (profile).",
    ).optional(),
    type: z.string().describe('Value is "analytics#goals".').optional(),
  }).describe(
    "Child link for this view (profile). Points to the list of goals for this view (profile).",
  ).optional(),
  created: z.string().describe("Time this view (profile) was created.")
    .optional(),
  currency: z.string().describe(
    "The currency type associated with this view (profile), defaults to USD. The supported values are: USD, JPY, EUR, GBP, AUD, KRW, BRL, CNY, DKK, RUB, SEK, NOK, PLN, TRY, TWD, HKD, THB, IDR, ARS, MXN, VND, PHP, INR, CHF, CAD, CZK, NZD, HUF, BGN, LTL, ZAR, UAH, AED, BOB, CLP, COP, EGP, HRK, ILS, MAD, MYR, PEN, PKR, RON, RSD, SAR, SGD, VEF, LVL",
  ).optional(),
  defaultPage: z.string().describe("Default page for this view (profile).")
    .optional(),
  eCommerceTracking: z.boolean().describe(
    "Indicates whether ecommerce tracking is enabled for this view (profile).",
  ).optional(),
  enhancedECommerceTracking: z.boolean().describe(
    "Indicates whether enhanced ecommerce tracking is enabled for this view (profile). This property can only be enabled if ecommerce tracking is enabled.",
  ).optional(),
  excludeQueryParameters: z.string().describe(
    "The query parameters that are excluded from this view (profile).",
  ).optional(),
  id: z.string().describe("View (Profile) ID.").optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for the web property to which this view (profile) belongs.",
  ).optional(),
  name: z.string().describe("Name of this view (profile).").optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the web property to which this view (profile) belongs.",
    ).optional(),
    type: z.string().describe('Value is "analytics#webproperty".').optional(),
  }).describe(
    "Parent link for this view (profile). Points to the web property to which this view (profile) belongs.",
  ).optional(),
  permissions: z.object({
    effective: z.array(z.string()).describe(
      "All the permissions that the user has for this view (profile). These include any implied permissions (e.g., EDIT implies VIEW) or inherited permissions from the parent web property.",
    ).optional(),
  }).describe("Permissions the user has for this view (profile).").optional(),
  siteSearchCategoryParameters: z.string().describe(
    "Site search category parameters for this view (profile).",
  ).optional(),
  siteSearchQueryParameters: z.string().describe(
    "The site search query parameters for this view (profile).",
  ).optional(),
  starred: z.boolean().describe(
    "Indicates whether this view (profile) is starred or not.",
  ).optional(),
  stripSiteSearchCategoryParameters: z.boolean().describe(
    "Whether or not Analytics will strip search category parameters from the URLs in your reports.",
  ).optional(),
  stripSiteSearchQueryParameters: z.boolean().describe(
    "Whether or not Analytics will strip search query parameters from the URLs in your reports.",
  ).optional(),
  timezone: z.string().describe(
    "Time zone for which this view (profile) has been configured. Time zones are identified by strings from the TZ database.",
  ).optional(),
  type: z.string().describe("View (Profile) type. Supported types: WEB or APP.")
    .optional(),
  updated: z.string().describe("Time this view (profile) was last modified.")
    .optional(),
  webPropertyId: z.string().describe(
    "Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs.",
  ).optional(),
  websiteUrl: z.string().describe("Website URL for this view (profile).")
    .optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  botFilteringEnabled: z.boolean().optional(),
  childLink: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  created: z.string().optional(),
  currency: z.string().optional(),
  defaultPage: z.string().optional(),
  eCommerceTracking: z.boolean().optional(),
  enhancedECommerceTracking: z.boolean().optional(),
  excludeQueryParameters: z.string().optional(),
  id: z.string().optional(),
  internalWebPropertyId: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  parentLink: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  permissions: z.object({
    effective: z.array(z.string()),
  }).optional(),
  selfLink: z.string().optional(),
  siteSearchCategoryParameters: z.string().optional(),
  siteSearchQueryParameters: z.string().optional(),
  starred: z.boolean().optional(),
  stripSiteSearchCategoryParameters: z.boolean().optional(),
  stripSiteSearchQueryParameters: z.boolean().optional(),
  timezone: z.string().optional(),
  type: z.string().optional(),
  updated: z.string().optional(),
  webPropertyId: z.string().optional(),
  websiteUrl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID to which this view (profile) belongs.",
  ).optional(),
  botFilteringEnabled: z.boolean().describe(
    "Indicates whether bot filtering is enabled for this view (profile).",
  ).optional(),
  childLink: z.object({
    href: z.string().describe(
      "Link to the list of goals for this view (profile).",
    ).optional(),
    type: z.string().describe('Value is "analytics#goals".').optional(),
  }).describe(
    "Child link for this view (profile). Points to the list of goals for this view (profile).",
  ).optional(),
  created: z.string().describe("Time this view (profile) was created.")
    .optional(),
  currency: z.string().describe(
    "The currency type associated with this view (profile), defaults to USD. The supported values are: USD, JPY, EUR, GBP, AUD, KRW, BRL, CNY, DKK, RUB, SEK, NOK, PLN, TRY, TWD, HKD, THB, IDR, ARS, MXN, VND, PHP, INR, CHF, CAD, CZK, NZD, HUF, BGN, LTL, ZAR, UAH, AED, BOB, CLP, COP, EGP, HRK, ILS, MAD, MYR, PEN, PKR, RON, RSD, SAR, SGD, VEF, LVL",
  ).optional(),
  defaultPage: z.string().describe("Default page for this view (profile).")
    .optional(),
  eCommerceTracking: z.boolean().describe(
    "Indicates whether ecommerce tracking is enabled for this view (profile).",
  ).optional(),
  enhancedECommerceTracking: z.boolean().describe(
    "Indicates whether enhanced ecommerce tracking is enabled for this view (profile). This property can only be enabled if ecommerce tracking is enabled.",
  ).optional(),
  excludeQueryParameters: z.string().describe(
    "The query parameters that are excluded from this view (profile).",
  ).optional(),
  id: z.string().describe("View (Profile) ID.").optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for the web property to which this view (profile) belongs.",
  ).optional(),
  name: z.string().describe("Name of this view (profile).").optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the web property to which this view (profile) belongs.",
    ).optional(),
    type: z.string().describe('Value is "analytics#webproperty".').optional(),
  }).describe(
    "Parent link for this view (profile). Points to the web property to which this view (profile) belongs.",
  ).optional(),
  permissions: z.object({
    effective: z.array(z.string()).describe(
      "All the permissions that the user has for this view (profile). These include any implied permissions (e.g., EDIT implies VIEW) or inherited permissions from the parent web property.",
    ).optional(),
  }).describe("Permissions the user has for this view (profile).").optional(),
  siteSearchCategoryParameters: z.string().describe(
    "Site search category parameters for this view (profile).",
  ).optional(),
  siteSearchQueryParameters: z.string().describe(
    "The site search query parameters for this view (profile).",
  ).optional(),
  starred: z.boolean().describe(
    "Indicates whether this view (profile) is starred or not.",
  ).optional(),
  stripSiteSearchCategoryParameters: z.boolean().describe(
    "Whether or not Analytics will strip search category parameters from the URLs in your reports.",
  ).optional(),
  stripSiteSearchQueryParameters: z.boolean().describe(
    "Whether or not Analytics will strip search query parameters from the URLs in your reports.",
  ).optional(),
  timezone: z.string().describe(
    "Time zone for which this view (profile) has been configured. Time zones are identified by strings from the TZ database.",
  ).optional(),
  type: z.string().describe("View (Profile) type. Supported types: WEB or APP.")
    .optional(),
  updated: z.string().describe("Time this view (profile) was last modified.")
    .optional(),
  webPropertyId: z.string().describe(
    "Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs.",
  ).optional(),
  websiteUrl: z.string().describe("Website URL for this view (profile).")
    .optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.Profiles. Registered at `@swamp/gcp/analytics/management-profiles`. */
export const model = {
  type: "@swamp/gcp/analytics/management-profiles",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "JSON template for an Analytics view (profile).",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a profiles",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["botFilteringEnabled"] !== undefined) {
          body["botFilteringEnabled"] = g["botFilteringEnabled"];
        }
        if (g["childLink"] !== undefined) body["childLink"] = g["childLink"];
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["currency"] !== undefined) body["currency"] = g["currency"];
        if (g["defaultPage"] !== undefined) {
          body["defaultPage"] = g["defaultPage"];
        }
        if (g["eCommerceTracking"] !== undefined) {
          body["eCommerceTracking"] = g["eCommerceTracking"];
        }
        if (g["enhancedECommerceTracking"] !== undefined) {
          body["enhancedECommerceTracking"] = g["enhancedECommerceTracking"];
        }
        if (g["excludeQueryParameters"] !== undefined) {
          body["excludeQueryParameters"] = g["excludeQueryParameters"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["permissions"] !== undefined) {
          body["permissions"] = g["permissions"];
        }
        if (g["siteSearchCategoryParameters"] !== undefined) {
          body["siteSearchCategoryParameters"] =
            g["siteSearchCategoryParameters"];
        }
        if (g["siteSearchQueryParameters"] !== undefined) {
          body["siteSearchQueryParameters"] = g["siteSearchQueryParameters"];
        }
        if (g["starred"] !== undefined) body["starred"] = g["starred"];
        if (g["stripSiteSearchCategoryParameters"] !== undefined) {
          body["stripSiteSearchCategoryParameters"] =
            g["stripSiteSearchCategoryParameters"];
        }
        if (g["stripSiteSearchQueryParameters"] !== undefined) {
          body["stripSiteSearchQueryParameters"] =
            g["stripSiteSearchQueryParameters"];
        }
        if (g["timezone"] !== undefined) body["timezone"] = g["timezone"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["websiteUrl"] !== undefined) body["websiteUrl"] = g["websiteUrl"];
        if (g["name"] !== undefined) params["profileId"] = String(g["name"]);
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
      description: "Get a profiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the profiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        params["profileId"] = args.identifier;
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
      description: "Update profiles attributes",
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        } else if (existing["accountId"]) {
          params["accountId"] = String(existing["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        } else if (existing["webPropertyId"]) {
          params["webPropertyId"] = String(existing["webPropertyId"]);
        }
        params["profileId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["botFilteringEnabled"] !== undefined) {
          body["botFilteringEnabled"] = g["botFilteringEnabled"];
        }
        if (g["childLink"] !== undefined) body["childLink"] = g["childLink"];
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["currency"] !== undefined) body["currency"] = g["currency"];
        if (g["defaultPage"] !== undefined) {
          body["defaultPage"] = g["defaultPage"];
        }
        if (g["eCommerceTracking"] !== undefined) {
          body["eCommerceTracking"] = g["eCommerceTracking"];
        }
        if (g["enhancedECommerceTracking"] !== undefined) {
          body["enhancedECommerceTracking"] = g["enhancedECommerceTracking"];
        }
        if (g["excludeQueryParameters"] !== undefined) {
          body["excludeQueryParameters"] = g["excludeQueryParameters"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["permissions"] !== undefined) {
          body["permissions"] = g["permissions"];
        }
        if (g["siteSearchCategoryParameters"] !== undefined) {
          body["siteSearchCategoryParameters"] =
            g["siteSearchCategoryParameters"];
        }
        if (g["siteSearchQueryParameters"] !== undefined) {
          body["siteSearchQueryParameters"] = g["siteSearchQueryParameters"];
        }
        if (g["starred"] !== undefined) body["starred"] = g["starred"];
        if (g["stripSiteSearchCategoryParameters"] !== undefined) {
          body["stripSiteSearchCategoryParameters"] =
            g["stripSiteSearchCategoryParameters"];
        }
        if (g["stripSiteSearchQueryParameters"] !== undefined) {
          body["stripSiteSearchQueryParameters"] =
            g["stripSiteSearchQueryParameters"];
        }
        if (g["timezone"] !== undefined) body["timezone"] = g["timezone"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["websiteUrl"] !== undefined) body["websiteUrl"] = g["websiteUrl"];
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
          UPDATE_CONFIG,
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
      description: "Delete the profiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the profiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        params["profileId"] = args.identifier;
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
      description: "Sync profiles state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          if (g["webPropertyId"] !== undefined) {
            params["webPropertyId"] = String(g["webPropertyId"]);
          } else if (existing["webPropertyId"]) {
            params["webPropertyId"] = String(existing["webPropertyId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["profileId"] = identifier;
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
