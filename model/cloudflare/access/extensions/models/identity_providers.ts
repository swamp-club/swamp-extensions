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

// Auto-generated extension model for @swamp/cloudflare/access/identity-providers
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Identity Providers.
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
  account_id: z.string().optional().describe(
    "Cloudflare account ID (provide account_id or zone_id)",
  ),
  zone_id: z.string().optional().describe(
    "Cloudflare zone ID (provide account_id or zone_id)",
  ),
  config: z.object({
    client_id: z.string().optional(),
    client_secret: z.string().optional(),
    claims: z.array(z.string()).optional(),
    email_claim_name: z.string().optional(),
    conditional_access_enabled: z.boolean().optional(),
    directory_id: z.string().optional(),
    prompt: z.enum(["login", "select_account", "none"]).optional(),
    support_groups: z.boolean().optional(),
  }).optional(),
  id: z.string().max(36).describe("UUID.").optional(),
  name: z.string().describe(
    "The name of the identity provider, shown to users on the login page.",
  ).optional(),
  read_only: z.boolean().describe(
    "Indicates that the identity provider is immutable and cannot be updated or deleted via the API.\n",
  ).optional(),
  saml_certificate_set: z.object({
    created_at: z.string(),
    current_certificate: z.object({
      is_current: z.boolean(),
      not_after: z.string(),
      public_certificate: z.string(),
      uid: z.string(),
    }).optional(),
    previous_certificate: z.record(z.string(), z.unknown()).optional(),
    uid: z.string(),
    updated_at: z.string(),
  }).describe(
    "A SAML encryption certificate set containing current and optionally previous certificates for encryption key rotation.",
  ).optional(),
  saml_certificate_set_id: z.string().describe(
    "The UID of the SAML encryption certificate set assigned to this Identity Provider.\nOnly present for SAML identity providers with encryption configured.\nCreate a certificate set via POST to `/identity_providers/{id}/saml_certificate`.\n",
  ).optional(),
  scim_config: z.object({
    enabled: z.boolean().optional(),
    identity_update_behavior: z.enum(["automatic", "reauth", "no_action"])
      .optional(),
    scim_base_url: z.string().optional(),
    seat_deprovision: z.boolean().optional(),
    secret: z.string().optional(),
    user_deprovision: z.boolean().optional(),
  }).describe(
    "The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.",
  ).optional(),
  type: z.enum([
    "onetimepin",
    "azureAD",
    "saml",
    "centrify",
    "facebook",
    "github",
    "google-apps",
    "google",
    "linkedin",
    "oidc",
    "okta",
    "onelogin",
    "pingone",
    "yandex",
    "cloudflare",
  ]).describe(
    "The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).",
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
  errors: z.array(z.object({
    code: z.number().optional(),
    documentation_url: z.string().optional(),
    message: z.string().optional(),
    source: z.object({
      pointer: z.string().optional(),
    }).optional(),
  })).optional(),
  messages: z.array(z.object({
    code: z.number().optional(),
    documentation_url: z.string().optional(),
    message: z.string().optional(),
    source: z.object({
      pointer: z.string().optional(),
    }).optional(),
  })).optional(),
  success: z.boolean().optional(),
  result: z.object({
    config: z.object({
      client_id: z.string().optional(),
      client_secret: z.string().optional(),
      claims: z.array(z.string()).optional(),
      email_claim_name: z.string().optional(),
      conditional_access_enabled: z.boolean().optional(),
      directory_id: z.string().optional(),
      prompt: z.string().optional(),
      support_groups: z.boolean().optional(),
    }).optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    read_only: z.boolean().optional(),
    saml_certificate_set: z.object({
      created_at: z.string().optional(),
      current_certificate: z.object({
        is_current: z.boolean().optional(),
        not_after: z.string().optional(),
        public_certificate: z.string().optional(),
        uid: z.string().optional(),
      }).optional(),
      previous_certificate: z.record(z.string(), z.unknown()).optional(),
      uid: z.string().optional(),
      updated_at: z.string().optional(),
    }).optional(),
    saml_certificate_set_id: z.string().optional(),
    scim_config: z.object({
      enabled: z.boolean().optional(),
      identity_update_behavior: z.string().optional(),
      scim_base_url: z.string().optional(),
      seat_deprovision: z.boolean().optional(),
      secret: z.string().optional(),
      user_deprovision: z.boolean().optional(),
    }).optional(),
    type: z.string().optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  zone_id: z.string().optional(),
  config: z.object({
    client_id: z.string().optional(),
    client_secret: z.string().optional(),
    claims: z.array(z.string()).optional(),
    email_claim_name: z.string().optional(),
    conditional_access_enabled: z.boolean().optional(),
    directory_id: z.string().optional(),
    prompt: z.enum(["login", "select_account", "none"]).optional(),
    support_groups: z.boolean().optional(),
  }).optional(),
  id: z.string().max(36).optional(),
  name: z.string().optional(),
  read_only: z.boolean().optional(),
  saml_certificate_set: z.object({
    created_at: z.string(),
    current_certificate: z.object({
      is_current: z.boolean(),
      not_after: z.string(),
      public_certificate: z.string(),
      uid: z.string(),
    }).optional(),
    previous_certificate: z.record(z.string(), z.unknown()).optional(),
    uid: z.string(),
    updated_at: z.string(),
  }).optional(),
  saml_certificate_set_id: z.string().optional(),
  scim_config: z.object({
    enabled: z.boolean().optional(),
    identity_update_behavior: z.enum(["automatic", "reauth", "no_action"])
      .optional(),
    scim_base_url: z.string().optional(),
    seat_deprovision: z.boolean().optional(),
    secret: z.string().optional(),
    user_deprovision: z.boolean().optional(),
  }).optional(),
  type: z.enum([
    "onetimepin",
    "azureAD",
    "saml",
    "centrify",
    "facebook",
    "github",
    "google-apps",
    "google",
    "linkedin",
    "oidc",
    "okta",
    "onelogin",
    "pingone",
    "yandex",
    "cloudflare",
  ]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Identity Providers. Registered at `@swamp/cloudflare/access/identity-providers`. */
export const model = {
  type: "@swamp/cloudflare/access/identity-providers",
  version: "2026.09.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "Added: read_only",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.2",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "Added: read_only",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      description: "Identity Providers resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Identity Providers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["config", "name", "type"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/identity_providers";
        const body: Record<string, unknown> = {};
        if (g.config !== undefined) body.config = g.config;
        if (g.id !== undefined) body.id = g.id;
        if (g.name !== undefined) body.name = g.name;
        if (g.read_only !== undefined) body.read_only = g.read_only;
        if (g.saml_certificate_set !== undefined) {
          body.saml_certificate_set = g.saml_certificate_set;
        }
        if (g.saml_certificate_set_id !== undefined) {
          body.saml_certificate_set_id = g.saml_certificate_set_id;
        }
        if (g.scim_config !== undefined) body.scim_config = g.scim_config;
        if (g.type !== undefined) body.type = g.type;
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
      description: "Get a Identity Providers",
      arguments: z.object({
        id: z.string().describe("The ID of the Identity Providers"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/identity_providers";
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
        "Look up an existing Identity Providers by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/identity_providers";
        const filters: [string, string][] = [];
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.read_only !== undefined) {
          filters.push(["read_only", String(g.read_only)]);
        }
        if (g.saml_certificate_set_id !== undefined) {
          filters.push([
            "saml_certificate_set_id",
            String(g.saml_certificate_set_id),
          ]);
        }
        if (g.type !== undefined) filters.push(["type", String(g.type)]);
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
            `No identity providers found matching filters: ${filterDesc}`,
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
        "Import an existing Identity Providers by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Identity Providers to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/identity_providers";
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
      description: "Update Identity Providers attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Identity Providers by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/identity_providers";
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
        if (g.config !== undefined) body.config = g.config;
        if (g.id !== undefined) body.id = g.id;
        if (g.name !== undefined) body.name = g.name;
        if (g.read_only !== undefined) body.read_only = g.read_only;
        if (g.saml_certificate_set !== undefined) {
          body.saml_certificate_set = g.saml_certificate_set;
        }
        if (g.saml_certificate_set_id !== undefined) {
          body.saml_certificate_set_id = g.saml_certificate_set_id;
        }
        if (g.scim_config !== undefined) body.scim_config = g.scim_config;
        if (g.type !== undefined) body.type = g.type;
        const unset = ["config", "name", "type"].filter((k) =>
          body[k] === undefined
        );
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) if (live[k] !== undefined) body[k] = live[k];
        }
        const missingForUpdate = ["config", "name", "type"].filter((k) =>
          body[k] === undefined
        );
        if (missingForUpdate.length > 0) {
          throw new Error(
            "update requires global arguments: " + missingForUpdate.join(", "),
          );
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
      description: "Delete the Identity Providers",
      arguments: z.object({
        id: z.string().describe("The ID of the Identity Providers"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/identity_providers";
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
      description: "Sync Identity Providers state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Identity Providers by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/identity_providers";
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
