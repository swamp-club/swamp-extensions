// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "dfareporting.billingProfiles.list",
  "path": "userprofiles/{+profileId}/billingProfiles",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "currency_code": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "name": {
      "location": "query",
    },
    "onlySuggestion": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "sortField": {
      "location": "query",
    },
    "sortOrder": {
      "location": "query",
    },
    "status": {
      "location": "query",
    },
    "subaccountIds": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Campaign Manager 360 BillingProfiles. Registered at `@swamp/gcp/dfareporting/billingprofiles`. */
export const model = {
  type: "@swamp/gcp/dfareporting/billingprofiles",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List billingProfiles resources",
      arguments: z.object({
        currency_code: z.string().describe(
          "Select only billing profile with currency.",
        ).optional(),
        ids: z.string().describe("Select only billing profile with these IDs.")
          .optional(),
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        name: z.string().describe(
          'Allows searching for billing profiles by name. Wildcards (*) are allowed. For example, "profile*2020" will return objects with names like "profile June 2020", "profile April 2020", or simply "profile 2020". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "profile" will match objects with name "my profile", "profile 2021", or simply "profile".',
        ).optional(),
        onlySuggestion: z.boolean().describe(
          "Select only billing profile which is suggested for the currency_code & subaccount_id using the Billing Suggestion API.",
        ).optional(),
        sortField: z.string().describe("Field by which to sort the list.")
          .optional(),
        sortOrder: z.string().describe("Order of sorted results.").optional(),
        status: z.string().describe(
          "Select only billing profile with the specified status.",
        ).optional(),
        subaccountIds: z.string().describe(
          "Select only billing profile with the specified subaccount.When only_suggestion is true, only a single subaccount_id is supported.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (args["currency_code"] !== undefined) {
          params["currency_code"] = String(args["currency_code"]);
        }
        if (args["ids"] !== undefined) params["ids"] = String(args["ids"]);
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["name"] !== undefined) params["name"] = String(args["name"]);
        if (args["onlySuggestion"] !== undefined) {
          params["onlySuggestion"] = String(args["onlySuggestion"]);
        }
        if (args["sortField"] !== undefined) {
          params["sortField"] = String(args["sortField"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        if (args["status"] !== undefined) {
          params["status"] = String(args["status"]);
        }
        if (args["subaccountIds"] !== undefined) {
          params["subaccountIds"] = String(args["subaccountIds"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "billingProfiles",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
