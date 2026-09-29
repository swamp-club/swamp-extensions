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

// Auto-generated extension model for @swamp/cloudflare/payment-methods/payment-methods
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Payment-methods.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  listAll,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  address: z.string().describe("Billing address line 1.").optional(),
  address2: z.string().describe("Billing address line 2.").optional(),
  bank_account_type: z.string().describe("Bank account type.").optional(),
  bank_code: z.string().describe("Bank code.").optional(),
  bank_country: z.string().describe("Bank country.").optional(),
  bank_name: z.string().describe("Bank name for bank-based payment methods.")
    .optional(),
  bank_routing_number: z.string().describe("Bank routing number.").optional(),
  cashapp_cash_tag: z.string().describe("Cash App cash tag.").optional(),
  city: z.string().describe("Billing city.").optional(),
  country: z.string().describe("Billing country.").optional(),
  default: z.boolean().describe("Whether this is the default payment method.")
    .optional(),
  device_data: z.string().describe("Device data for fraud prevention.")
    .optional(),
  expiration_date: z.string().describe("Card expiration date.").optional(),
  first_name: z.string().describe("Billing first name.").optional(),
  id: z.string().describe("Payment method identifier.").optional(),
  last_four: z.string().describe("Last four digits of the card number.")
    .optional(),
  last_name: z.string().describe("Billing last name.").optional(),
  nick_name: z.string().describe("A nickname for the payment method.")
    .optional(),
  payment_account_email: z.string().describe(
    "Email associated with the payment account.",
  ).optional(),
  payment_email: z.string().describe("Payment email address.").optional(),
  payment_gateway: z.string().describe("The payment gateway used.").optional(),
  payment_nonce: z.string().describe("Payment nonce for tokenized payments.")
    .optional(),
  state: z.string().describe("Billing state.").optional(),
  type: z.enum([
    "CREDIT_CARD",
    "PAYPAL",
    "CASHAPP",
    "SEPA_DEBIT",
    "LINK",
    "ACH_DIRECT_DEBIT",
  ]).describe("The payment method type.").optional(),
  zipcode: z.string().describe("Billing zip code.").optional(),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  address: z.string().optional(),
  address2: z.string().optional(),
  bank_account_type: z.string().optional(),
  bank_code: z.string().optional(),
  bank_country: z.string().optional(),
  bank_name: z.string().optional(),
  bank_routing_number: z.string().optional(),
  cashapp_cash_tag: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  default: z.boolean().optional(),
  device_data: z.string().optional(),
  expiration_date: z.string().optional(),
  first_name: z.string().optional(),
  id: z.string(),
  last_four: z.string().optional(),
  last_name: z.string().optional(),
  nick_name: z.string().optional(),
  payment_account_email: z.string().optional(),
  payment_email: z.string().optional(),
  payment_gateway: z.string().optional(),
  payment_nonce: z.string().optional(),
  state: z.string().optional(),
  type: z.string().optional(),
  zipcode: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  address2: z.string().optional(),
  bank_account_type: z.string().optional(),
  bank_code: z.string().optional(),
  bank_country: z.string().optional(),
  bank_name: z.string().optional(),
  bank_routing_number: z.string().optional(),
  cashapp_cash_tag: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  default: z.boolean().optional(),
  device_data: z.string().optional(),
  expiration_date: z.string().optional(),
  first_name: z.string().optional(),
  id: z.string().optional(),
  last_four: z.string().optional(),
  last_name: z.string().optional(),
  nick_name: z.string().optional(),
  payment_account_email: z.string().optional(),
  payment_email: z.string().optional(),
  payment_gateway: z.string().optional(),
  payment_nonce: z.string().optional(),
  state: z.string().optional(),
  type: z.enum([
    "CREDIT_CARD",
    "PAYPAL",
    "CASHAPP",
    "SEPA_DEBIT",
    "LINK",
    "ACH_DIRECT_DEBIT",
  ]).optional(),
  zipcode: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Payment-methods. Registered at `@swamp/cloudflare/payment-methods/payment-methods`. */
export const model = {
  type: "@swamp/cloudflare/payment-methods/payment-methods",
  version: "2026.09.29.1",
  upgrades: [
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Payment-methods resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Payment-methods",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/payment-methods";
        const body: Record<string, unknown> = {};
        if (g.address !== undefined) body.address = g.address;
        if (g.address2 !== undefined) body.address2 = g.address2;
        if (g.bank_account_type !== undefined) {
          body.bank_account_type = g.bank_account_type;
        }
        if (g.bank_code !== undefined) body.bank_code = g.bank_code;
        if (g.bank_country !== undefined) body.bank_country = g.bank_country;
        if (g.bank_name !== undefined) body.bank_name = g.bank_name;
        if (g.bank_routing_number !== undefined) {
          body.bank_routing_number = g.bank_routing_number;
        }
        if (g.cashapp_cash_tag !== undefined) {
          body.cashapp_cash_tag = g.cashapp_cash_tag;
        }
        if (g.city !== undefined) body.city = g.city;
        if (g.country !== undefined) body.country = g.country;
        if (g.default !== undefined) body.default = g.default;
        if (g.device_data !== undefined) body.device_data = g.device_data;
        if (g.expiration_date !== undefined) {
          body.expiration_date = g.expiration_date;
        }
        if (g.first_name !== undefined) body.first_name = g.first_name;
        if (g.id !== undefined) body.id = g.id;
        if (g.last_four !== undefined) body.last_four = g.last_four;
        if (g.last_name !== undefined) body.last_name = g.last_name;
        if (g.nick_name !== undefined) body.nick_name = g.nick_name;
        if (g.payment_account_email !== undefined) {
          body.payment_account_email = g.payment_account_email;
        }
        if (g.payment_email !== undefined) body.payment_email = g.payment_email;
        if (g.payment_gateway !== undefined) {
          body.payment_gateway = g.payment_gateway;
        }
        if (g.payment_nonce !== undefined) body.payment_nonce = g.payment_nonce;
        if (g.state !== undefined) body.state = g.state;
        if (g.type !== undefined) body.type = g.type;
        if (g.zipcode !== undefined) body.zipcode = g.zipcode;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Get a Payment-methods",
      arguments: z.object({
        id: z.string().describe("The ID of the Payment-methods"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/payment-methods";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.name?.toString() ?? args.id).replace(
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
    lookup: {
      description:
        "Look up an existing Payment-methods by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/payment-methods";
        const filters: [string, string][] = [];
        if (g.address !== undefined) {
          filters.push(["address", String(g.address)]);
        }
        if (g.address2 !== undefined) {
          filters.push(["address2", String(g.address2)]);
        }
        if (g.bank_account_type !== undefined) {
          filters.push(["bank_account_type", String(g.bank_account_type)]);
        }
        if (g.bank_code !== undefined) {
          filters.push(["bank_code", String(g.bank_code)]);
        }
        if (g.bank_country !== undefined) {
          filters.push(["bank_country", String(g.bank_country)]);
        }
        if (g.bank_name !== undefined) {
          filters.push(["bank_name", String(g.bank_name)]);
        }
        if (g.bank_routing_number !== undefined) {
          filters.push(["bank_routing_number", String(g.bank_routing_number)]);
        }
        if (g.cashapp_cash_tag !== undefined) {
          filters.push(["cashapp_cash_tag", String(g.cashapp_cash_tag)]);
        }
        if (g.city !== undefined) filters.push(["city", String(g.city)]);
        if (g.country !== undefined) {
          filters.push(["country", String(g.country)]);
        }
        if (g.default !== undefined) {
          filters.push(["default", String(g.default)]);
        }
        if (g.device_data !== undefined) {
          filters.push(["device_data", String(g.device_data)]);
        }
        if (g.expiration_date !== undefined) {
          filters.push(["expiration_date", String(g.expiration_date)]);
        }
        if (g.first_name !== undefined) {
          filters.push(["first_name", String(g.first_name)]);
        }
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (g.last_four !== undefined) {
          filters.push(["last_four", String(g.last_four)]);
        }
        if (g.last_name !== undefined) {
          filters.push(["last_name", String(g.last_name)]);
        }
        if (g.nick_name !== undefined) {
          filters.push(["nick_name", String(g.nick_name)]);
        }
        if (g.payment_account_email !== undefined) {
          filters.push([
            "payment_account_email",
            String(g.payment_account_email),
          ]);
        }
        if (g.payment_email !== undefined) {
          filters.push(["payment_email", String(g.payment_email)]);
        }
        if (g.payment_gateway !== undefined) {
          filters.push(["payment_gateway", String(g.payment_gateway)]);
        }
        if (g.payment_nonce !== undefined) {
          filters.push(["payment_nonce", String(g.payment_nonce)]);
        }
        if (g.state !== undefined) filters.push(["state", String(g.state)]);
        if (g.type !== undefined) filters.push(["type", String(g.type)]);
        if (g.zipcode !== undefined) {
          filters.push(["zipcode", String(g.zipcode)]);
        }
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "page", undefined, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const matches = items.filter((item) => {
          for (const [key, val] of filters) {
            if (String((item as Record<string, unknown>)[key]) !== val) {
              return false;
            }
          }
          return true;
        });
        if (matches.length === 0) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `No payment-methods found matching filters: ${filterDesc}`,
          );
        }
        if (matches.length > 1) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `Expected exactly 1 match, found ${matches.length} for filters: ${filterDesc}`,
          );
        }
        const result = matches[0] as ResourceData;
        const instanceName =
          (g.name?.toString() ?? result.id?.toString() ?? "current").replace(
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
    adopt: {
      description:
        "Import an existing Payment-methods by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Payment-methods to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/payment-methods";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName =
          (result.name?.toString() ?? g.name?.toString() ?? args.id).replace(
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
      description: "Update Payment-methods attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Payment-methods by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/payment-methods";
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
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.address !== undefined) body.address = g.address;
        if (g.address2 !== undefined) body.address2 = g.address2;
        if (g.bank_account_type !== undefined) {
          body.bank_account_type = g.bank_account_type;
        }
        if (g.bank_code !== undefined) body.bank_code = g.bank_code;
        if (g.bank_country !== undefined) body.bank_country = g.bank_country;
        if (g.bank_name !== undefined) body.bank_name = g.bank_name;
        if (g.bank_routing_number !== undefined) {
          body.bank_routing_number = g.bank_routing_number;
        }
        if (g.cashapp_cash_tag !== undefined) {
          body.cashapp_cash_tag = g.cashapp_cash_tag;
        }
        if (g.city !== undefined) body.city = g.city;
        if (g.country !== undefined) body.country = g.country;
        if (g.default !== undefined) body.default = g.default;
        if (g.device_data !== undefined) body.device_data = g.device_data;
        if (g.expiration_date !== undefined) {
          body.expiration_date = g.expiration_date;
        }
        if (g.first_name !== undefined) body.first_name = g.first_name;
        if (g.id !== undefined) body.id = g.id;
        if (g.last_four !== undefined) body.last_four = g.last_four;
        if (g.last_name !== undefined) body.last_name = g.last_name;
        if (g.nick_name !== undefined) body.nick_name = g.nick_name;
        if (g.payment_account_email !== undefined) {
          body.payment_account_email = g.payment_account_email;
        }
        if (g.payment_email !== undefined) body.payment_email = g.payment_email;
        if (g.payment_gateway !== undefined) {
          body.payment_gateway = g.payment_gateway;
        }
        if (g.payment_nonce !== undefined) body.payment_nonce = g.payment_nonce;
        if (g.state !== undefined) body.state = g.state;
        if (g.type !== undefined) body.type = g.type;
        if (g.zipcode !== undefined) body.zipcode = g.zipcode;
        const unset = [
          "address",
          "address2",
          "bank_account_type",
          "bank_code",
          "bank_country",
          "bank_name",
          "bank_routing_number",
          "cashapp_cash_tag",
          "city",
          "country",
          "default",
          "device_data",
          "expiration_date",
          "first_name",
          "id",
          "last_four",
          "last_name",
          "nick_name",
          "payment_account_email",
          "payment_email",
          "payment_gateway",
          "payment_nonce",
          "state",
          "type",
          "zipcode",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const result = await update(endpoint, existing.id, body, "PUT", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Payment-methods",
      arguments: z.object({
        id: z.string().describe("The ID of the Payment-methods"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/payment-methods";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync Payment-methods state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Payment-methods by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/payment-methods";
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
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
