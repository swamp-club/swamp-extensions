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

// Auto-generated extension model for @swamp/cloudflare/registrar/registrations
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Registrations.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, listAll, read, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  auto_renew: z.boolean().describe(
    "Enable or disable automatic renewal. Defaults to `false` if omitted.\nSetting this field to `true` is an explicit opt-in authorizing\nCloudflare to charge the account's default payment method up to 30\ndays before domain expiry to renew the domain automatically.\nRenewal pricing may change over time based on registry pricing.\n",
  ).optional(),
  acknowledgements: z.record(z.string(), z.unknown()).describe(
    "Provides user acknowledgements for a specific extension or premium\nregistration flow. The extension registration schema from the\nextension discovery endpoint identifies the required keys.\n",
  ).optional(),
  contact_extensions: z.record(z.string(), z.unknown()).describe(
    "Provides registry-specific contact extension values for the registrant.\n`GET /accounts/{account_id}/registrar/extensions/{extension}` identifies\nthe required keys and allowed values for each extension in the\n`registration_schema.properties.contact_extensions` object.\n\nExamples include `.us` nexus fields, `.uk` registrant type fields,\nand `.ca` legal type fields. Omit this object when the extension's\nregistration schema excludes `contact_extensions`.\n",
  ).optional(),
  contacts: z.object({
    administrator: z.object({
      email: z.string(),
      fax: z.string().optional(),
      phone: z.string(),
      postal_info: z.object({
        address: z.object({
          city: z.string(),
          country_code: z.string(),
          postal_code: z.string(),
          state: z.string(),
          street: z.string(),
        }),
        name: z.string(),
        organization: z.string().optional(),
      }),
    }).optional(),
    billing: z.object({
      email: z.string(),
      fax: z.string().optional(),
      phone: z.string(),
      postal_info: z.object({
        address: z.object({
          city: z.string(),
          country_code: z.string(),
          postal_code: z.string(),
          state: z.string(),
          street: z.string(),
        }),
        name: z.string(),
        organization: z.string().optional(),
      }),
    }).optional(),
    registrant: z.object({
      email: z.string(),
      fax: z.string().optional(),
      phone: z.string(),
      postal_info: z.object({
        address: z.object({
          city: z.string(),
          country_code: z.string(),
          postal_code: z.string(),
          state: z.string(),
          street: z.string(),
        }),
        name: z.string(),
        organization: z.string().optional(),
      }),
    }).optional(),
    technical: z.object({
      email: z.string(),
      fax: z.string().optional(),
      phone: z.string(),
      postal_info: z.object({
        address: z.object({
          city: z.string(),
          country_code: z.string(),
          postal_code: z.string(),
          state: z.string(),
          street: z.string(),
        }),
        name: z.string(),
        organization: z.string().optional(),
      }),
    }).optional(),
  }).describe(
    "Provides contact data for the registration request.\n\nThe per-extension schema from\n`GET /accounts/{account_id}/registrar/extensions/{extension}` defines the\naccepted contact roles. Every currently supported extension requires only\n`contacts.registrant` from API callers. Callers may provide additional roles\nsuch as `technical`, `administrator`, and `billing` when the extension\nschema includes them. When a registry requires an omitted role, Cloudflare\nmay derive that contact from `contacts.registrant`.\n\nWhen the request omits either the entire `contacts` object or\n`contacts.registrant`, the system uses the account's default address book\nentry as the registrant contact. The account owner must configure this\ndefault at `https://dash.cloudflare.com/{account_id}/domains/registrations`,\nwhere they can create or update the address book entry and accept the\nrequired agreement. Dashboard settings currently provide the only way to\nmanage address book entries.\n\nWithout either a default address book entry or a registrant contact, the\nregistration request fails validation.\n",
  ).optional(),
  domain_name: z.string().describe(
    "Provides a fully qualified domain name (FQDN), including the extension\n(e.g., `example.com`, `mybrand.app`). The domain name uniquely identifies\na registration. Cloudflare permits only one registration per domain, making\nthe domain name a natural idempotency key for registration requests.\n",
  ),
  privacy_mode: z.enum(["off", "redaction"]).describe(
    "Sets the WHOIS privacy mode for the registration. Defaults to `redaction`.\n- `off`: Disables WHOIS privacy.\n- `redaction`: Requests WHOIS redaction where the extension supports it.\n  Some extensions exclude privacy and redaction.\n",
  ).optional(),
  years: z.number().int().min(1).max(10).describe(
    "Sets the registration term from 1 to 10 years. When omitted, this\nfield defaults to the registry's minimum registration period for the\nextension. Most extensions require 1 year, while some require longer\nminimum terms (e.g., `.ai` requires 2 years).\n\nEach registry may also enforce its own maximum registration term. A\nrequest above that maximum fails. When uncertain, omit this field to\nuse the default.\n",
  ).optional(),
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
  auto_renew: z.boolean().optional(),
  created_at: z.string().optional(),
  domain_name: z.string().optional(),
  expires_at: z.string().optional(),
  locked: z.boolean().optional(),
  privacy_mode: z.string().optional(),
  status: z.string().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  auto_renew: z.boolean().optional(),
  acknowledgements: z.record(z.string(), z.unknown()).optional(),
  contact_extensions: z.record(z.string(), z.unknown()).optional(),
  contacts: z.object({
    administrator: z.object({
      email: z.string(),
      fax: z.string().optional(),
      phone: z.string(),
      postal_info: z.object({
        address: z.object({
          city: z.string(),
          country_code: z.string(),
          postal_code: z.string(),
          state: z.string(),
          street: z.string(),
        }),
        name: z.string(),
        organization: z.string().optional(),
      }),
    }).optional(),
    billing: z.object({
      email: z.string(),
      fax: z.string().optional(),
      phone: z.string(),
      postal_info: z.object({
        address: z.object({
          city: z.string(),
          country_code: z.string(),
          postal_code: z.string(),
          state: z.string(),
          street: z.string(),
        }),
        name: z.string(),
        organization: z.string().optional(),
      }),
    }).optional(),
    registrant: z.object({
      email: z.string(),
      fax: z.string().optional(),
      phone: z.string(),
      postal_info: z.object({
        address: z.object({
          city: z.string(),
          country_code: z.string(),
          postal_code: z.string(),
          state: z.string(),
          street: z.string(),
        }),
        name: z.string(),
        organization: z.string().optional(),
      }),
    }).optional(),
    technical: z.object({
      email: z.string(),
      fax: z.string().optional(),
      phone: z.string(),
      postal_info: z.object({
        address: z.object({
          city: z.string(),
          country_code: z.string(),
          postal_code: z.string(),
          state: z.string(),
          street: z.string(),
        }),
        name: z.string(),
        organization: z.string().optional(),
      }),
    }).optional(),
  }).optional(),
  domain_name: z.string().optional(),
  privacy_mode: z.enum(["off", "redaction"]).optional(),
  years: z.number().int().min(1).max(10).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Registrations. Registered at `@swamp/cloudflare/registrar/registrations`. */
export const model = {
  type: "@swamp/cloudflare/registrar/registrations",
  version: "2026.09.01.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.24.1",
      description: "Added: acknowledgements, contact_extensions",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "Added: acknowledgements, contact_extensions",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Registrations resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Registrations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/registrar/registrations";
        const body: Record<string, unknown> = {};
        if (g.acknowledgements !== undefined) {
          body.acknowledgements = g.acknowledgements;
        }
        if (g.auto_renew !== undefined) body.auto_renew = g.auto_renew;
        if (g.contact_extensions !== undefined) {
          body.contact_extensions = g.contact_extensions;
        }
        if (g.contacts !== undefined) body.contacts = g.contacts;
        if (g.domain_name !== undefined) body.domain_name = g.domain_name;
        if (g.privacy_mode !== undefined) body.privacy_mode = g.privacy_mode;
        if (g.years !== undefined) body.years = g.years;
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
      description: "Get a Registrations",
      arguments: z.object({
        id: z.string().describe("The ID of the Registrations"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/registrar/registrations";
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
        "Look up an existing Registrations by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/registrar/registrations";
        const filters: [string, string][] = [];
        if (g.auto_renew !== undefined) {
          filters.push(["auto_renew", String(g.auto_renew)]);
        }
        if (g.domain_name !== undefined) {
          filters.push(["domain_name", String(g.domain_name)]);
        }
        if (g.privacy_mode !== undefined) {
          filters.push(["privacy_mode", String(g.privacy_mode)]);
        }
        if (g.years !== undefined) filters.push(["years", String(g.years)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "cursor", undefined, {
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
            `No registrations found matching filters: ${filterDesc}`,
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
        "Import an existing Registrations by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Registrations to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/registrar/registrations";
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
      description: "Update Registrations attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Registrations by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/registrar/registrations";
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
        if (g.auto_renew !== undefined) body.auto_renew = g.auto_renew;
        const result = await update(endpoint, existing.id, body, "PATCH", {
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
    sync: {
      description: "Sync Registrations state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Registrations by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/registrar/registrations";
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
