// Auto-generated extension model for @swamp/gcp/cloudchannel/accounts-customers-entitlements
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Channel Accounts.Customers.Entitlements.
 *
 * An entitlement is a representation of a customer's ability to use a service.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/entitlements/${shortName}`;
}

const BASE_URL = "https://cloudchannel.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudchannel.accounts.customers.entitlements.get",
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
  "id": "cloudchannel.accounts.customers.entitlements.create",
  "path": "v1/{+parent}/entitlements",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  entitlement: z.object({
    associationInfo: z.object({
      baseEntitlement: z.string().describe(
        "The name of the base entitlement, for which this entitlement is an add-on.",
      ).optional(),
    }).describe(
      "Association links that an entitlement has to other entitlements.",
    ).optional(),
    billingAccount: z.string().describe(
      "Optional. The billing account resource name that is used to pay for this entitlement.",
    ).optional(),
    commitmentSettings: z.object({
      endTime: z.string().describe("Output only. Commitment end timestamp.")
        .optional(),
      renewalSettings: z.object({
        enableRenewal: z.boolean().describe(
          "If false, the plan will be completed at the end date.",
        ).optional(),
        paymentCycle: z.object({
          duration: z.number().int().describe(
            "Total duration of Period Type defined.",
          ).optional(),
          periodType: z.enum([
            "PERIOD_TYPE_UNSPECIFIED",
            "DAY",
            "MONTH",
            "YEAR",
          ]).describe("Period Type.").optional(),
        }).describe("Represents period in days/months/years.").optional(),
        paymentPlan: z.enum([
          "PAYMENT_PLAN_UNSPECIFIED",
          "COMMITMENT",
          "FLEXIBLE",
          "FREE",
          "TRIAL",
          "OFFLINE",
        ]).describe("Describes how a reseller will be billed.").optional(),
        resizeUnitCount: z.boolean().describe(
          "If true and enable_renewal = true, the unit (for example seats or licenses) will be set to the number of active units at renewal time.",
        ).optional(),
      }).describe("Renewal settings for renewable Offers.").optional(),
      startTime: z.string().describe("Output only. Commitment start timestamp.")
        .optional(),
    }).describe("Commitment settings for commitment-based offers.").optional(),
    createTime: z.string().describe(
      "Output only. The time at which the entitlement is created.",
    ).optional(),
    name: z.string().describe(
      "Output only. Resource name of an entitlement in the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}.",
    ).optional(),
    offer: z.string().describe(
      "Required. The offer resource name for which the entitlement is to be created. Takes the form: accounts/{account_id}/offers/{offer_id}.",
    ).optional(),
    parameters: z.array(z.object({
      editable: z.boolean().describe(
        "Output only. Specifies whether this parameter is allowed to be changed. For example, for a Google Workspace Business Starter entitlement in commitment plan, num_units is editable when entitlement is active.",
      ).optional(),
      name: z.string().describe("Name of the parameter.").optional(),
      value: z.object({
        boolValue: z.boolean().describe("Represents a boolean value.")
          .optional(),
        doubleValue: z.number().describe("Represents a double value.")
          .optional(),
        int64Value: z.string().describe("Represents an int64 value.")
          .optional(),
        protoValue: z.record(z.string(), z.unknown()).describe(
          "Represents an 'Any' proto value.",
        ).optional(),
        stringValue: z.string().describe("Represents a string value.")
          .optional(),
      }).describe("Data type and value of a parameter.").optional(),
    })).describe(
      "Extended entitlement parameters. When creating an entitlement, valid parameter names and values are defined in the Offer.parameter_definitions. For Google Workspace, the following Parameters may be accepted as input: - max_units: The maximum assignable units for a flexible offer OR - num_units: The total commitment for commitment-based offers The response may additionally include the following output-only Parameters: - assigned_units: The number of licenses assigned to users. For Google Cloud billing subaccounts, the following Parameter may be accepted as input: - display_name: The display name of the billing subaccount.",
    ).optional(),
    priceReferenceId: z.string().describe(
      "Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order.",
    ).optional(),
    provisionedService: z.object({
      productId: z.string().describe(
        "Output only. The product pertaining to the provisioning resource as specified in the Offer.",
      ).optional(),
      provisioningId: z.string().describe(
        "Output only. Provisioning ID of the entitlement. For Google Workspace, this is the underlying Subscription ID. For Google Cloud, this is the Billing Account ID of the billing subaccount.",
      ).optional(),
      skuId: z.string().describe(
        "Output only. The SKU pertaining to the provisioning resource as specified in the Offer.",
      ).optional(),
    }).describe("Service provisioned for an entitlement.").optional(),
    provisioningState: z.enum([
      "PROVISIONING_STATE_UNSPECIFIED",
      "ACTIVE",
      "SUSPENDED",
    ]).describe("Output only. Current provisioning state of the entitlement.")
      .optional(),
    purchaseOrderId: z.string().describe(
      "Optional. This purchase order (PO) information is for resellers to use for their company tracking usage. If a purchaseOrderId value is given, it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters. This is only supported for Google Workspace entitlements.",
    ).optional(),
    suspensionReasons: z.array(
      z.enum([
        "SUSPENSION_REASON_UNSPECIFIED",
        "RESELLER_INITIATED",
        "TRIAL_ENDED",
        "RENEWAL_WITH_TYPE_CANCEL",
        "PENDING_TOS_ACCEPTANCE",
        "OTHER",
      ]),
    ).describe(
      "Output only. Enumerable of all current suspension reasons for an entitlement.",
    ).optional(),
    trialSettings: z.object({
      endTime: z.string().describe(
        "Date when the trial ends. The value is in milliseconds using the UNIX Epoch format. See an example [Epoch converter](https://www.epochconverter.com).",
      ).optional(),
      trial: z.boolean().describe(
        "Determines if the entitlement is in a trial or not: * `true` - The entitlement is in trial. * `false` - The entitlement is not in trial.",
      ).optional(),
    }).describe("Settings for trial offers.").optional(),
    updateTime: z.string().describe(
      "Output only. The time at which the entitlement is updated.",
    ).optional(),
  }).describe(
    "An entitlement is a representation of a customer's ability to use a service.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  associationInfo: z.object({
    baseEntitlement: z.string(),
  }).optional(),
  billingAccount: z.string().optional(),
  commitmentSettings: z.object({
    endTime: z.string(),
    renewalSettings: z.object({
      enableRenewal: z.boolean(),
      paymentCycle: z.object({
        duration: z.number(),
        periodType: z.string(),
      }),
      paymentPlan: z.string(),
      resizeUnitCount: z.boolean(),
    }),
    startTime: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  name: z.string(),
  offer: z.string().optional(),
  parameters: z.array(z.object({
    editable: z.boolean(),
    name: z.string(),
    value: z.object({
      boolValue: z.boolean(),
      doubleValue: z.number(),
      int64Value: z.string(),
      protoValue: z.record(z.string(), z.unknown()),
      stringValue: z.string(),
    }),
  })).optional(),
  priceReferenceId: z.string().optional(),
  provisionedService: z.object({
    productId: z.string(),
    provisioningId: z.string(),
    skuId: z.string(),
  }).optional(),
  provisioningState: z.string().optional(),
  purchaseOrderId: z.string().optional(),
  suspensionReasons: z.array(z.string()).optional(),
  trialSettings: z.object({
    endTime: z.string(),
    trial: z.boolean(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  entitlement: z.object({
    associationInfo: z.object({
      baseEntitlement: z.string().describe(
        "The name of the base entitlement, for which this entitlement is an add-on.",
      ).optional(),
    }).describe(
      "Association links that an entitlement has to other entitlements.",
    ).optional(),
    billingAccount: z.string().describe(
      "Optional. The billing account resource name that is used to pay for this entitlement.",
    ).optional(),
    commitmentSettings: z.object({
      endTime: z.string().describe("Output only. Commitment end timestamp.")
        .optional(),
      renewalSettings: z.object({
        enableRenewal: z.boolean().describe(
          "If false, the plan will be completed at the end date.",
        ).optional(),
        paymentCycle: z.object({
          duration: z.number().int().describe(
            "Total duration of Period Type defined.",
          ).optional(),
          periodType: z.enum([
            "PERIOD_TYPE_UNSPECIFIED",
            "DAY",
            "MONTH",
            "YEAR",
          ]).describe("Period Type.").optional(),
        }).describe("Represents period in days/months/years.").optional(),
        paymentPlan: z.enum([
          "PAYMENT_PLAN_UNSPECIFIED",
          "COMMITMENT",
          "FLEXIBLE",
          "FREE",
          "TRIAL",
          "OFFLINE",
        ]).describe("Describes how a reseller will be billed.").optional(),
        resizeUnitCount: z.boolean().describe(
          "If true and enable_renewal = true, the unit (for example seats or licenses) will be set to the number of active units at renewal time.",
        ).optional(),
      }).describe("Renewal settings for renewable Offers.").optional(),
      startTime: z.string().describe("Output only. Commitment start timestamp.")
        .optional(),
    }).describe("Commitment settings for commitment-based offers.").optional(),
    createTime: z.string().describe(
      "Output only. The time at which the entitlement is created.",
    ).optional(),
    name: z.string().describe(
      "Output only. Resource name of an entitlement in the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}.",
    ).optional(),
    offer: z.string().describe(
      "Required. The offer resource name for which the entitlement is to be created. Takes the form: accounts/{account_id}/offers/{offer_id}.",
    ).optional(),
    parameters: z.array(z.object({
      editable: z.boolean().describe(
        "Output only. Specifies whether this parameter is allowed to be changed. For example, for a Google Workspace Business Starter entitlement in commitment plan, num_units is editable when entitlement is active.",
      ).optional(),
      name: z.string().describe("Name of the parameter.").optional(),
      value: z.object({
        boolValue: z.boolean().describe("Represents a boolean value.")
          .optional(),
        doubleValue: z.number().describe("Represents a double value.")
          .optional(),
        int64Value: z.string().describe("Represents an int64 value.")
          .optional(),
        protoValue: z.record(z.string(), z.unknown()).describe(
          "Represents an 'Any' proto value.",
        ).optional(),
        stringValue: z.string().describe("Represents a string value.")
          .optional(),
      }).describe("Data type and value of a parameter.").optional(),
    })).describe(
      "Extended entitlement parameters. When creating an entitlement, valid parameter names and values are defined in the Offer.parameter_definitions. For Google Workspace, the following Parameters may be accepted as input: - max_units: The maximum assignable units for a flexible offer OR - num_units: The total commitment for commitment-based offers The response may additionally include the following output-only Parameters: - assigned_units: The number of licenses assigned to users. For Google Cloud billing subaccounts, the following Parameter may be accepted as input: - display_name: The display name of the billing subaccount.",
    ).optional(),
    priceReferenceId: z.string().describe(
      "Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order.",
    ).optional(),
    provisionedService: z.object({
      productId: z.string().describe(
        "Output only. The product pertaining to the provisioning resource as specified in the Offer.",
      ).optional(),
      provisioningId: z.string().describe(
        "Output only. Provisioning ID of the entitlement. For Google Workspace, this is the underlying Subscription ID. For Google Cloud, this is the Billing Account ID of the billing subaccount.",
      ).optional(),
      skuId: z.string().describe(
        "Output only. The SKU pertaining to the provisioning resource as specified in the Offer.",
      ).optional(),
    }).describe("Service provisioned for an entitlement.").optional(),
    provisioningState: z.enum([
      "PROVISIONING_STATE_UNSPECIFIED",
      "ACTIVE",
      "SUSPENDED",
    ]).describe("Output only. Current provisioning state of the entitlement.")
      .optional(),
    purchaseOrderId: z.string().describe(
      "Optional. This purchase order (PO) information is for resellers to use for their company tracking usage. If a purchaseOrderId value is given, it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters. This is only supported for Google Workspace entitlements.",
    ).optional(),
    suspensionReasons: z.array(
      z.enum([
        "SUSPENSION_REASON_UNSPECIFIED",
        "RESELLER_INITIATED",
        "TRIAL_ENDED",
        "RENEWAL_WITH_TYPE_CANCEL",
        "PENDING_TOS_ACCEPTANCE",
        "OTHER",
      ]),
    ).describe(
      "Output only. Enumerable of all current suspension reasons for an entitlement.",
    ).optional(),
    trialSettings: z.object({
      endTime: z.string().describe(
        "Date when the trial ends. The value is in milliseconds using the UNIX Epoch format. See an example [Epoch converter](https://www.epochconverter.com).",
      ).optional(),
      trial: z.boolean().describe(
        "Determines if the entitlement is in a trial or not: * `true` - The entitlement is in trial. * `false` - The entitlement is not in trial.",
      ).optional(),
    }).describe("Settings for trial offers.").optional(),
    updateTime: z.string().describe(
      "Output only. The time at which the entitlement is updated.",
    ).optional(),
  }).describe(
    "An entitlement is a representation of a customer's ability to use a service.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Channel Accounts.Customers.Entitlements. Registered at `@swamp/gcp/cloudchannel/accounts-customers-entitlements`. */
export const model = {
  type: "@swamp/gcp/cloudchannel/accounts-customers-entitlements",
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
      toVersion: "2026.04.04.1",
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
      description:
        "An entitlement is a representation of a customer's ability to use a service.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a entitlements",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["entitlement"] !== undefined) {
          body["entitlement"] = g["entitlement"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
      description: "Get a entitlements",
      arguments: z.object({
        identifier: z.string().describe("The name of the entitlements"),
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
    sync: {
      description: "Sync entitlements state from GCP",
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
    activate: {
      description: "activate",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudchannel.accounts.customers.entitlements.activate",
            "path": "v1/{+name}:activate",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    cancel: {
      description: "cancel",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudchannel.accounts.customers.entitlements.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    change_offer: {
      description: "change offer",
      arguments: z.object({
        billingAccount: z.any().optional(),
        offer: z.any().optional(),
        parameters: z.any().optional(),
        priceReferenceId: z.any().optional(),
        purchaseOrderId: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["billingAccount"] !== undefined) {
          body["billingAccount"] = args["billingAccount"];
        }
        if (args["offer"] !== undefined) body["offer"] = args["offer"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["priceReferenceId"] !== undefined) {
          body["priceReferenceId"] = args["priceReferenceId"];
        }
        if (args["purchaseOrderId"] !== undefined) {
          body["purchaseOrderId"] = args["purchaseOrderId"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudchannel.accounts.customers.entitlements.changeOffer",
            "path": "v1/{+name}:changeOffer",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    change_parameters: {
      description: "change parameters",
      arguments: z.object({
        parameters: z.any().optional(),
        purchaseOrderId: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["purchaseOrderId"] !== undefined) {
          body["purchaseOrderId"] = args["purchaseOrderId"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudchannel.accounts.customers.entitlements.changeParameters",
            "path": "v1/{+name}:changeParameters",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    change_renewal_settings: {
      description: "change renewal settings",
      arguments: z.object({
        renewalSettings: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["renewalSettings"] !== undefined) {
          body["renewalSettings"] = args["renewalSettings"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudchannel.accounts.customers.entitlements.changeRenewalSettings",
            "path": "v1/{+name}:changeRenewalSettings",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_entitlement_changes: {
      description: "list entitlement changes",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudchannel.accounts.customers.entitlements.listEntitlementChanges",
            "path": "v1/{+parent}:listEntitlementChanges",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "filter": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    lookup_offer: {
      description: "lookup offer",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["entitlement"] !== undefined) {
          params["entitlement"] = String(g["entitlement"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudchannel.accounts.customers.entitlements.lookupOffer",
            "path": "v1/{+entitlement}:lookupOffer",
            "httpMethod": "GET",
            "parameterOrder": ["entitlement"],
            "parameters": {
              "entitlement": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    start_paid_service: {
      description: "start paid service",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudchannel.accounts.customers.entitlements.startPaidService",
            "path": "v1/{+name}:startPaidService",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    suspend: {
      description: "suspend",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudchannel.accounts.customers.entitlements.suspend",
            "path": "v1/{+name}:suspend",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
