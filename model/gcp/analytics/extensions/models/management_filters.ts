// Auto-generated extension model for @swamp/gcp/analytics/management-filters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.Filters.
 *
 * JSON template for an Analytics account filter.
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
  "id": "analytics.management.filters.get",
  "path": "management/accounts/{accountId}/filters/{filterId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "filterId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "filterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "analytics.management.filters.insert",
  "path": "management/accounts/{accountId}/filters",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "analytics.management.filters.update",
  "path": "management/accounts/{accountId}/filters/{filterId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "filterId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "filterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "analytics.management.filters.delete",
  "path": "management/accounts/{accountId}/filters/{filterId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "filterId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "filterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe("Account ID to which this filter belongs.")
    .optional(),
  advancedDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Indicates if the filter expressions are case sensitive.",
    ).optional(),
    extractA: z.string().describe("Expression to extract from field A.")
      .optional(),
    extractB: z.string().describe("Expression to extract from field B.")
      .optional(),
    fieldA: z.string().describe("Field A.").optional(),
    fieldAIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
    fieldARequired: z.boolean().describe(
      "Indicates if field A is required to match.",
    ).optional(),
    fieldB: z.string().describe("Field B.").optional(),
    fieldBIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
    fieldBRequired: z.boolean().describe(
      "Indicates if field B is required to match.",
    ).optional(),
    outputConstructor: z.string().describe(
      "Expression used to construct the output value.",
    ).optional(),
    outputToField: z.string().describe("Output field.").optional(),
    outputToFieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
    overrideOutputField: z.boolean().describe(
      "Indicates if the existing value of the output field, if any, should be overridden by the output expression.",
    ).optional(),
  }).describe("Details for the filter of the type ADVANCED.").optional(),
  created: z.string().describe("Time this filter was created.").optional(),
  excludeDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Determines if the filter is case sensitive.",
    ).optional(),
    expressionValue: z.string().describe("Filter expression value").optional(),
    field: z.string().describe(
      "Field to filter. Possible values: - Content and Traffic - PAGE_REQUEST_URI, - PAGE_HOSTNAME, - PAGE_TITLE, - REFERRAL, - COST_DATA_URI (Campaign target URL), - HIT_TYPE, - INTERNAL_SEARCH_TERM, - INTERNAL_SEARCH_TYPE, - SOURCE_PROPERTY_TRACKING_ID, - Campaign or AdGroup - CAMPAIGN_SOURCE, - CAMPAIGN_MEDIUM, - CAMPAIGN_NAME, - CAMPAIGN_AD_GROUP, - CAMPAIGN_TERM, - CAMPAIGN_CONTENT, - CAMPAIGN_CODE, - CAMPAIGN_REFERRAL_PATH, - E-Commerce - TRANSACTION_COUNTRY, - TRANSACTION_REGION, - TRANSACTION_CITY, - TRANSACTION_AFFILIATION (Store or order location), - ITEM_NAME, - ITEM_CODE, - ITEM_VARIATION, - TRANSACTION_ID, - TRANSACTION_CURRENCY_CODE, - PRODUCT_ACTION_TYPE, - Audience/Users - BROWSER, - BROWSER_VERSION, - BROWSER_SIZE, - PLATFORM, - PLATFORM_VERSION, - LANGUAGE, - SCREEN_RESOLUTION, - SCREEN_COLORS, - JAVA_ENABLED (Boolean Field), - FLASH_VERSION, - GEO_SPEED (Connection speed), - VISITOR_TYPE, - GEO_ORGANIZATION (ISP organization), - GEO_DOMAIN, - GEO_IP_ADDRESS, - GEO_IP_VERSION, - Location - GEO_COUNTRY, - GEO_REGION, - GEO_CITY, - Event - EVENT_CATEGORY, - EVENT_ACTION, - EVENT_LABEL, - Other - CUSTOM_FIELD_1, - CUSTOM_FIELD_2, - USER_DEFINED_VALUE, - Application - APP_ID, - APP_INSTALLER_ID, - APP_NAME, - APP_VERSION, - SCREEN, - IS_APP (Boolean Field), - IS_FATAL_EXCEPTION (Boolean Field), - EXCEPTION_DESCRIPTION, - Mobile device - IS_MOBILE (Boolean Field, Deprecated. Use DEVICE_CATEGORY=mobile), - IS_TABLET (Boolean Field, Deprecated. Use DEVICE_CATEGORY=tablet), - DEVICE_CATEGORY, - MOBILE_HAS_QWERTY_KEYBOARD (Boolean Field), - MOBILE_HAS_NFC_SUPPORT (Boolean Field), - MOBILE_HAS_CELLULAR_RADIO (Boolean Field), - MOBILE_HAS_WIFI_SUPPORT (Boolean Field), - MOBILE_BRAND_NAME, - MOBILE_MODEL_NAME, - MOBILE_MARKETING_NAME, - MOBILE_POINTING_METHOD, - Social - SOCIAL_NETWORK, - SOCIAL_ACTION, - SOCIAL_ACTION_TARGET, - Custom dimension - CUSTOM_DIMENSION (See accompanying field index),",
    ).optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Set only if the field is a is CUSTOM_DIMENSION.",
    ).optional(),
    kind: z.string().describe("Kind value for filter expression").optional(),
    matchType: z.string().describe(
      "Match type for this filter. Possible values are BEGINS_WITH, EQUAL, ENDS_WITH, CONTAINS, or MATCHES. GEO_DOMAIN, GEO_IP_ADDRESS, PAGE_REQUEST_URI, or PAGE_HOSTNAME filters can use any match type; all other filters must use MATCHES.",
    ).optional(),
  }).describe("JSON template for an Analytics filter expression.").optional(),
  id: z.string().describe("Filter ID.").optional(),
  includeDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Determines if the filter is case sensitive.",
    ).optional(),
    expressionValue: z.string().describe("Filter expression value").optional(),
    field: z.string().describe(
      "Field to filter. Possible values: - Content and Traffic - PAGE_REQUEST_URI, - PAGE_HOSTNAME, - PAGE_TITLE, - REFERRAL, - COST_DATA_URI (Campaign target URL), - HIT_TYPE, - INTERNAL_SEARCH_TERM, - INTERNAL_SEARCH_TYPE, - SOURCE_PROPERTY_TRACKING_ID, - Campaign or AdGroup - CAMPAIGN_SOURCE, - CAMPAIGN_MEDIUM, - CAMPAIGN_NAME, - CAMPAIGN_AD_GROUP, - CAMPAIGN_TERM, - CAMPAIGN_CONTENT, - CAMPAIGN_CODE, - CAMPAIGN_REFERRAL_PATH, - E-Commerce - TRANSACTION_COUNTRY, - TRANSACTION_REGION, - TRANSACTION_CITY, - TRANSACTION_AFFILIATION (Store or order location), - ITEM_NAME, - ITEM_CODE, - ITEM_VARIATION, - TRANSACTION_ID, - TRANSACTION_CURRENCY_CODE, - PRODUCT_ACTION_TYPE, - Audience/Users - BROWSER, - BROWSER_VERSION, - BROWSER_SIZE, - PLATFORM, - PLATFORM_VERSION, - LANGUAGE, - SCREEN_RESOLUTION, - SCREEN_COLORS, - JAVA_ENABLED (Boolean Field), - FLASH_VERSION, - GEO_SPEED (Connection speed), - VISITOR_TYPE, - GEO_ORGANIZATION (ISP organization), - GEO_DOMAIN, - GEO_IP_ADDRESS, - GEO_IP_VERSION, - Location - GEO_COUNTRY, - GEO_REGION, - GEO_CITY, - Event - EVENT_CATEGORY, - EVENT_ACTION, - EVENT_LABEL, - Other - CUSTOM_FIELD_1, - CUSTOM_FIELD_2, - USER_DEFINED_VALUE, - Application - APP_ID, - APP_INSTALLER_ID, - APP_NAME, - APP_VERSION, - SCREEN, - IS_APP (Boolean Field), - IS_FATAL_EXCEPTION (Boolean Field), - EXCEPTION_DESCRIPTION, - Mobile device - IS_MOBILE (Boolean Field, Deprecated. Use DEVICE_CATEGORY=mobile), - IS_TABLET (Boolean Field, Deprecated. Use DEVICE_CATEGORY=tablet), - DEVICE_CATEGORY, - MOBILE_HAS_QWERTY_KEYBOARD (Boolean Field), - MOBILE_HAS_NFC_SUPPORT (Boolean Field), - MOBILE_HAS_CELLULAR_RADIO (Boolean Field), - MOBILE_HAS_WIFI_SUPPORT (Boolean Field), - MOBILE_BRAND_NAME, - MOBILE_MODEL_NAME, - MOBILE_MARKETING_NAME, - MOBILE_POINTING_METHOD, - Social - SOCIAL_NETWORK, - SOCIAL_ACTION, - SOCIAL_ACTION_TARGET, - Custom dimension - CUSTOM_DIMENSION (See accompanying field index),",
    ).optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Set only if the field is a is CUSTOM_DIMENSION.",
    ).optional(),
    kind: z.string().describe("Kind value for filter expression").optional(),
    matchType: z.string().describe(
      "Match type for this filter. Possible values are BEGINS_WITH, EQUAL, ENDS_WITH, CONTAINS, or MATCHES. GEO_DOMAIN, GEO_IP_ADDRESS, PAGE_REQUEST_URI, or PAGE_HOSTNAME filters can use any match type; all other filters must use MATCHES.",
    ).optional(),
  }).describe("JSON template for an Analytics filter expression.").optional(),
  lowercaseDetails: z.object({
    field: z.string().describe("Field to use in the filter.").optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
  }).describe("Details for the filter of the type LOWER.").optional(),
  name: z.string().describe("Name of this filter."),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the account to which this filter belongs.",
    ).optional(),
    type: z.string().describe('Value is "analytics#account".').optional(),
  }).describe(
    "Parent link for this filter. Points to the account to which this filter belongs.",
  ).optional(),
  searchAndReplaceDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Determines if the filter is case sensitive.",
    ).optional(),
    field: z.string().describe("Field to use in the filter.").optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
    replaceString: z.string().describe("Term to replace the search term with.")
      .optional(),
    searchString: z.string().describe("Term to search.").optional(),
  }).describe("Details for the filter of the type SEARCH_AND_REPLACE.")
    .optional(),
  type: z.string().describe(
    "Type of this filter. Possible values are INCLUDE, EXCLUDE, LOWERCASE, UPPERCASE, SEARCH_AND_REPLACE and ADVANCED.",
  ),
  updated: z.string().describe("Time this filter was last modified.")
    .optional(),
  uppercaseDetails: z.object({
    field: z.string().describe("Field to use in the filter.").optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
  }).describe("Details for the filter of the type UPPER.").optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  advancedDetails: z.object({
    caseSensitive: z.boolean(),
    extractA: z.string(),
    extractB: z.string(),
    fieldA: z.string(),
    fieldAIndex: z.number(),
    fieldARequired: z.boolean(),
    fieldB: z.string(),
    fieldBIndex: z.number(),
    fieldBRequired: z.boolean(),
    outputConstructor: z.string(),
    outputToField: z.string(),
    outputToFieldIndex: z.number(),
    overrideOutputField: z.boolean(),
  }).optional(),
  created: z.string().optional(),
  excludeDetails: z.object({
    caseSensitive: z.boolean(),
    expressionValue: z.string(),
    field: z.string(),
    fieldIndex: z.number(),
    kind: z.string(),
    matchType: z.string(),
  }).optional(),
  id: z.string().optional(),
  includeDetails: z.object({
    caseSensitive: z.boolean(),
    expressionValue: z.string(),
    field: z.string(),
    fieldIndex: z.number(),
    kind: z.string(),
    matchType: z.string(),
  }).optional(),
  kind: z.string().optional(),
  lowercaseDetails: z.object({
    field: z.string(),
    fieldIndex: z.number(),
  }).optional(),
  name: z.string(),
  parentLink: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  searchAndReplaceDetails: z.object({
    caseSensitive: z.boolean(),
    field: z.string(),
    fieldIndex: z.number(),
    replaceString: z.string(),
    searchString: z.string(),
  }).optional(),
  selfLink: z.string().optional(),
  type: z.string().optional(),
  updated: z.string().optional(),
  uppercaseDetails: z.object({
    field: z.string(),
    fieldIndex: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("Account ID to which this filter belongs.")
    .optional(),
  advancedDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Indicates if the filter expressions are case sensitive.",
    ).optional(),
    extractA: z.string().describe("Expression to extract from field A.")
      .optional(),
    extractB: z.string().describe("Expression to extract from field B.")
      .optional(),
    fieldA: z.string().describe("Field A.").optional(),
    fieldAIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
    fieldARequired: z.boolean().describe(
      "Indicates if field A is required to match.",
    ).optional(),
    fieldB: z.string().describe("Field B.").optional(),
    fieldBIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
    fieldBRequired: z.boolean().describe(
      "Indicates if field B is required to match.",
    ).optional(),
    outputConstructor: z.string().describe(
      "Expression used to construct the output value.",
    ).optional(),
    outputToField: z.string().describe("Output field.").optional(),
    outputToFieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
    overrideOutputField: z.boolean().describe(
      "Indicates if the existing value of the output field, if any, should be overridden by the output expression.",
    ).optional(),
  }).describe("Details for the filter of the type ADVANCED.").optional(),
  created: z.string().describe("Time this filter was created.").optional(),
  excludeDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Determines if the filter is case sensitive.",
    ).optional(),
    expressionValue: z.string().describe("Filter expression value").optional(),
    field: z.string().describe(
      "Field to filter. Possible values: - Content and Traffic - PAGE_REQUEST_URI, - PAGE_HOSTNAME, - PAGE_TITLE, - REFERRAL, - COST_DATA_URI (Campaign target URL), - HIT_TYPE, - INTERNAL_SEARCH_TERM, - INTERNAL_SEARCH_TYPE, - SOURCE_PROPERTY_TRACKING_ID, - Campaign or AdGroup - CAMPAIGN_SOURCE, - CAMPAIGN_MEDIUM, - CAMPAIGN_NAME, - CAMPAIGN_AD_GROUP, - CAMPAIGN_TERM, - CAMPAIGN_CONTENT, - CAMPAIGN_CODE, - CAMPAIGN_REFERRAL_PATH, - E-Commerce - TRANSACTION_COUNTRY, - TRANSACTION_REGION, - TRANSACTION_CITY, - TRANSACTION_AFFILIATION (Store or order location), - ITEM_NAME, - ITEM_CODE, - ITEM_VARIATION, - TRANSACTION_ID, - TRANSACTION_CURRENCY_CODE, - PRODUCT_ACTION_TYPE, - Audience/Users - BROWSER, - BROWSER_VERSION, - BROWSER_SIZE, - PLATFORM, - PLATFORM_VERSION, - LANGUAGE, - SCREEN_RESOLUTION, - SCREEN_COLORS, - JAVA_ENABLED (Boolean Field), - FLASH_VERSION, - GEO_SPEED (Connection speed), - VISITOR_TYPE, - GEO_ORGANIZATION (ISP organization), - GEO_DOMAIN, - GEO_IP_ADDRESS, - GEO_IP_VERSION, - Location - GEO_COUNTRY, - GEO_REGION, - GEO_CITY, - Event - EVENT_CATEGORY, - EVENT_ACTION, - EVENT_LABEL, - Other - CUSTOM_FIELD_1, - CUSTOM_FIELD_2, - USER_DEFINED_VALUE, - Application - APP_ID, - APP_INSTALLER_ID, - APP_NAME, - APP_VERSION, - SCREEN, - IS_APP (Boolean Field), - IS_FATAL_EXCEPTION (Boolean Field), - EXCEPTION_DESCRIPTION, - Mobile device - IS_MOBILE (Boolean Field, Deprecated. Use DEVICE_CATEGORY=mobile), - IS_TABLET (Boolean Field, Deprecated. Use DEVICE_CATEGORY=tablet), - DEVICE_CATEGORY, - MOBILE_HAS_QWERTY_KEYBOARD (Boolean Field), - MOBILE_HAS_NFC_SUPPORT (Boolean Field), - MOBILE_HAS_CELLULAR_RADIO (Boolean Field), - MOBILE_HAS_WIFI_SUPPORT (Boolean Field), - MOBILE_BRAND_NAME, - MOBILE_MODEL_NAME, - MOBILE_MARKETING_NAME, - MOBILE_POINTING_METHOD, - Social - SOCIAL_NETWORK, - SOCIAL_ACTION, - SOCIAL_ACTION_TARGET, - Custom dimension - CUSTOM_DIMENSION (See accompanying field index),",
    ).optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Set only if the field is a is CUSTOM_DIMENSION.",
    ).optional(),
    kind: z.string().describe("Kind value for filter expression").optional(),
    matchType: z.string().describe(
      "Match type for this filter. Possible values are BEGINS_WITH, EQUAL, ENDS_WITH, CONTAINS, or MATCHES. GEO_DOMAIN, GEO_IP_ADDRESS, PAGE_REQUEST_URI, or PAGE_HOSTNAME filters can use any match type; all other filters must use MATCHES.",
    ).optional(),
  }).describe("JSON template for an Analytics filter expression.").optional(),
  id: z.string().describe("Filter ID.").optional(),
  includeDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Determines if the filter is case sensitive.",
    ).optional(),
    expressionValue: z.string().describe("Filter expression value").optional(),
    field: z.string().describe(
      "Field to filter. Possible values: - Content and Traffic - PAGE_REQUEST_URI, - PAGE_HOSTNAME, - PAGE_TITLE, - REFERRAL, - COST_DATA_URI (Campaign target URL), - HIT_TYPE, - INTERNAL_SEARCH_TERM, - INTERNAL_SEARCH_TYPE, - SOURCE_PROPERTY_TRACKING_ID, - Campaign or AdGroup - CAMPAIGN_SOURCE, - CAMPAIGN_MEDIUM, - CAMPAIGN_NAME, - CAMPAIGN_AD_GROUP, - CAMPAIGN_TERM, - CAMPAIGN_CONTENT, - CAMPAIGN_CODE, - CAMPAIGN_REFERRAL_PATH, - E-Commerce - TRANSACTION_COUNTRY, - TRANSACTION_REGION, - TRANSACTION_CITY, - TRANSACTION_AFFILIATION (Store or order location), - ITEM_NAME, - ITEM_CODE, - ITEM_VARIATION, - TRANSACTION_ID, - TRANSACTION_CURRENCY_CODE, - PRODUCT_ACTION_TYPE, - Audience/Users - BROWSER, - BROWSER_VERSION, - BROWSER_SIZE, - PLATFORM, - PLATFORM_VERSION, - LANGUAGE, - SCREEN_RESOLUTION, - SCREEN_COLORS, - JAVA_ENABLED (Boolean Field), - FLASH_VERSION, - GEO_SPEED (Connection speed), - VISITOR_TYPE, - GEO_ORGANIZATION (ISP organization), - GEO_DOMAIN, - GEO_IP_ADDRESS, - GEO_IP_VERSION, - Location - GEO_COUNTRY, - GEO_REGION, - GEO_CITY, - Event - EVENT_CATEGORY, - EVENT_ACTION, - EVENT_LABEL, - Other - CUSTOM_FIELD_1, - CUSTOM_FIELD_2, - USER_DEFINED_VALUE, - Application - APP_ID, - APP_INSTALLER_ID, - APP_NAME, - APP_VERSION, - SCREEN, - IS_APP (Boolean Field), - IS_FATAL_EXCEPTION (Boolean Field), - EXCEPTION_DESCRIPTION, - Mobile device - IS_MOBILE (Boolean Field, Deprecated. Use DEVICE_CATEGORY=mobile), - IS_TABLET (Boolean Field, Deprecated. Use DEVICE_CATEGORY=tablet), - DEVICE_CATEGORY, - MOBILE_HAS_QWERTY_KEYBOARD (Boolean Field), - MOBILE_HAS_NFC_SUPPORT (Boolean Field), - MOBILE_HAS_CELLULAR_RADIO (Boolean Field), - MOBILE_HAS_WIFI_SUPPORT (Boolean Field), - MOBILE_BRAND_NAME, - MOBILE_MODEL_NAME, - MOBILE_MARKETING_NAME, - MOBILE_POINTING_METHOD, - Social - SOCIAL_NETWORK, - SOCIAL_ACTION, - SOCIAL_ACTION_TARGET, - Custom dimension - CUSTOM_DIMENSION (See accompanying field index),",
    ).optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Set only if the field is a is CUSTOM_DIMENSION.",
    ).optional(),
    kind: z.string().describe("Kind value for filter expression").optional(),
    matchType: z.string().describe(
      "Match type for this filter. Possible values are BEGINS_WITH, EQUAL, ENDS_WITH, CONTAINS, or MATCHES. GEO_DOMAIN, GEO_IP_ADDRESS, PAGE_REQUEST_URI, or PAGE_HOSTNAME filters can use any match type; all other filters must use MATCHES.",
    ).optional(),
  }).describe("JSON template for an Analytics filter expression.").optional(),
  lowercaseDetails: z.object({
    field: z.string().describe("Field to use in the filter.").optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
  }).describe("Details for the filter of the type LOWER.").optional(),
  name: z.string().describe("Name of this filter.").optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the account to which this filter belongs.",
    ).optional(),
    type: z.string().describe('Value is "analytics#account".').optional(),
  }).describe(
    "Parent link for this filter. Points to the account to which this filter belongs.",
  ).optional(),
  searchAndReplaceDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Determines if the filter is case sensitive.",
    ).optional(),
    field: z.string().describe("Field to use in the filter.").optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
    replaceString: z.string().describe("Term to replace the search term with.")
      .optional(),
    searchString: z.string().describe("Term to search.").optional(),
  }).describe("Details for the filter of the type SEARCH_AND_REPLACE.")
    .optional(),
  type: z.string().describe(
    "Type of this filter. Possible values are INCLUDE, EXCLUDE, LOWERCASE, UPPERCASE, SEARCH_AND_REPLACE and ADVANCED.",
  ).optional(),
  updated: z.string().describe("Time this filter was last modified.")
    .optional(),
  uppercaseDetails: z.object({
    field: z.string().describe("Field to use in the filter.").optional(),
    fieldIndex: z.number().int().describe(
      "The Index of the custom dimension. Required if field is a CUSTOM_DIMENSION.",
    ).optional(),
  }).describe("Details for the filter of the type UPPER.").optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.Filters. Registered at `@swamp/gcp/analytics/management-filters`. */
export const model = {
  type: "@swamp/gcp/analytics/management-filters",
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
      description: "JSON template for an Analytics account filter.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a filters",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["advancedDetails"] !== undefined) {
          body["advancedDetails"] = g["advancedDetails"];
        }
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["excludeDetails"] !== undefined) {
          body["excludeDetails"] = g["excludeDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["includeDetails"] !== undefined) {
          body["includeDetails"] = g["includeDetails"];
        }
        if (g["lowercaseDetails"] !== undefined) {
          body["lowercaseDetails"] = g["lowercaseDetails"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["searchAndReplaceDetails"] !== undefined) {
          body["searchAndReplaceDetails"] = g["searchAndReplaceDetails"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["uppercaseDetails"] !== undefined) {
          body["uppercaseDetails"] = g["uppercaseDetails"];
        }
        if (g["name"] !== undefined) params["filterId"] = String(g["name"]);
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
      description: "Get a filters",
      arguments: z.object({
        identifier: z.string().describe("The name of the filters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        params["filterId"] = args.identifier;
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
      description: "Update filters attributes",
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
        params["filterId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["advancedDetails"] !== undefined) {
          body["advancedDetails"] = g["advancedDetails"];
        }
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["excludeDetails"] !== undefined) {
          body["excludeDetails"] = g["excludeDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["includeDetails"] !== undefined) {
          body["includeDetails"] = g["includeDetails"];
        }
        if (g["lowercaseDetails"] !== undefined) {
          body["lowercaseDetails"] = g["lowercaseDetails"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["searchAndReplaceDetails"] !== undefined) {
          body["searchAndReplaceDetails"] = g["searchAndReplaceDetails"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["uppercaseDetails"] !== undefined) {
          body["uppercaseDetails"] = g["uppercaseDetails"];
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
      description: "Delete the filters",
      arguments: z.object({
        identifier: z.string().describe("The name of the filters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        params["filterId"] = args.identifier;
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
      description: "Sync filters state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["filterId"] = identifier;
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
