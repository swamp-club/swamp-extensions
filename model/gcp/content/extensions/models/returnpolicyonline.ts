// Auto-generated extension model for @swamp/gcp/content/returnpolicyonline
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Returnpolicyonline.
 *
 * Return policy online object. This is currently used to represent return policies for ads and free listings programs.
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

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.returnpolicyonline.get",
  "path": "{merchantId}/returnpolicyonline/{returnPolicyId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "returnPolicyId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "returnPolicyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "content.returnpolicyonline.create",
  "path": "{merchantId}/returnpolicyonline",
  "httpMethod": "POST",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "content.returnpolicyonline.patch",
  "path": "{merchantId}/returnpolicyonline/{returnPolicyId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "merchantId",
    "returnPolicyId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "returnPolicyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "content.returnpolicyonline.delete",
  "path": "{merchantId}/returnpolicyonline/{returnPolicyId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "merchantId",
    "returnPolicyId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "returnPolicyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  countries: z.array(z.string()).describe(
    'The countries of sale where the return policy is applicable. The values must be a valid 2 letter ISO 3166 code, e.g. "US".',
  ).optional(),
  itemConditions: z.array(z.enum(["ITEM_CONDITION_UNSPECIFIED", "NEW", "USED"]))
    .describe(
      "The item conditions that are accepted for returns. This is required to not be empty unless the type of return policy is noReturns.",
    ).optional(),
  label: z.string().describe(
    "The unique user-defined label of the return policy. The same label cannot be used in different return policies for the same country. Policies with the label 'default' will apply to all products, unless a product specifies a return_policy_label attribute.",
  ).optional(),
  name: z.string().describe(
    "The name of the policy as shown in Merchant Center.",
  ).optional(),
  policy: z.object({
    days: z.string().describe(
      "The number of days items can be returned after delivery, where one day is defined to be 24 hours after the delivery timestamp. Required for `numberOfDaysAfterDelivery` returns.",
    ).optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "NUMBER_OF_DAYS_AFTER_DELIVERY",
      "NO_RETURNS",
      "LIFETIME_RETURNS",
    ]).describe("Policy type.").optional(),
  }).describe("The available policies.").optional(),
  restockingFee: z.object({
    fixedFee: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).describe("The price represented as a number and currency.").optional(),
    microPercent: z.number().int().describe(
      "Percent of total price in micros. 15,000,000 means 15% of the total price would be charged.",
    ).optional(),
  }).describe(
    "The restocking fee. This can either be a fixed fee or a micro percent.",
  ).optional(),
  returnMethods: z.array(
    z.enum(["RETURN_METHOD_UNSPECIFIED", "BY_MAIL", "IN_STORE", "AT_A_KIOSK"]),
  ).describe(
    "The return methods of how customers can return an item. This value is required to not be empty unless the type of return policy is noReturns.",
  ).optional(),
  returnPolicyUri: z.string().describe(
    "The return policy uri. This can used by Google to do a sanity check for the policy.",
  ).optional(),
  returnReasonCategoryInfo: z.array(z.object({
    returnLabelSource: z.enum([
      "RETURN_LABEL_SOURCE_UNSPECIFIED",
      "DOWNLOAD_AND_PRINT",
      "IN_THE_BOX",
      "CUSTOMER_RESPONSIBILITY",
    ]).describe(
      "The corresponding return label source. If the `ReturnMethod` field includes `BY_MAIL`, it is required to specify `ReturnLabelSource` for both `BUYER_REMORSE` and `ITEM_DEFECT` return reason categories.",
    ).optional(),
    returnReasonCategory: z.enum([
      "RETURN_REASON_CATEGORY_UNSPECIFIED",
      "BUYER_REMORSE",
      "ITEM_DEFECT",
    ]).describe("The return reason category.").optional(),
    returnShippingFee: z.object({
      fixedFee: z.object({
        currency: z.string().describe("The currency of the price.").optional(),
        value: z.string().describe("The price represented as a number.")
          .optional(),
      }).describe("The price represented as a number and currency.").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "FIXED", "CUSTOMER_PAYING_ACTUAL_FEE"])
        .describe("Type of return shipping fee.").optional(),
    }).describe(
      "The return shipping fee. This can either be a fixed fee or a boolean to indicate that the customer pays the actual shipping cost.",
    ).optional(),
  })).describe(
    "The return reason category information. This required to not be empty unless the type of return policy is noReturns.",
  ).optional(),
  merchantId: z.string().describe(
    "Required. The id of the merchant for which to retrieve the return policy online object.",
  ),
});

const StateSchema = z.object({
  countries: z.array(z.string()).optional(),
  itemConditions: z.array(z.string()).optional(),
  label: z.string().optional(),
  name: z.string(),
  policy: z.object({
    days: z.string(),
    type: z.string(),
  }).optional(),
  restockingFee: z.object({
    fixedFee: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    microPercent: z.number(),
  }).optional(),
  returnMethods: z.array(z.string()).optional(),
  returnPolicyId: z.string().optional(),
  returnPolicyUri: z.string().optional(),
  returnReasonCategoryInfo: z.array(z.object({
    returnLabelSource: z.string(),
    returnReasonCategory: z.string(),
    returnShippingFee: z.object({
      fixedFee: z.object({
        currency: z.string(),
        value: z.string(),
      }),
      type: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  countries: z.array(z.string()).describe(
    'The countries of sale where the return policy is applicable. The values must be a valid 2 letter ISO 3166 code, e.g. "US".',
  ).optional(),
  itemConditions: z.array(z.enum(["ITEM_CONDITION_UNSPECIFIED", "NEW", "USED"]))
    .describe(
      "The item conditions that are accepted for returns. This is required to not be empty unless the type of return policy is noReturns.",
    ).optional(),
  label: z.string().describe(
    "The unique user-defined label of the return policy. The same label cannot be used in different return policies for the same country. Policies with the label 'default' will apply to all products, unless a product specifies a return_policy_label attribute.",
  ).optional(),
  name: z.string().describe(
    "The name of the policy as shown in Merchant Center.",
  ).optional(),
  policy: z.object({
    days: z.string().describe(
      "The number of days items can be returned after delivery, where one day is defined to be 24 hours after the delivery timestamp. Required for `numberOfDaysAfterDelivery` returns.",
    ).optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "NUMBER_OF_DAYS_AFTER_DELIVERY",
      "NO_RETURNS",
      "LIFETIME_RETURNS",
    ]).describe("Policy type.").optional(),
  }).describe("The available policies.").optional(),
  restockingFee: z.object({
    fixedFee: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).describe("The price represented as a number and currency.").optional(),
    microPercent: z.number().int().describe(
      "Percent of total price in micros. 15,000,000 means 15% of the total price would be charged.",
    ).optional(),
  }).describe(
    "The restocking fee. This can either be a fixed fee or a micro percent.",
  ).optional(),
  returnMethods: z.array(
    z.enum(["RETURN_METHOD_UNSPECIFIED", "BY_MAIL", "IN_STORE", "AT_A_KIOSK"]),
  ).describe(
    "The return methods of how customers can return an item. This value is required to not be empty unless the type of return policy is noReturns.",
  ).optional(),
  returnPolicyUri: z.string().describe(
    "The return policy uri. This can used by Google to do a sanity check for the policy.",
  ).optional(),
  returnReasonCategoryInfo: z.array(z.object({
    returnLabelSource: z.enum([
      "RETURN_LABEL_SOURCE_UNSPECIFIED",
      "DOWNLOAD_AND_PRINT",
      "IN_THE_BOX",
      "CUSTOMER_RESPONSIBILITY",
    ]).describe(
      "The corresponding return label source. If the `ReturnMethod` field includes `BY_MAIL`, it is required to specify `ReturnLabelSource` for both `BUYER_REMORSE` and `ITEM_DEFECT` return reason categories.",
    ).optional(),
    returnReasonCategory: z.enum([
      "RETURN_REASON_CATEGORY_UNSPECIFIED",
      "BUYER_REMORSE",
      "ITEM_DEFECT",
    ]).describe("The return reason category.").optional(),
    returnShippingFee: z.object({
      fixedFee: z.object({
        currency: z.string().describe("The currency of the price.").optional(),
        value: z.string().describe("The price represented as a number.")
          .optional(),
      }).describe("The price represented as a number and currency.").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "FIXED", "CUSTOMER_PAYING_ACTUAL_FEE"])
        .describe("Type of return shipping fee.").optional(),
    }).describe(
      "The return shipping fee. This can either be a fixed fee or a boolean to indicate that the customer pays the actual shipping cost.",
    ).optional(),
  })).describe(
    "The return reason category information. This required to not be empty unless the type of return policy is noReturns.",
  ).optional(),
  merchantId: z.string().describe(
    "Required. The id of the merchant for which to retrieve the return policy online object.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Returnpolicyonline. Registered at `@swamp/gcp/content/returnpolicyonline`. */
export const model = {
  type: "@swamp/gcp/content/returnpolicyonline",
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
        "Return policy online object. This is currently used to represent return polic...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a returnpolicyonline",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["countries"] !== undefined) body["countries"] = g["countries"];
        if (g["itemConditions"] !== undefined) {
          body["itemConditions"] = g["itemConditions"];
        }
        if (g["label"] !== undefined) body["label"] = g["label"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["policy"] !== undefined) body["policy"] = g["policy"];
        if (g["restockingFee"] !== undefined) {
          body["restockingFee"] = g["restockingFee"];
        }
        if (g["returnMethods"] !== undefined) {
          body["returnMethods"] = g["returnMethods"];
        }
        if (g["returnPolicyUri"] !== undefined) {
          body["returnPolicyUri"] = g["returnPolicyUri"];
        }
        if (g["returnReasonCategoryInfo"] !== undefined) {
          body["returnReasonCategoryInfo"] = g["returnReasonCategoryInfo"];
        }
        if (g["name"] !== undefined) {
          params["returnPolicyId"] = String(g["name"]);
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
      description: "Get a returnpolicyonline",
      arguments: z.object({
        identifier: z.string().describe("The name of the returnpolicyonline"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["returnPolicyId"] = args.identifier;
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
      description: "Update returnpolicyonline attributes",
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
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        } else if (existing["merchantId"]) {
          params["merchantId"] = String(existing["merchantId"]);
        }
        params["returnPolicyId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["countries"] !== undefined) body["countries"] = g["countries"];
        if (g["itemConditions"] !== undefined) {
          body["itemConditions"] = g["itemConditions"];
        }
        if (g["label"] !== undefined) body["label"] = g["label"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["policy"] !== undefined) body["policy"] = g["policy"];
        if (g["restockingFee"] !== undefined) {
          body["restockingFee"] = g["restockingFee"];
        }
        if (g["returnMethods"] !== undefined) {
          body["returnMethods"] = g["returnMethods"];
        }
        if (g["returnPolicyUri"] !== undefined) {
          body["returnPolicyUri"] = g["returnPolicyUri"];
        }
        if (g["returnReasonCategoryInfo"] !== undefined) {
          body["returnReasonCategoryInfo"] = g["returnReasonCategoryInfo"];
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
      description: "Delete the returnpolicyonline",
      arguments: z.object({
        identifier: z.string().describe("The name of the returnpolicyonline"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["returnPolicyId"] = args.identifier;
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
      description: "Sync returnpolicyonline state from GCP",
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
          if (g["merchantId"] !== undefined) {
            params["merchantId"] = String(g["merchantId"]);
          } else if (existing["merchantId"]) {
            params["merchantId"] = String(existing["merchantId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["returnPolicyId"] = identifier;
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
