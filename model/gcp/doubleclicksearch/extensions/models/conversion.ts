// Auto-generated extension model for @swamp/gcp/doubleclicksearch/conversion
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Search Ads 360 Conversion.
 *
 * A list of conversions.
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

const BASE_URL = "https://doubleclicksearch.googleapis.com/";

const GET_CONFIG = {
  "id": "doubleclicksearch.conversion.get",
  "path":
    "doubleclicksearch/v2/agency/{agencyId}/advertiser/{advertiserId}/engine/{engineAccountId}/conversion",
  "httpMethod": "GET",
  "parameterOrder": [
    "agencyId",
    "advertiserId",
    "engineAccountId",
    "endDate",
    "rowCount",
    "startDate",
    "startRow",
  ],
  "parameters": {
    "adGroupId": {
      "location": "query",
    },
    "adId": {
      "location": "query",
    },
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "agencyId": {
      "location": "path",
      "required": true,
    },
    "campaignId": {
      "location": "query",
    },
    "criterionId": {
      "location": "query",
    },
    "customerId": {
      "location": "query",
    },
    "endDate": {
      "location": "query",
      "required": true,
    },
    "engineAccountId": {
      "location": "path",
      "required": true,
    },
    "rowCount": {
      "location": "query",
      "required": true,
    },
    "startDate": {
      "location": "query",
      "required": true,
    },
    "startRow": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "doubleclicksearch.conversion.insert",
  "path": "doubleclicksearch/v2/conversion",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "doubleclicksearch.conversion.update",
  "path": "doubleclicksearch/v2/conversion",
  "httpMethod": "PUT",
  "parameterOrder": [],
  "parameters": {},
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  conversion: z.array(z.object({
    adGroupId: z.string().describe("DS ad group ID.").optional(),
    adId: z.string().describe("DS ad ID.").optional(),
    adUserDataConsent: z.enum(["UNKNOWN", "GRANTED", "DENIED"]).describe(
      "Represents consent for core platform services (CPS) preferences in settings. No default value. Acceptable values are: GRANTED: The desired consent status is to grant. Read the CPS preferences from GTE settings. DENIED: The desired consent status is to deny; CPS list is empty.",
    ).optional(),
    advertiserId: z.string().describe("DS advertiser ID.").optional(),
    agencyId: z.string().describe("DS agency ID.").optional(),
    attributionModel: z.string().describe(
      "Available to advertisers only after contacting DoubleClick Search customer support.",
    ).optional(),
    campaignId: z.string().describe("DS campaign ID.").optional(),
    channel: z.string().describe(
      'Sales channel for the product. Acceptable values are: - "`local`": a physical store - "`online`": an online store',
    ).optional(),
    clickId: z.string().describe("DS click ID for the conversion.").optional(),
    conversionId: z.string().describe(
      "For offline conversions, advertisers provide this ID. Advertisers can specify any ID that is meaningful to them. Each conversion in a request must specify a unique ID, and the combination of ID and timestamp must be unique amongst all conversions within the advertiser. For online conversions, DS copies the `dsConversionId` or `floodlightOrderId` into this property depending on the advertiser's Floodlight instructions.",
    ).optional(),
    conversionModifiedTimestamp: z.string().describe(
      "The time at which the conversion was last modified, in epoch millis UTC.",
    ).optional(),
    conversionTimestamp: z.string().describe(
      "The time at which the conversion took place, in epoch millis UTC.",
    ).optional(),
    countMillis: z.string().describe(
      "Available to advertisers only after contacting DoubleClick Search customer support.",
    ).optional(),
    criterionId: z.string().describe("DS criterion (keyword) ID.").optional(),
    currencyCode: z.string().describe(
      "The currency code for the conversion's revenue. Should be in ISO 4217 alphabetic (3-char) format.",
    ).optional(),
    customDimension: z.array(z.object({
      name: z.string().describe("Custom dimension name.").optional(),
      value: z.string().describe("Custom dimension value.").optional(),
    })).describe(
      "Custom dimensions for the conversion, which can be used to filter data in a report.",
    ).optional(),
    customMetric: z.array(z.object({
      name: z.string().describe("Custom metric name.").optional(),
      value: z.number().describe("Custom metric numeric value.").optional(),
    })).describe("Custom metrics for the conversion.").optional(),
    customerId: z.string().describe(
      "Customer ID of a client account in the new Search Ads 360 experience.",
    ).optional(),
    deviceType: z.string().describe(
      "The type of device on which the conversion occurred.",
    ).optional(),
    dsConversionId: z.string().describe(
      "ID that DoubleClick Search generates for each conversion.",
    ).optional(),
    engineAccountId: z.string().describe("DS engine account ID.").optional(),
    floodlightOrderId: z.string().describe(
      "The Floodlight order ID provided by the advertiser for the conversion.",
    ).optional(),
    inventoryAccountId: z.string().describe(
      "ID that DS generates and uses to uniquely identify the inventory account that contains the product.",
    ).optional(),
    productCountry: z.string().describe(
      "The country registered for the Merchant Center feed that contains the product. Use an ISO 3166 code to specify a country.",
    ).optional(),
    productGroupId: z.string().describe("DS product group ID.").optional(),
    productId: z.string().describe("The product ID (SKU).").optional(),
    productLanguage: z.string().describe(
      "The language registered for the Merchant Center feed that contains the product. Use an ISO 639 code to specify a language.",
    ).optional(),
    quantityMillis: z.string().describe(
      "The quantity of this conversion, in millis.",
    ).optional(),
    revenueMicros: z.string().describe(
      'The revenue amount of this `TRANSACTION` conversion, in micros (value multiplied by 1000000, no decimal). For example, to specify a revenue value of "10" enter "10000000" (10 million) in your request.',
    ).optional(),
    segmentationId: z.string().describe(
      "The numeric segmentation identifier (for example, DoubleClick Search Floodlight activity ID).",
    ).optional(),
    segmentationName: z.string().describe(
      "The friendly segmentation identifier (for example, DoubleClick Search Floodlight activity name).",
    ).optional(),
    segmentationType: z.string().describe(
      "The segmentation type of this conversion (for example, `FLOODLIGHT`).",
    ).optional(),
    state: z.string().describe(
      "The state of the conversion, that is, either `ACTIVE` or `REMOVED`. Note: state DELETED is deprecated.",
    ).optional(),
    storeId: z.string().describe(
      'The ID of the local store for which the product was advertised. Applicable only when the channel is "`local`".',
    ).optional(),
    type: z.string().describe(
      "The type of the conversion, that is, either `ACTION` or `TRANSACTION`. An `ACTION` conversion is an action by the user that has no monetarily quantifiable value, while a `TRANSACTION` conversion is an action that does have a monetarily quantifiable value. Examples are email list signups (`ACTION`) versus ecommerce purchases (`TRANSACTION`).",
    ).optional(),
  })).describe("The conversions being requested.").optional(),
});

const StateSchema = z.object({
  conversion: z.array(z.object({
    adGroupId: z.string(),
    adId: z.string(),
    adUserDataConsent: z.string(),
    advertiserId: z.string(),
    agencyId: z.string(),
    attributionModel: z.string(),
    campaignId: z.string(),
    channel: z.string(),
    clickId: z.string(),
    conversionId: z.string(),
    conversionModifiedTimestamp: z.string(),
    conversionTimestamp: z.string(),
    countMillis: z.string(),
    criterionId: z.string(),
    currencyCode: z.string(),
    customDimension: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
    customMetric: z.array(z.object({
      name: z.string(),
      value: z.number(),
    })),
    customerId: z.string(),
    deviceType: z.string(),
    dsConversionId: z.string(),
    engineAccountId: z.string(),
    floodlightOrderId: z.string(),
    inventoryAccountId: z.string(),
    productCountry: z.string(),
    productGroupId: z.string(),
    productId: z.string(),
    productLanguage: z.string(),
    quantityMillis: z.string(),
    revenueMicros: z.string(),
    segmentationId: z.string(),
    segmentationName: z.string(),
    segmentationType: z.string(),
    state: z.string(),
    storeId: z.string(),
    type: z.string(),
  })).optional(),
  kind: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  conversion: z.array(z.object({
    adGroupId: z.string().describe("DS ad group ID.").optional(),
    adId: z.string().describe("DS ad ID.").optional(),
    adUserDataConsent: z.enum(["UNKNOWN", "GRANTED", "DENIED"]).describe(
      "Represents consent for core platform services (CPS) preferences in settings. No default value. Acceptable values are: GRANTED: The desired consent status is to grant. Read the CPS preferences from GTE settings. DENIED: The desired consent status is to deny; CPS list is empty.",
    ).optional(),
    advertiserId: z.string().describe("DS advertiser ID.").optional(),
    agencyId: z.string().describe("DS agency ID.").optional(),
    attributionModel: z.string().describe(
      "Available to advertisers only after contacting DoubleClick Search customer support.",
    ).optional(),
    campaignId: z.string().describe("DS campaign ID.").optional(),
    channel: z.string().describe(
      'Sales channel for the product. Acceptable values are: - "`local`": a physical store - "`online`": an online store',
    ).optional(),
    clickId: z.string().describe("DS click ID for the conversion.").optional(),
    conversionId: z.string().describe(
      "For offline conversions, advertisers provide this ID. Advertisers can specify any ID that is meaningful to them. Each conversion in a request must specify a unique ID, and the combination of ID and timestamp must be unique amongst all conversions within the advertiser. For online conversions, DS copies the `dsConversionId` or `floodlightOrderId` into this property depending on the advertiser's Floodlight instructions.",
    ).optional(),
    conversionModifiedTimestamp: z.string().describe(
      "The time at which the conversion was last modified, in epoch millis UTC.",
    ).optional(),
    conversionTimestamp: z.string().describe(
      "The time at which the conversion took place, in epoch millis UTC.",
    ).optional(),
    countMillis: z.string().describe(
      "Available to advertisers only after contacting DoubleClick Search customer support.",
    ).optional(),
    criterionId: z.string().describe("DS criterion (keyword) ID.").optional(),
    currencyCode: z.string().describe(
      "The currency code for the conversion's revenue. Should be in ISO 4217 alphabetic (3-char) format.",
    ).optional(),
    customDimension: z.array(z.object({
      name: z.string().describe("Custom dimension name.").optional(),
      value: z.string().describe("Custom dimension value.").optional(),
    })).describe(
      "Custom dimensions for the conversion, which can be used to filter data in a report.",
    ).optional(),
    customMetric: z.array(z.object({
      name: z.string().describe("Custom metric name.").optional(),
      value: z.number().describe("Custom metric numeric value.").optional(),
    })).describe("Custom metrics for the conversion.").optional(),
    customerId: z.string().describe(
      "Customer ID of a client account in the new Search Ads 360 experience.",
    ).optional(),
    deviceType: z.string().describe(
      "The type of device on which the conversion occurred.",
    ).optional(),
    dsConversionId: z.string().describe(
      "ID that DoubleClick Search generates for each conversion.",
    ).optional(),
    engineAccountId: z.string().describe("DS engine account ID.").optional(),
    floodlightOrderId: z.string().describe(
      "The Floodlight order ID provided by the advertiser for the conversion.",
    ).optional(),
    inventoryAccountId: z.string().describe(
      "ID that DS generates and uses to uniquely identify the inventory account that contains the product.",
    ).optional(),
    productCountry: z.string().describe(
      "The country registered for the Merchant Center feed that contains the product. Use an ISO 3166 code to specify a country.",
    ).optional(),
    productGroupId: z.string().describe("DS product group ID.").optional(),
    productId: z.string().describe("The product ID (SKU).").optional(),
    productLanguage: z.string().describe(
      "The language registered for the Merchant Center feed that contains the product. Use an ISO 639 code to specify a language.",
    ).optional(),
    quantityMillis: z.string().describe(
      "The quantity of this conversion, in millis.",
    ).optional(),
    revenueMicros: z.string().describe(
      'The revenue amount of this `TRANSACTION` conversion, in micros (value multiplied by 1000000, no decimal). For example, to specify a revenue value of "10" enter "10000000" (10 million) in your request.',
    ).optional(),
    segmentationId: z.string().describe(
      "The numeric segmentation identifier (for example, DoubleClick Search Floodlight activity ID).",
    ).optional(),
    segmentationName: z.string().describe(
      "The friendly segmentation identifier (for example, DoubleClick Search Floodlight activity name).",
    ).optional(),
    segmentationType: z.string().describe(
      "The segmentation type of this conversion (for example, `FLOODLIGHT`).",
    ).optional(),
    state: z.string().describe(
      "The state of the conversion, that is, either `ACTIVE` or `REMOVED`. Note: state DELETED is deprecated.",
    ).optional(),
    storeId: z.string().describe(
      'The ID of the local store for which the product was advertised. Applicable only when the channel is "`local`".',
    ).optional(),
    type: z.string().describe(
      "The type of the conversion, that is, either `ACTION` or `TRANSACTION`. An `ACTION` conversion is an action by the user that has no monetarily quantifiable value, while a `TRANSACTION` conversion is an action that does have a monetarily quantifiable value. Examples are email list signups (`ACTION`) versus ecommerce purchases (`TRANSACTION`).",
    ).optional(),
  })).describe("The conversions being requested.").optional(),
});

/** Swamp extension model for Google Cloud Search Ads 360 Conversion. Registered at `@swamp/gcp/doubleclicksearch/conversion`. */
export const model = {
  type: "@swamp/gcp/doubleclicksearch/conversion",
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
      description: "A list of conversions.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a conversion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["conversion"] !== undefined) body["conversion"] = g["conversion"];
        if (g["agencyId"] !== undefined) {
          params["agencyId"] = String(g["agencyId"]);
        }
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["engineAccountId"] !== undefined) {
          params["engineAccountId"] = String(g["engineAccountId"]);
        }
        if (g["endDate"] !== undefined) {
          params["endDate"] = String(g["endDate"]);
        }
        if (g["rowCount"] !== undefined) {
          params["rowCount"] = String(g["rowCount"]);
        }
        if (g["startDate"] !== undefined) {
          params["startDate"] = String(g["startDate"]);
        }
        if (g["name"] !== undefined) params["startRow"] = String(g["name"]);
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
      description: "Get a conversion",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversion"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["agencyId"] !== undefined) {
          params["agencyId"] = String(g["agencyId"]);
        }
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["engineAccountId"] !== undefined) {
          params["engineAccountId"] = String(g["engineAccountId"]);
        }
        if (g["endDate"] !== undefined) {
          params["endDate"] = String(g["endDate"]);
        }
        if (g["rowCount"] !== undefined) {
          params["rowCount"] = String(g["rowCount"]);
        }
        if (g["startDate"] !== undefined) {
          params["startDate"] = String(g["startDate"]);
        }
        params["startRow"] = args.identifier;
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
      description: "Update conversion attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["conversion"] !== undefined) body["conversion"] = g["conversion"];
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
    sync: {
      description: "Sync conversion state from GCP",
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
          if (g["agencyId"] !== undefined) {
            params["agencyId"] = String(g["agencyId"]);
          } else if (existing["agencyId"]) {
            params["agencyId"] = String(existing["agencyId"]);
          }
          if (g["advertiserId"] !== undefined) {
            params["advertiserId"] = String(g["advertiserId"]);
          } else if (existing["advertiserId"]) {
            params["advertiserId"] = String(existing["advertiserId"]);
          }
          if (g["engineAccountId"] !== undefined) {
            params["engineAccountId"] = String(g["engineAccountId"]);
          } else if (existing["engineAccountId"]) {
            params["engineAccountId"] = String(existing["engineAccountId"]);
          }
          if (g["endDate"] !== undefined) {
            params["endDate"] = String(g["endDate"]);
          } else if (existing["endDate"]) {
            params["endDate"] = String(existing["endDate"]);
          }
          if (g["rowCount"] !== undefined) {
            params["rowCount"] = String(g["rowCount"]);
          } else if (existing["rowCount"]) {
            params["rowCount"] = String(existing["rowCount"]);
          }
          if (g["startDate"] !== undefined) {
            params["startDate"] = String(g["startDate"]);
          } else if (existing["startDate"]) {
            params["startDate"] = String(existing["startDate"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["startRow"] = identifier;
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
    get_by_customer_id: {
      description: "get by customer id",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["customerId"] = existing["customerId"]?.toString() ??
          g["customerId"]?.toString() ?? "";
        params["endDate"] = existing["endDate"]?.toString() ??
          g["endDate"]?.toString() ?? "";
        params["rowCount"] = existing["rowCount"]?.toString() ??
          g["rowCount"]?.toString() ?? "";
        params["startDate"] = existing["startDate"]?.toString() ??
          g["startDate"]?.toString() ?? "";
        params["startRow"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "doubleclicksearch.conversion.getByCustomerId",
            "path": "doubleclicksearch/v2/customer/{customerId}/conversion",
            "httpMethod": "GET",
            "parameterOrder": [
              "customerId",
              "endDate",
              "rowCount",
              "startDate",
              "startRow",
            ],
            "parameters": {
              "adGroupId": { "location": "query" },
              "adId": { "location": "query" },
              "advertiserId": { "location": "query" },
              "agencyId": { "location": "query" },
              "campaignId": { "location": "query" },
              "criterionId": { "location": "query" },
              "customerId": { "location": "path", "required": true },
              "endDate": { "location": "query", "required": true },
              "engineAccountId": { "location": "query" },
              "rowCount": { "location": "query", "required": true },
              "startDate": { "location": "query", "required": true },
              "startRow": { "location": "query", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    update_availability: {
      description: "update availability",
      arguments: z.object({
        availabilities: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["availabilities"] !== undefined) {
          body["availabilities"] = args["availabilities"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "doubleclicksearch.conversion.updateAvailability",
            "path": "doubleclicksearch/v2/conversion/updateAvailability",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
