// Auto-generated extension model for @swamp/gcp/apigee/apiproducts-rateplans
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Apiproducts.Rateplans.
 *
 * Rate plan details.
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
  return `${parent}/rateplans/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.apiproducts.rateplans.get",
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
  "id": "apigee.organizations.apiproducts.rateplans.create",
  "path": "v1/{+parent}/rateplans",
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

const UPDATE_CONFIG = {
  "id": "apigee.organizations.apiproducts.rateplans.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "apigee.organizations.apiproducts.rateplans.delete",
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
  "id": "apigee.organizations.apiproducts.rateplans.list",
  "path": "v1/{+parent}/rateplans",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "count": {
      "location": "query",
    },
    "expand": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "startKey": {
      "location": "query",
    },
    "state": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  apiproduct: z.string().describe(
    "Name of the API product that the rate plan is associated with.",
  ).optional(),
  billingPeriod: z.enum(["BILLING_PERIOD_UNSPECIFIED", "WEEKLY", "MONTHLY"])
    .describe("Frequency at which the customer will be billed.").optional(),
  consumptionPricingRates: z.array(z.object({
    end: z.string().describe(
      "Ending value of the range. Set to 0 or `null` for the last range of values.",
    ).optional(),
    fee: z.object({
      currencyCode: z.string().describe(
        "The three-letter currency code defined in ISO 4217.",
      ).optional(),
      nanos: z.number().int().describe(
        "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
      ).optional(),
      units: z.string().describe(
        'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
      ).optional(),
    }).describe("Represents an amount of money with its currency type.")
      .optional(),
    start: z.string().describe(
      "Starting value of the range. Set to 0 or `null` for the initial range of values.",
    ).optional(),
  })).describe(
    'API call volume ranges and the fees charged when the total number of API calls is within a given range. The method used to calculate the final fee depends on the selected pricing model. For example, if the pricing model is `BANDED` and the ranges are defined as follows: ` { "start": 1, "end": 100, "fee": 2 }, { "start": 101, "end": 200, "fee": 1.50 }, { "start": 201, "end": 0, "fee": 1 }, } ` Then the following fees would be charged based on the total number of API calls (assuming the currency selected is `USD`): * 50 calls cost 50 x $2 = $100 * 150 calls cost 100 x $2 + 50 x $1.5 = $275 * 250 calls cost 100 x $2 + 100 x $1.5 + 50 x $1 = $400 * 500 calls cost 100 x $2 + 100 x $1.5 + 300 x $1 = $650',
  ).optional(),
  consumptionPricingType: z.enum([
    "CONSUMPTION_PRICING_TYPE_UNSPECIFIED",
    "FIXED_PER_UNIT",
    "BANDED",
    "TIERED",
    "STAIRSTEP",
  ]).describe("Pricing model used for consumption-based charges.").optional(),
  currencyCode: z.string().describe(
    "Currency to be used for billing. Consists of a three-letter code as defined by the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) standard.",
  ).optional(),
  description: z.string().describe("Description of the rate plan.").optional(),
  displayName: z.string().describe("Display name of the rate plan.").optional(),
  endTime: z.string().describe(
    "Time when the rate plan will expire in milliseconds since epoch. Set to 0 or `null` to indicate that the rate plan should never expire.",
  ).optional(),
  fixedFeeFrequency: z.number().int().describe(
    "Frequency at which the fixed fee is charged.",
  ).optional(),
  fixedRecurringFee: z.object({
    currencyCode: z.string().describe(
      "The three-letter currency code defined in ISO 4217.",
    ).optional(),
    nanos: z.number().int().describe(
      "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
    ).optional(),
    units: z.string().describe(
      'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
    ).optional(),
  }).describe("Represents an amount of money with its currency type.")
    .optional(),
  revenueShareRates: z.array(z.object({
    end: z.string().describe(
      "Ending value of the range. Set to 0 or `null` for the last range of values.",
    ).optional(),
    sharePercentage: z.number().describe(
      "Percentage of the revenue to be shared with the developer. For example, to share 21 percent of the total revenue with the developer, set this value to 21. Specify a decimal number with a maximum of two digits following the decimal point.",
    ).optional(),
    start: z.string().describe(
      "Starting value of the range. Set to 0 or `null` for the initial range of values.",
    ).optional(),
  })).describe("Details of the revenue sharing model.").optional(),
  revenueShareType: z.enum([
    "REVENUE_SHARE_TYPE_UNSPECIFIED",
    "FIXED",
    "VOLUME_BANDED",
  ]).describe(
    "Method used to calculate the revenue that is shared with developers.",
  ).optional(),
  setupFee: z.object({
    currencyCode: z.string().describe(
      "The three-letter currency code defined in ISO 4217.",
    ).optional(),
    nanos: z.number().int().describe(
      "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
    ).optional(),
    units: z.string().describe(
      'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
    ).optional(),
  }).describe("Represents an amount of money with its currency type.")
    .optional(),
  startTime: z.string().describe(
    "Time when the rate plan becomes active in milliseconds since epoch.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "DRAFT", "PUBLISHED"]).describe(
    "Current state of the rate plan (draft or published).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiproduct: z.string().optional(),
  billingPeriod: z.string().optional(),
  consumptionPricingRates: z.array(z.object({
    end: z.string(),
    fee: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    start: z.string(),
  })).optional(),
  consumptionPricingType: z.string().optional(),
  createdAt: z.string().optional(),
  currencyCode: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  fixedFeeFrequency: z.number().optional(),
  fixedRecurringFee: z.object({
    currencyCode: z.string(),
    nanos: z.number(),
    units: z.string(),
  }).optional(),
  lastModifiedAt: z.string().optional(),
  name: z.string(),
  paymentFundingModel: z.string().optional(),
  revenueShareRates: z.array(z.object({
    end: z.string(),
    sharePercentage: z.number(),
    start: z.string(),
  })).optional(),
  revenueShareType: z.string().optional(),
  setupFee: z.object({
    currencyCode: z.string(),
    nanos: z.number(),
    units: z.string(),
  }).optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  apiproduct: z.string().describe(
    "Name of the API product that the rate plan is associated with.",
  ).optional(),
  billingPeriod: z.enum(["BILLING_PERIOD_UNSPECIFIED", "WEEKLY", "MONTHLY"])
    .describe("Frequency at which the customer will be billed.").optional(),
  consumptionPricingRates: z.array(z.object({
    end: z.string().describe(
      "Ending value of the range. Set to 0 or `null` for the last range of values.",
    ).optional(),
    fee: z.object({
      currencyCode: z.string().describe(
        "The three-letter currency code defined in ISO 4217.",
      ).optional(),
      nanos: z.number().int().describe(
        "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
      ).optional(),
      units: z.string().describe(
        'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
      ).optional(),
    }).describe("Represents an amount of money with its currency type.")
      .optional(),
    start: z.string().describe(
      "Starting value of the range. Set to 0 or `null` for the initial range of values.",
    ).optional(),
  })).describe(
    'API call volume ranges and the fees charged when the total number of API calls is within a given range. The method used to calculate the final fee depends on the selected pricing model. For example, if the pricing model is `BANDED` and the ranges are defined as follows: ` { "start": 1, "end": 100, "fee": 2 }, { "start": 101, "end": 200, "fee": 1.50 }, { "start": 201, "end": 0, "fee": 1 }, } ` Then the following fees would be charged based on the total number of API calls (assuming the currency selected is `USD`): * 50 calls cost 50 x $2 = $100 * 150 calls cost 100 x $2 + 50 x $1.5 = $275 * 250 calls cost 100 x $2 + 100 x $1.5 + 50 x $1 = $400 * 500 calls cost 100 x $2 + 100 x $1.5 + 300 x $1 = $650',
  ).optional(),
  consumptionPricingType: z.enum([
    "CONSUMPTION_PRICING_TYPE_UNSPECIFIED",
    "FIXED_PER_UNIT",
    "BANDED",
    "TIERED",
    "STAIRSTEP",
  ]).describe("Pricing model used for consumption-based charges.").optional(),
  currencyCode: z.string().describe(
    "Currency to be used for billing. Consists of a three-letter code as defined by the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) standard.",
  ).optional(),
  description: z.string().describe("Description of the rate plan.").optional(),
  displayName: z.string().describe("Display name of the rate plan.").optional(),
  endTime: z.string().describe(
    "Time when the rate plan will expire in milliseconds since epoch. Set to 0 or `null` to indicate that the rate plan should never expire.",
  ).optional(),
  fixedFeeFrequency: z.number().int().describe(
    "Frequency at which the fixed fee is charged.",
  ).optional(),
  fixedRecurringFee: z.object({
    currencyCode: z.string().describe(
      "The three-letter currency code defined in ISO 4217.",
    ).optional(),
    nanos: z.number().int().describe(
      "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
    ).optional(),
    units: z.string().describe(
      'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
    ).optional(),
  }).describe("Represents an amount of money with its currency type.")
    .optional(),
  revenueShareRates: z.array(z.object({
    end: z.string().describe(
      "Ending value of the range. Set to 0 or `null` for the last range of values.",
    ).optional(),
    sharePercentage: z.number().describe(
      "Percentage of the revenue to be shared with the developer. For example, to share 21 percent of the total revenue with the developer, set this value to 21. Specify a decimal number with a maximum of two digits following the decimal point.",
    ).optional(),
    start: z.string().describe(
      "Starting value of the range. Set to 0 or `null` for the initial range of values.",
    ).optional(),
  })).describe("Details of the revenue sharing model.").optional(),
  revenueShareType: z.enum([
    "REVENUE_SHARE_TYPE_UNSPECIFIED",
    "FIXED",
    "VOLUME_BANDED",
  ]).describe(
    "Method used to calculate the revenue that is shared with developers.",
  ).optional(),
  setupFee: z.object({
    currencyCode: z.string().describe(
      "The three-letter currency code defined in ISO 4217.",
    ).optional(),
    nanos: z.number().int().describe(
      "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
    ).optional(),
    units: z.string().describe(
      'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
    ).optional(),
  }).describe("Represents an amount of money with its currency type.")
    .optional(),
  startTime: z.string().describe(
    "Time when the rate plan becomes active in milliseconds since epoch.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "DRAFT", "PUBLISHED"]).describe(
    "Current state of the rate plan (draft or published).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Apiproducts.Rateplans. Registered at `@swamp/gcp/apigee/apiproducts-rateplans`. */
export const model = {
  type: "@swamp/gcp/apigee/apiproducts-rateplans",
  version: "2026.05.24.1",
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
      description:
        "Added: consumptionPricingType, currencyCode, description, displayName, endTime, fixedFeeFrequency, fixedRecurringFee, revenueShareRates, revenueShareType, setupFee, startTime, state, parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description:
        "Added: consumptionPricingType, currencyCode, description, displayName, endTime, fixedFeeFrequency, fixedRecurringFee, revenueShareRates, revenueShareType, setupFee, startTime, state, parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description:
        "Added: consumptionPricingType, currencyCode, description, displayName, endTime, fixedFeeFrequency, fixedRecurringFee, revenueShareRates, revenueShareType, setupFee, startTime, state, parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description:
        "Added: consumptionPricingType, currencyCode, description, displayName, endTime, fixedFeeFrequency, fixedRecurringFee, revenueShareRates, revenueShareType, setupFee, startTime, state, parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description:
        "Added: consumptionPricingType, currencyCode, description, displayName, endTime, fixedFeeFrequency, fixedRecurringFee, revenueShareRates, revenueShareType, setupFee, startTime, state, parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description:
        "Added: consumptionPricingType, currencyCode, description, displayName, endTime, fixedFeeFrequency, fixedRecurringFee, revenueShareRates, revenueShareType, setupFee, startTime, state, parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description:
        "Added: consumptionPricingType, currencyCode, description, displayName, endTime, fixedFeeFrequency, fixedRecurringFee, revenueShareRates, revenueShareType, setupFee, startTime, state, parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description:
        "Added: consumptionPricingType, currencyCode, description, displayName, endTime, fixedFeeFrequency, fixedRecurringFee, revenueShareRates, revenueShareType, setupFee, startTime, state, parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description:
        "Added: consumptionPricingType, currencyCode, description, displayName, endTime, fixedFeeFrequency, fixedRecurringFee, revenueShareRates, revenueShareType, setupFee, startTime, state, parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Rate plan details.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rateplans",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["apiproduct"] !== undefined) body["apiproduct"] = g["apiproduct"];
        if (g["billingPeriod"] !== undefined) {
          body["billingPeriod"] = g["billingPeriod"];
        }
        if (g["consumptionPricingRates"] !== undefined) {
          body["consumptionPricingRates"] = g["consumptionPricingRates"];
        }
        if (g["consumptionPricingType"] !== undefined) {
          body["consumptionPricingType"] = g["consumptionPricingType"];
        }
        if (g["currencyCode"] !== undefined) {
          body["currencyCode"] = g["currencyCode"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["fixedFeeFrequency"] !== undefined) {
          body["fixedFeeFrequency"] = g["fixedFeeFrequency"];
        }
        if (g["fixedRecurringFee"] !== undefined) {
          body["fixedRecurringFee"] = g["fixedRecurringFee"];
        }
        if (g["revenueShareRates"] !== undefined) {
          body["revenueShareRates"] = g["revenueShareRates"];
        }
        if (g["revenueShareType"] !== undefined) {
          body["revenueShareType"] = g["revenueShareType"];
        }
        if (g["setupFee"] !== undefined) body["setupFee"] = g["setupFee"];
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["state"] !== undefined) body["state"] = g["state"];
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a rateplans",
      arguments: z.object({
        identifier: z.string().describe("The name of the rateplans"),
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
      description: "Update rateplans attributes",
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
        if (g["apiproduct"] !== undefined) body["apiproduct"] = g["apiproduct"];
        if (g["billingPeriod"] !== undefined) {
          body["billingPeriod"] = g["billingPeriod"];
        }
        if (g["consumptionPricingRates"] !== undefined) {
          body["consumptionPricingRates"] = g["consumptionPricingRates"];
        }
        if (g["consumptionPricingType"] !== undefined) {
          body["consumptionPricingType"] = g["consumptionPricingType"];
        }
        if (g["currencyCode"] !== undefined) {
          body["currencyCode"] = g["currencyCode"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["fixedFeeFrequency"] !== undefined) {
          body["fixedFeeFrequency"] = g["fixedFeeFrequency"];
        }
        if (g["fixedRecurringFee"] !== undefined) {
          body["fixedRecurringFee"] = g["fixedRecurringFee"];
        }
        if (g["revenueShareRates"] !== undefined) {
          body["revenueShareRates"] = g["revenueShareRates"];
        }
        if (g["revenueShareType"] !== undefined) {
          body["revenueShareType"] = g["revenueShareType"];
        }
        if (g["setupFee"] !== undefined) body["setupFee"] = g["setupFee"];
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["state"] !== undefined) body["state"] = g["state"];
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
      description: "Delete the rateplans",
      arguments: z.object({
        identifier: z.string().describe("The name of the rateplans"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync rateplans state from GCP",
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
