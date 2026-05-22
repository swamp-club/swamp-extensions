// Auto-generated extension model for @swamp/cloudflare/registrar/registrations
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Registrations.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  auto_renew: z.boolean().describe(
    "Enable or disable automatic renewal. Defaults to `false` if omitted.\nSetting this field to `true` is an explicit opt-in authorizing\nCloudflare to charge the account's default payment method up to 30\ndays before domain expiry to renew the domain automatically.\nRenewal pricing may change over time based on registry pricing.\n",
  ).optional(),
  contacts: z.object({
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
  }).describe(
    "Contact data for the registration request.\n\nIf the `contacts` object is omitted entirely from the request, or if\n`contacts.registrant` is not provided, the system will use the account's\ndefault address book entry as the registrant contact. This default must be\npre-configured by the account owner at\n`https://dash.cloudflare.com/{account_id}/domains/registrations`, where\nthey can create or update the address book entry and accept the required\nagreement. No API exists for managing address book entries at this time.\n\nIf no default address book entry exists and no registrant contact is\nprovided, the registration request will fail with a validation error.\n",
  ).optional(),
  domain_name: z.string().describe(
    "Fully qualified domain name (FQDN) including the extension\n(e.g., `example.com`, `mybrand.app`). The domain name uniquely\nidentifies a registration — the same domain cannot be registered\ntwice, making it a natural idempotency key for registration requests.\n",
  ),
  privacy_mode: z.enum([false, "redaction"]).describe(
    "WHOIS privacy mode for the registration. Defaults to `redaction`.\n- `off`: Do not request WHOIS privacy.\n- `redaction`: Request WHOIS redaction where supported by the extension.\n  Some extensions do not support privacy/redaction.\n",
  ).optional(),
  years: z.number().int().min(1).max(10).describe(
    "Number of years to register (1–10). If omitted, defaults to the\nminimum registration period required by the registry for this\nextension. For most extensions this is 1 year, but some extensions\nrequire longer minimum terms (e.g., `.ai` requires a minimum of\n2 years).\n\nThe registry for each extension may also enforce its own maximum\nregistration term. If the requested value exceeds the registry's\nmaximum, the registration will be rejected. When in doubt, use the\ndefault by omitting this field.\n",
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
  contacts: z.object({
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
  }).optional(),
  domain_name: z.string().optional(),
  privacy_mode: z.enum([false, "redaction"]).optional(),
  years: z.number().int().min(1).max(10).optional(),
});

/** Swamp extension model for Cloudflare Registrations. Registered at `@swamp/cloudflare/registrar/registrations`. */
export const model = {
  type: "@swamp/cloudflare/registrar/registrations",
  version: "2026.05.22.1",
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
        if (g.auto_renew !== undefined) body.auto_renew = g.auto_renew;
        if (g.contacts !== undefined) body.contacts = g.contacts;
        if (g.domain_name !== undefined) body.domain_name = g.domain_name;
        if (g.privacy_mode !== undefined) body.privacy_mode = g.privacy_mode;
        if (g.years !== undefined) body.years = g.years;
        const result = await create(endpoint, body) as ResourceData;
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
        const result = await read(endpoint, args.id) as ResourceData;
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
    update: {
      description: "Update Registrations attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/registrar/registrations";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.auto_renew !== undefined) body.auto_renew = g.auto_renew;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PATCH",
        ) as ResourceData;
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
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/registrar/registrations";
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
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const result = await tryRead(endpoint, existing.id) as
          | ResourceData
          | null;
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
