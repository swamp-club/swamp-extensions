// Auto-generated extension model for @swamp/gcp/dfareporting/billingprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 BillingProfiles.
 *
 * Contains properties of a Campaign Manager Billing Profile.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.billingProfiles.get",
  "path": "userprofiles/{+profileId}/billingProfiles/{+id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dfareporting.billingProfiles.update",
  "path": "userprofiles/{+profileId}/billingProfiles",
  "httpMethod": "PUT",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  consolidatedInvoice: z.boolean().describe(
    "Consolidated invoice option for this billing profile. Used to get a single, consolidated invoice across the chosen invoice level.",
  ).optional(),
  countryCode: z.string().describe(
    "Country code of this billing profile.This is a read-only field.",
  ).optional(),
  currencyCode: z.string().describe(
    "Billing currency code in ISO 4217 format.This is a read-only field.",
  ).optional(),
  id: z.string().describe(
    "ID of this billing profile. This is a read-only, auto-generated field.",
  ).optional(),
  invoiceLevel: z.enum(["ACCOUNT_LEVEL", "ADVERTISER_LEVEL", "CAMPAIGN_LEVEL"])
    .describe(
      "Invoice level for this billing profile. Used to group fees into separate invoices by account, advertiser, or campaign.",
    ).optional(),
  isDefault: z.boolean().describe(
    "True if the billing profile is the account default profile. This is a read-only field.",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "dfareporting#billingProfile".',
  ).optional(),
  name: z.string().describe(
    "Name of this billing profile. This is a required field and must be less than 256 characters long and must be unique among billing profile in the same account.",
  ).optional(),
  paymentsAccountId: z.string().describe(
    "The ID of the payment account the billing profile belongs to. This is a read-only field.",
  ).optional(),
  paymentsCustomerId: z.string().describe(
    "The ID of the payment customer the billing profile belongs to. This is a read-only field.",
  ).optional(),
  purchaseOrder: z.string().describe(
    "Purchase order (PO) for this billing profile. This PO number is used in the invoices for all of the advertisers in this billing profile.",
  ).optional(),
  secondaryPaymentsCustomerId: z.string().describe(
    "The ID of the secondary payment customer the billing profile belongs to. This is a read-only field.",
  ).optional(),
  status: z.enum(["UNDER_REVIEW", "ACTIVE", "ARCHIVED"]).describe(
    "Status of this billing profile.This is a read-only field.",
  ).optional(),
});

const StateSchema = z.object({
  consolidatedInvoice: z.boolean().optional(),
  countryCode: z.string().optional(),
  currencyCode: z.string().optional(),
  id: z.string(),
  invoiceLevel: z.string().optional(),
  isDefault: z.boolean().optional(),
  kind: z.string().optional(),
  name: z.string().optional(),
  paymentsAccountId: z.string().optional(),
  paymentsCustomerId: z.string().optional(),
  purchaseOrder: z.string().optional(),
  secondaryPaymentsCustomerId: z.string().optional(),
  status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  consolidatedInvoice: z.boolean().describe(
    "Consolidated invoice option for this billing profile. Used to get a single, consolidated invoice across the chosen invoice level.",
  ).optional(),
  countryCode: z.string().describe(
    "Country code of this billing profile.This is a read-only field.",
  ).optional(),
  currencyCode: z.string().describe(
    "Billing currency code in ISO 4217 format.This is a read-only field.",
  ).optional(),
  id: z.string().describe(
    "ID of this billing profile. This is a read-only, auto-generated field.",
  ).optional(),
  invoiceLevel: z.enum(["ACCOUNT_LEVEL", "ADVERTISER_LEVEL", "CAMPAIGN_LEVEL"])
    .describe(
      "Invoice level for this billing profile. Used to group fees into separate invoices by account, advertiser, or campaign.",
    ).optional(),
  isDefault: z.boolean().describe(
    "True if the billing profile is the account default profile. This is a read-only field.",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "dfareporting#billingProfile".',
  ).optional(),
  name: z.string().describe(
    "Name of this billing profile. This is a required field and must be less than 256 characters long and must be unique among billing profile in the same account.",
  ).optional(),
  paymentsAccountId: z.string().describe(
    "The ID of the payment account the billing profile belongs to. This is a read-only field.",
  ).optional(),
  paymentsCustomerId: z.string().describe(
    "The ID of the payment customer the billing profile belongs to. This is a read-only field.",
  ).optional(),
  purchaseOrder: z.string().describe(
    "Purchase order (PO) for this billing profile. This PO number is used in the invoices for all of the advertisers in this billing profile.",
  ).optional(),
  secondaryPaymentsCustomerId: z.string().describe(
    "The ID of the secondary payment customer the billing profile belongs to. This is a read-only field.",
  ).optional(),
  status: z.enum(["UNDER_REVIEW", "ACTIVE", "ARCHIVED"]).describe(
    "Status of this billing profile.This is a read-only field.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 BillingProfiles. Registered at `@swamp/gcp/dfareporting/billingprofiles`. */
export const model = {
  type: "@swamp/gcp/dfareporting/billingprofiles",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Contains properties of a Campaign Manager Billing Profile.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a billingProfiles",
      arguments: z.object({
        identifier: z.string().describe("The id of the billingProfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
      description: "Update billingProfiles attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
        params["profileId"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["consolidatedInvoice"] !== undefined) {
          body["consolidatedInvoice"] = g["consolidatedInvoice"];
        }
        if (g["countryCode"] !== undefined) {
          body["countryCode"] = g["countryCode"];
        }
        if (g["currencyCode"] !== undefined) {
          body["currencyCode"] = g["currencyCode"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["invoiceLevel"] !== undefined) {
          body["invoiceLevel"] = g["invoiceLevel"];
        }
        if (g["isDefault"] !== undefined) body["isDefault"] = g["isDefault"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["paymentsAccountId"] !== undefined) {
          body["paymentsAccountId"] = g["paymentsAccountId"];
        }
        if (g["paymentsCustomerId"] !== undefined) {
          body["paymentsCustomerId"] = g["paymentsCustomerId"];
        }
        if (g["purchaseOrder"] !== undefined) {
          body["purchaseOrder"] = g["purchaseOrder"];
        }
        if (g["secondaryPaymentsCustomerId"] !== undefined) {
          body["secondaryPaymentsCustomerId"] =
            g["secondaryPaymentsCustomerId"];
        }
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
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Sync billingProfiles state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
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
