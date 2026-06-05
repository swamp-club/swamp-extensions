// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-onlinereturnpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.OnlineReturnPolicies.
 *
 * [Online return policy](https://support.google.com/merchants/answer/10220642) object. This is currently used to represent return policies for ads and free listings programs.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/onlineReturnPolicies/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.onlineReturnPolicies.get",
  "path": "accounts/v1/{+name}",
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
  "id": "merchantapi.accounts.onlineReturnPolicies.create",
  "path": "accounts/v1/{+parent}/onlineReturnPolicies",
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

const DELETE_CONFIG = {
  "id": "merchantapi.accounts.onlineReturnPolicies.delete",
  "path": "accounts/v1/{+name}",
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
  "id": "merchantapi.accounts.onlineReturnPolicies.list",
  "path": "accounts/v1/{+parent}/onlineReturnPolicies",
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
  acceptDefectiveOnly: z.boolean().describe(
    "Optional. This field specifies if business only accepts defective products for returns.",
  ).optional(),
  acceptExchange: z.boolean().describe(
    "Optional. This field specifies if business allows customers to exchange products.",
  ).optional(),
  countries: z.array(z.string()).describe(
    "Required. Immutable. The countries of sale where the return policy applies. The values must be a valid 2 letter ISO 3166 code.",
  ).optional(),
  itemConditions: z.array(z.enum(["ITEM_CONDITION_UNSPECIFIED", "NEW", "USED"]))
    .describe(
      "Optional. The item conditions accepted for returns must not be empty unless the type of return policy is 'noReturns'.",
    ).optional(),
  label: z.string().describe(
    "Optional. Immutable. This field represents the unique user-defined label of the return policy for the given country. It is important to note that the same label cannot be used in different return policies for the same country. If not given, policies will be automatically treated as the 'default' for the country. When using label, you are creating an exception policy in that country to assign a custom return policy to certain product groups, follow the instructions provided in the [Return policy label] (https://support.google.com/merchants/answer/9445425). The label can contain up to 50 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the `OnlineReturnPolicy` resource. Format: `accounts/{account}/onlineReturnPolicies/{return_policy}`",
  ).optional(),
  policy: z.object({
    days: z.string().describe(
      "The number of days items can be returned after delivery, where one day is defined as 24 hours after the delivery timestamp. Required for `NUMBER_OF_DAYS_AFTER_DELIVERY` returns.",
    ).optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "NUMBER_OF_DAYS_AFTER_DELIVERY",
      "NO_RETURNS",
      "LIFETIME_RETURNS",
    ]).describe("Policy type.").optional(),
  }).describe("The available policies.").optional(),
  processRefundDays: z.number().int().describe(
    "Optional. The field specifies the number of days it takes for business to process refunds.",
  ).optional(),
  restockingFee: z.object({
    fixedFee: z.object({
      amountMicros: z.string().describe(
        "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
      ).optional(),
      currencyCode: z.string().describe(
        "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
      ).optional(),
    }).describe("The price represented as a number and currency.").optional(),
    microPercent: z.number().int().describe(
      "Percent of total price in micros. 15,000,000 means 15% of the total price would be charged.",
    ).optional(),
  }).describe("The restocking fee. This can be a flat fee or a micro percent.")
    .optional(),
  returnLabelSource: z.enum([
    "RETURN_LABEL_SOURCE_UNSPECIFIED",
    "DOWNLOAD_AND_PRINT",
    "IN_THE_PACKAGE",
    "CUSTOMER_RESPONSIBILITY",
  ]).describe("Optional. The field specifies the return label source.")
    .optional(),
  returnMethods: z.array(
    z.enum(["RETURN_METHOD_UNSPECIFIED", "BY_MAIL", "IN_STORE", "AT_A_KIOSK"]),
  ).describe(
    "Optional. The return methods of how customers can return an item. This value is required to not be empty unless the type of return policy is noReturns.",
  ).optional(),
  returnPolicyUri: z.string().describe(
    "Required. The return policy uri. This can used by Google to do a sanity check for the policy. It must be a valid URL.",
  ).optional(),
  returnShippingFee: z.object({
    fixedFee: z.object({
      amountMicros: z.string().describe(
        "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
      ).optional(),
      currencyCode: z.string().describe(
        "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
      ).optional(),
    }).describe("The price represented as a number and currency.").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "FIXED", "CUSTOMER_PAYING_ACTUAL_FEE"])
      .describe("Required. Type of return shipping fee.").optional(),
  }).describe(
    "The return shipping fee. This can either be a fixed fee or a boolean to indicate that the customer pays the actual shipping cost.",
  ).optional(),
  seasonalOverrides: z.array(z.object({
    endDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    label: z.string().describe(
      "Required. Display name of this seasonal override in Merchant Center.",
    ).optional(),
    returnDays: z.number().int().describe(
      "Number of days (from the delivery date) that the product can be returned.",
    ).optional(),
    returnUntilDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    startDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
  })).describe(
    "Optional. Overrides to the general policy for orders placed during a specific set of time intervals.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  acceptDefectiveOnly: z.boolean().optional(),
  acceptExchange: z.boolean().optional(),
  countries: z.array(z.string()).optional(),
  itemConditions: z.array(z.string()).optional(),
  label: z.string().optional(),
  name: z.string(),
  policy: z.object({
    days: z.string(),
    type: z.string(),
  }).optional(),
  processRefundDays: z.number().optional(),
  restockingFee: z.object({
    fixedFee: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    microPercent: z.number(),
  }).optional(),
  returnLabelSource: z.string().optional(),
  returnMethods: z.array(z.string()).optional(),
  returnPolicyId: z.string().optional(),
  returnPolicyUri: z.string().optional(),
  returnShippingFee: z.object({
    fixedFee: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    type: z.string(),
  }).optional(),
  seasonalOverrides: z.array(z.object({
    endDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    label: z.string(),
    returnDays: z.number(),
    returnUntilDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    startDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  acceptDefectiveOnly: z.boolean().describe(
    "Optional. This field specifies if business only accepts defective products for returns.",
  ).optional(),
  acceptExchange: z.boolean().describe(
    "Optional. This field specifies if business allows customers to exchange products.",
  ).optional(),
  countries: z.array(z.string()).describe(
    "Required. Immutable. The countries of sale where the return policy applies. The values must be a valid 2 letter ISO 3166 code.",
  ).optional(),
  itemConditions: z.array(z.enum(["ITEM_CONDITION_UNSPECIFIED", "NEW", "USED"]))
    .describe(
      "Optional. The item conditions accepted for returns must not be empty unless the type of return policy is 'noReturns'.",
    ).optional(),
  label: z.string().describe(
    "Optional. Immutable. This field represents the unique user-defined label of the return policy for the given country. It is important to note that the same label cannot be used in different return policies for the same country. If not given, policies will be automatically treated as the 'default' for the country. When using label, you are creating an exception policy in that country to assign a custom return policy to certain product groups, follow the instructions provided in the [Return policy label] (https://support.google.com/merchants/answer/9445425). The label can contain up to 50 characters.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the `OnlineReturnPolicy` resource. Format: `accounts/{account}/onlineReturnPolicies/{return_policy}`",
  ).optional(),
  policy: z.object({
    days: z.string().describe(
      "The number of days items can be returned after delivery, where one day is defined as 24 hours after the delivery timestamp. Required for `NUMBER_OF_DAYS_AFTER_DELIVERY` returns.",
    ).optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "NUMBER_OF_DAYS_AFTER_DELIVERY",
      "NO_RETURNS",
      "LIFETIME_RETURNS",
    ]).describe("Policy type.").optional(),
  }).describe("The available policies.").optional(),
  processRefundDays: z.number().int().describe(
    "Optional. The field specifies the number of days it takes for business to process refunds.",
  ).optional(),
  restockingFee: z.object({
    fixedFee: z.object({
      amountMicros: z.string().describe(
        "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
      ).optional(),
      currencyCode: z.string().describe(
        "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
      ).optional(),
    }).describe("The price represented as a number and currency.").optional(),
    microPercent: z.number().int().describe(
      "Percent of total price in micros. 15,000,000 means 15% of the total price would be charged.",
    ).optional(),
  }).describe("The restocking fee. This can be a flat fee or a micro percent.")
    .optional(),
  returnLabelSource: z.enum([
    "RETURN_LABEL_SOURCE_UNSPECIFIED",
    "DOWNLOAD_AND_PRINT",
    "IN_THE_PACKAGE",
    "CUSTOMER_RESPONSIBILITY",
  ]).describe("Optional. The field specifies the return label source.")
    .optional(),
  returnMethods: z.array(
    z.enum(["RETURN_METHOD_UNSPECIFIED", "BY_MAIL", "IN_STORE", "AT_A_KIOSK"]),
  ).describe(
    "Optional. The return methods of how customers can return an item. This value is required to not be empty unless the type of return policy is noReturns.",
  ).optional(),
  returnPolicyUri: z.string().describe(
    "Required. The return policy uri. This can used by Google to do a sanity check for the policy. It must be a valid URL.",
  ).optional(),
  returnShippingFee: z.object({
    fixedFee: z.object({
      amountMicros: z.string().describe(
        "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
      ).optional(),
      currencyCode: z.string().describe(
        "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
      ).optional(),
    }).describe("The price represented as a number and currency.").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "FIXED", "CUSTOMER_PAYING_ACTUAL_FEE"])
      .describe("Required. Type of return shipping fee.").optional(),
  }).describe(
    "The return shipping fee. This can either be a fixed fee or a boolean to indicate that the customer pays the actual shipping cost.",
  ).optional(),
  seasonalOverrides: z.array(z.object({
    endDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    label: z.string().describe(
      "Required. Display name of this seasonal override in Merchant Center.",
    ).optional(),
    returnDays: z.number().int().describe(
      "Number of days (from the delivery date) that the product can be returned.",
    ).optional(),
    returnUntilDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    startDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
  })).describe(
    "Optional. Overrides to the general policy for orders placed during a specific set of time intervals.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Merchant Accounts.OnlineReturnPolicies. Registered at `@swamp/gcp/merchantapi/accounts-onlinereturnpolicies`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-onlinereturnpolicies",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "[Online return policy](https://support.google.com/merchants/answer/10220642) ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a onlineReturnPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["acceptDefectiveOnly"] !== undefined) {
          body["acceptDefectiveOnly"] = g["acceptDefectiveOnly"];
        }
        if (g["acceptExchange"] !== undefined) {
          body["acceptExchange"] = g["acceptExchange"];
        }
        if (g["countries"] !== undefined) body["countries"] = g["countries"];
        if (g["itemConditions"] !== undefined) {
          body["itemConditions"] = g["itemConditions"];
        }
        if (g["label"] !== undefined) body["label"] = g["label"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["policy"] !== undefined) body["policy"] = g["policy"];
        if (g["processRefundDays"] !== undefined) {
          body["processRefundDays"] = g["processRefundDays"];
        }
        if (g["restockingFee"] !== undefined) {
          body["restockingFee"] = g["restockingFee"];
        }
        if (g["returnLabelSource"] !== undefined) {
          body["returnLabelSource"] = g["returnLabelSource"];
        }
        if (g["returnMethods"] !== undefined) {
          body["returnMethods"] = g["returnMethods"];
        }
        if (g["returnPolicyUri"] !== undefined) {
          body["returnPolicyUri"] = g["returnPolicyUri"];
        }
        if (g["returnShippingFee"] !== undefined) {
          body["returnShippingFee"] = g["returnShippingFee"];
        }
        if (g["seasonalOverrides"] !== undefined) {
          body["seasonalOverrides"] = g["seasonalOverrides"];
        }
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
      description: "Get a onlineReturnPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the onlineReturnPolicies"),
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
    delete: {
      description: "Delete the onlineReturnPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the onlineReturnPolicies"),
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
      description: "Sync onlineReturnPolicies state from GCP",
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
    list: {
      description: "List onlineReturnPolicies resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of `OnlineReturnPolicy` resources to return. The service returns fewer than this value if the number of return policies for the given business is less that than the `pageSize`. The default value is 10. The maximum value is 100; If a value higher than the maximum is specified, then the `pageSize` will default to the maximum",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "onlineReturnPolicies",
          (args.maxPages as number | undefined) ?? 10,
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
