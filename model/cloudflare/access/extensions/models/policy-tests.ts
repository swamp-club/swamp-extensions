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

// Auto-generated extension model for @swamp/cloudflare/access/policy-tests
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Policy-tests.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, listAll, read, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  policies: z.array(z.object({
    decision: z.enum(["allow", "deny", "non_identity", "bypass"]),
    exclude: z.array(z.object({
      group: z.object({
        id: z.string(),
      }).optional(),
      any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
      auth_context: z.object({
        ac_id: z.string(),
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      auth_method: z.object({
        auth_method: z.string(),
      }).optional(),
      azureAD: z.object({
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      certificate: z.record(z.string(), z.unknown()).optional(),
      common_name: z.object({
        common_name: z.string(),
      }).optional(),
      geo: z.object({
        country_code: z.string(),
      }).optional(),
      device_posture: z.object({
        account_id: z.string().optional(),
        integration_uid: z.string(),
      }).optional(),
      email_domain: z.object({
        domain: z.string(),
      }).optional(),
      email_list: z.object({
        id: z.string(),
      }).optional(),
      email: z.object({
        email: z.string(),
      }).optional(),
      everyone: z.record(z.string(), z.unknown()).optional(),
      external_evaluation: z.object({
        evaluate_url: z.string(),
        keys_url: z.string(),
      }).optional(),
      "github-organization": z.object({
        identity_provider_id: z.string(),
        name: z.string(),
        team: z.string().optional(),
      }).optional(),
      gsuite: z.object({
        email: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      login_method: z.object({
        id: z.string(),
      }).optional(),
      ip_list: z.object({
        id: z.string(),
      }).optional(),
      ip: z.object({
        ip: z.string(),
      }).optional(),
      okta: z.object({
        identity_provider_id: z.string(),
        name: z.string(),
      }).optional(),
      saml: z.object({
        attribute_name: z.string(),
        attribute_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      oidc: z.object({
        claim_name: z.string(),
        claim_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      service_token: z.object({
        token_id: z.string(),
      }).optional(),
      linked_app_token: z.object({
        app_uid: z.string(),
      }).optional(),
      user_risk_score: z.object({
        user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
      }).optional(),
      cloudflare_account_member: z.object({
        account_id: z.string().max(32).optional(),
      }).optional(),
    })).optional(),
    include: z.array(z.object({
      group: z.object({
        id: z.string(),
      }).optional(),
      any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
      auth_context: z.object({
        ac_id: z.string(),
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      auth_method: z.object({
        auth_method: z.string(),
      }).optional(),
      azureAD: z.object({
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      certificate: z.record(z.string(), z.unknown()).optional(),
      common_name: z.object({
        common_name: z.string(),
      }).optional(),
      geo: z.object({
        country_code: z.string(),
      }).optional(),
      device_posture: z.object({
        account_id: z.string().optional(),
        integration_uid: z.string(),
      }).optional(),
      email_domain: z.object({
        domain: z.string(),
      }).optional(),
      email_list: z.object({
        id: z.string(),
      }).optional(),
      email: z.object({
        email: z.string(),
      }).optional(),
      everyone: z.record(z.string(), z.unknown()).optional(),
      external_evaluation: z.object({
        evaluate_url: z.string(),
        keys_url: z.string(),
      }).optional(),
      "github-organization": z.object({
        identity_provider_id: z.string(),
        name: z.string(),
        team: z.string().optional(),
      }).optional(),
      gsuite: z.object({
        email: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      login_method: z.object({
        id: z.string(),
      }).optional(),
      ip_list: z.object({
        id: z.string(),
      }).optional(),
      ip: z.object({
        ip: z.string(),
      }).optional(),
      okta: z.object({
        identity_provider_id: z.string(),
        name: z.string(),
      }).optional(),
      saml: z.object({
        attribute_name: z.string(),
        attribute_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      oidc: z.object({
        claim_name: z.string(),
        claim_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      service_token: z.object({
        token_id: z.string(),
      }).optional(),
      linked_app_token: z.object({
        app_uid: z.string(),
      }).optional(),
      user_risk_score: z.object({
        user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
      }).optional(),
      cloudflare_account_member: z.object({
        account_id: z.string().max(32).optional(),
      }).optional(),
    })),
    name: z.string(),
    require: z.array(z.object({
      group: z.object({
        id: z.string(),
      }).optional(),
      any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
      auth_context: z.object({
        ac_id: z.string(),
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      auth_method: z.object({
        auth_method: z.string(),
      }).optional(),
      azureAD: z.object({
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      certificate: z.record(z.string(), z.unknown()).optional(),
      common_name: z.object({
        common_name: z.string(),
      }).optional(),
      geo: z.object({
        country_code: z.string(),
      }).optional(),
      device_posture: z.object({
        account_id: z.string().optional(),
        integration_uid: z.string(),
      }).optional(),
      email_domain: z.object({
        domain: z.string(),
      }).optional(),
      email_list: z.object({
        id: z.string(),
      }).optional(),
      email: z.object({
        email: z.string(),
      }).optional(),
      everyone: z.record(z.string(), z.unknown()).optional(),
      external_evaluation: z.object({
        evaluate_url: z.string(),
        keys_url: z.string(),
      }).optional(),
      "github-organization": z.object({
        identity_provider_id: z.string(),
        name: z.string(),
        team: z.string().optional(),
      }).optional(),
      gsuite: z.object({
        email: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      login_method: z.object({
        id: z.string(),
      }).optional(),
      ip_list: z.object({
        id: z.string(),
      }).optional(),
      ip: z.object({
        ip: z.string(),
      }).optional(),
      okta: z.object({
        identity_provider_id: z.string(),
        name: z.string(),
      }).optional(),
      saml: z.object({
        attribute_name: z.string(),
        attribute_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      oidc: z.object({
        claim_name: z.string(),
        claim_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      service_token: z.object({
        token_id: z.string(),
      }).optional(),
      linked_app_token: z.object({
        app_uid: z.string(),
      }).optional(),
      user_risk_score: z.object({
        user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
      }).optional(),
      cloudflare_account_member: z.object({
        account_id: z.string().max(32).optional(),
      }).optional(),
    })).optional(),
  })).optional(),
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
  id: z.string(),
  percent_approved: z.number().optional(),
  percent_blocked: z.number().optional(),
  percent_errored: z.number().optional(),
  percent_users_processed: z.number().optional(),
  status: z.string().optional(),
  total_users: z.number().optional(),
  users_approved: z.number().optional(),
  users_blocked: z.number().optional(),
  users_errored: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  policies: z.array(z.object({
    decision: z.enum(["allow", "deny", "non_identity", "bypass"]),
    exclude: z.array(z.object({
      group: z.object({
        id: z.string(),
      }).optional(),
      any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
      auth_context: z.object({
        ac_id: z.string(),
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      auth_method: z.object({
        auth_method: z.string(),
      }).optional(),
      azureAD: z.object({
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      certificate: z.record(z.string(), z.unknown()).optional(),
      common_name: z.object({
        common_name: z.string(),
      }).optional(),
      geo: z.object({
        country_code: z.string(),
      }).optional(),
      device_posture: z.object({
        account_id: z.string().optional(),
        integration_uid: z.string(),
      }).optional(),
      email_domain: z.object({
        domain: z.string(),
      }).optional(),
      email_list: z.object({
        id: z.string(),
      }).optional(),
      email: z.object({
        email: z.string(),
      }).optional(),
      everyone: z.record(z.string(), z.unknown()).optional(),
      external_evaluation: z.object({
        evaluate_url: z.string(),
        keys_url: z.string(),
      }).optional(),
      "github-organization": z.object({
        identity_provider_id: z.string(),
        name: z.string(),
        team: z.string().optional(),
      }).optional(),
      gsuite: z.object({
        email: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      login_method: z.object({
        id: z.string(),
      }).optional(),
      ip_list: z.object({
        id: z.string(),
      }).optional(),
      ip: z.object({
        ip: z.string(),
      }).optional(),
      okta: z.object({
        identity_provider_id: z.string(),
        name: z.string(),
      }).optional(),
      saml: z.object({
        attribute_name: z.string(),
        attribute_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      oidc: z.object({
        claim_name: z.string(),
        claim_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      service_token: z.object({
        token_id: z.string(),
      }).optional(),
      linked_app_token: z.object({
        app_uid: z.string(),
      }).optional(),
      user_risk_score: z.object({
        user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
      }).optional(),
      cloudflare_account_member: z.object({
        account_id: z.string().max(32).optional(),
      }).optional(),
    })).optional(),
    include: z.array(z.object({
      group: z.object({
        id: z.string(),
      }).optional(),
      any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
      auth_context: z.object({
        ac_id: z.string(),
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      auth_method: z.object({
        auth_method: z.string(),
      }).optional(),
      azureAD: z.object({
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      certificate: z.record(z.string(), z.unknown()).optional(),
      common_name: z.object({
        common_name: z.string(),
      }).optional(),
      geo: z.object({
        country_code: z.string(),
      }).optional(),
      device_posture: z.object({
        account_id: z.string().optional(),
        integration_uid: z.string(),
      }).optional(),
      email_domain: z.object({
        domain: z.string(),
      }).optional(),
      email_list: z.object({
        id: z.string(),
      }).optional(),
      email: z.object({
        email: z.string(),
      }).optional(),
      everyone: z.record(z.string(), z.unknown()).optional(),
      external_evaluation: z.object({
        evaluate_url: z.string(),
        keys_url: z.string(),
      }).optional(),
      "github-organization": z.object({
        identity_provider_id: z.string(),
        name: z.string(),
        team: z.string().optional(),
      }).optional(),
      gsuite: z.object({
        email: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      login_method: z.object({
        id: z.string(),
      }).optional(),
      ip_list: z.object({
        id: z.string(),
      }).optional(),
      ip: z.object({
        ip: z.string(),
      }).optional(),
      okta: z.object({
        identity_provider_id: z.string(),
        name: z.string(),
      }).optional(),
      saml: z.object({
        attribute_name: z.string(),
        attribute_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      oidc: z.object({
        claim_name: z.string(),
        claim_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      service_token: z.object({
        token_id: z.string(),
      }).optional(),
      linked_app_token: z.object({
        app_uid: z.string(),
      }).optional(),
      user_risk_score: z.object({
        user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
      }).optional(),
      cloudflare_account_member: z.object({
        account_id: z.string().max(32).optional(),
      }).optional(),
    })),
    name: z.string(),
    require: z.array(z.object({
      group: z.object({
        id: z.string(),
      }).optional(),
      any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
      auth_context: z.object({
        ac_id: z.string(),
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      auth_method: z.object({
        auth_method: z.string(),
      }).optional(),
      azureAD: z.object({
        id: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      certificate: z.record(z.string(), z.unknown()).optional(),
      common_name: z.object({
        common_name: z.string(),
      }).optional(),
      geo: z.object({
        country_code: z.string(),
      }).optional(),
      device_posture: z.object({
        account_id: z.string().optional(),
        integration_uid: z.string(),
      }).optional(),
      email_domain: z.object({
        domain: z.string(),
      }).optional(),
      email_list: z.object({
        id: z.string(),
      }).optional(),
      email: z.object({
        email: z.string(),
      }).optional(),
      everyone: z.record(z.string(), z.unknown()).optional(),
      external_evaluation: z.object({
        evaluate_url: z.string(),
        keys_url: z.string(),
      }).optional(),
      "github-organization": z.object({
        identity_provider_id: z.string(),
        name: z.string(),
        team: z.string().optional(),
      }).optional(),
      gsuite: z.object({
        email: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      login_method: z.object({
        id: z.string(),
      }).optional(),
      ip_list: z.object({
        id: z.string(),
      }).optional(),
      ip: z.object({
        ip: z.string(),
      }).optional(),
      okta: z.object({
        identity_provider_id: z.string(),
        name: z.string(),
      }).optional(),
      saml: z.object({
        attribute_name: z.string(),
        attribute_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      oidc: z.object({
        claim_name: z.string(),
        claim_value: z.string(),
        identity_provider_id: z.string(),
      }).optional(),
      service_token: z.object({
        token_id: z.string(),
      }).optional(),
      linked_app_token: z.object({
        app_uid: z.string(),
      }).optional(),
      user_risk_score: z.object({
        user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
      }).optional(),
      cloudflare_account_member: z.object({
        account_id: z.string().max(32).optional(),
      }).optional(),
    })).optional(),
  })).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Policy-tests. Registered at `@swamp/cloudflare/access/policy-tests`. */
export const model = {
  type: "@swamp/cloudflare/access/policy-tests",
  version: "2026.09.04.1",
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
      toVersion: "2026.08.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Policy-tests resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Policy-tests",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policy-tests";
        const body: Record<string, unknown> = {};
        if (g.policies !== undefined) body.policies = g.policies;
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
      description: "Get a Policy-tests",
      arguments: z.object({
        id: z.string().describe("The ID of the Policy-tests"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policy-tests";
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
        "Look up an existing Policy-tests by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policy-tests";
        const filters: [string, string][] = [];
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "none", undefined, {
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
            `No policy-tests found matching filters: ${filterDesc}`,
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
        "Import an existing Policy-tests by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Policy-tests to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policy-tests";
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
    sync: {
      description: "Sync Policy-tests state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Policy-tests by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policy-tests";
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
