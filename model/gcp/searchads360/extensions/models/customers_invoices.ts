// Auto-generated extension model for @swamp/gcp/searchads360/customers-invoices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Search Ads 360 Reporting Customers.Invoices.
 *
 * An invoice. All invoice information is snapshotted to match the PDF invoice. For invoices older than the launch of InvoiceService, the snapshotted information may not match the PDF invoice.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://searchads360.googleapis.com/";

const LIST_CONFIG = {
  "id": "searchads360.customers.invoices.list",
  "path": "v23/customers/{+customerId}/invoices",
  "httpMethod": "GET",
  "parameterOrder": [
    "customerId",
  ],
  "parameters": {
    "billingSetup": {
      "location": "query",
    },
    "customerId": {
      "location": "path",
      "required": true,
    },
    "includeGranularLevelInvoiceDetails": {
      "location": "query",
    },
    "issueMonth": {
      "location": "query",
    },
    "issueYear": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  accountBudgetSummaries: z.array(z.object({
    accountBudget: z.string(),
    accountBudgetName: z.string(),
    billableActivityDateRange: z.object({
      endDate: z.string(),
      startDate: z.string(),
    }),
    billedAmountMicros: z.string(),
    campaignSummaries: z.array(z.object({
      amountMicros: z.string(),
      campaignDescription: z.string(),
      quantity: z.string(),
      unitOfMeasure: z.string(),
    })),
    customer: z.string(),
    customerDescriptiveName: z.string(),
    invalidActivityAmountMicros: z.string(),
    invalidActivitySummaries: z.array(z.object({
      amountMicros: z.string(),
      originalAccountBudgetName: z.string(),
      originalInvoiceId: z.string(),
      originalMonthOfService: z.string(),
      originalPurchaseOrderNumber: z.string(),
      originalYearOfService: z.string(),
    })),
    overdeliveryAmountMicros: z.string(),
    purchaseOrderNumber: z.string(),
    servedAmountMicros: z.string(),
    subtotalAmountMicros: z.string(),
    taxAmountMicros: z.string(),
    totalAmountMicros: z.string(),
  })).optional(),
  accountSummaries: z.array(z.object({
    adjustmentSummaries: z.array(z.object({
      adjustmentDescription: z.string(),
      amountMicros: z.string(),
    })),
    billingCorrectionSubtotalAmountMicros: z.string(),
    billingCorrectionTaxAmountMicros: z.string(),
    billingCorrectionTotalAmountMicros: z.string(),
    couponAdjustmentSubtotalAmountMicros: z.string(),
    couponAdjustmentTaxAmountMicros: z.string(),
    couponAdjustmentTotalAmountMicros: z.string(),
    customer: z.string(),
    excessCreditAdjustmentSubtotalAmountMicros: z.string(),
    excessCreditAdjustmentTaxAmountMicros: z.string(),
    excessCreditAdjustmentTotalAmountMicros: z.string(),
    exportChargeSubtotalAmountMicros: z.string(),
    exportChargeTaxAmountMicros: z.string(),
    exportChargeTotalAmountMicros: z.string(),
    regulatoryCostSummaries: z.array(z.object({
      amountMicros: z.string(),
      regulatoryFeeType: z.string(),
    })),
    regulatoryCostsSubtotalAmountMicros: z.string(),
    regulatoryCostsTaxAmountMicros: z.string(),
    regulatoryCostsTotalAmountMicros: z.string(),
    subtotalAmountMicros: z.string(),
    taxAmountMicros: z.string(),
    totalAmountMicros: z.string(),
  })).optional(),
  adjustmentsSubtotalAmountMicros: z.string().optional(),
  adjustmentsTaxAmountMicros: z.string().optional(),
  adjustmentsTotalAmountMicros: z.string().optional(),
  billingSetup: z.string().optional(),
  correctedInvoice: z.string().optional(),
  currencyCode: z.string().optional(),
  dueDate: z.string().optional(),
  exportChargeSubtotalAmountMicros: z.string().optional(),
  exportChargeTaxAmountMicros: z.string().optional(),
  exportChargeTotalAmountMicros: z.string().optional(),
  id: z.string().optional(),
  issueDate: z.string().optional(),
  paymentsAccountId: z.string().optional(),
  paymentsProfileId: z.string().optional(),
  pdfUrl: z.string().optional(),
  regulatoryCostsSubtotalAmountMicros: z.string().optional(),
  regulatoryCostsTaxAmountMicros: z.string().optional(),
  regulatoryCostsTotalAmountMicros: z.string().optional(),
  replacedInvoices: z.array(z.string()).optional(),
  resourceName: z.string().optional(),
  serviceDateRange: z.object({
    endDate: z.string(),
    startDate: z.string(),
  }).optional(),
  subtotalAmountMicros: z.string().optional(),
  taxAmountMicros: z.string().optional(),
  totalAmountMicros: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Search Ads 360 Reporting Customers.Invoices. Registered at `@swamp/gcp/searchads360/customers-invoices`. */
export const model = {
  type: "@swamp/gcp/searchads360/customers-invoices",
  version: "2026.05.24.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An invoice. All invoice information is snapshotted to match the PDF invoice. ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a invoices",
      arguments: z.object({
        identifier: z.string().describe("The name of the invoices"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync invoices state from GCP",
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
          if (g["customerId"] !== undefined) {
            params["customerId"] = String(g["customerId"]);
          } else if (existing["customerId"]) {
            params["customerId"] = String(existing["customerId"]);
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
