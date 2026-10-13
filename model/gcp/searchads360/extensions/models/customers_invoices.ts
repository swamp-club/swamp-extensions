// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/doubleclicksearch",
];

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  customerId: z.string().describe(
    "Required. The ID of the customer to fetch invoices for.",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  customerId: z.string().describe(
    "Required. The ID of the customer to fetch invoices for.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Search Ads 360 Reporting Customers.Invoices. Registered at `@swamp/gcp/searchads360/customers-invoices`. */
export const model = {
  type: "@swamp/gcp/searchads360/customers-invoices",
  version: "2026.10.13.1",
  upgrades: [
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
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
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        const result = await readViaList(
          baseUrl,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
          credentials,
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific invoices by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
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
            baseUrl,
            LIST_CONFIG,
            params,
            "name",
            identifier,
            credentials,
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
      description: "List invoices resources",
      arguments: z.object({
        billingSetup: z.string().describe(
          "Required. The billing setup resource name of the requested invoices. `customers/{customer_id}/billingSetups/{billing_setup_id}`",
        ).optional(),
        includeGranularLevelInvoiceDetails: z.boolean().describe(
          "Optional. When true, the response will include more granular level invoice details such as campaign level cost breakdown, itemized regulatory costs and adjustments. The default value is false.",
        ).optional(),
        issueMonth: z.string().describe(
          "Required. The issue month to retrieve invoices.",
        ).optional(),
        issueYear: z.string().describe(
          "Required. The issue year to retrieve invoices, in yyyy format. Only invoices issued in 2019 or later can be retrieved.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        if (args["billingSetup"] !== undefined) {
          params["billingSetup"] = String(args["billingSetup"]);
        }
        if (args["includeGranularLevelInvoiceDetails"] !== undefined) {
          params["includeGranularLevelInvoiceDetails"] = String(
            args["includeGranularLevelInvoiceDetails"],
          );
        }
        if (args["issueMonth"] !== undefined) {
          params["issueMonth"] = String(args["issueMonth"]);
        }
        if (args["issueYear"] !== undefined) {
          params["issueYear"] = String(args["issueYear"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "invoices",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
