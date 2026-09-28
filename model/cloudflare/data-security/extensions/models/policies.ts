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

// Auto-generated extension model for @swamp/cloudflare/data-security/policies
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Policies.
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
  actions: z.object({
    remediation_types: z.array(z.object({
      remediation_type_id: z.string(),
    })).optional(),
    webhook_configs: z.array(z.object({
      webhook_config_id: z.string(),
    })).optional(),
  }).describe(
    "Actions to execute when this policy is triggered, grouped by action type.\nA policy must contain at least one action across all groups and may include\nat most one remediation.",
  ).optional(),
  applies_to_all_integrations: z.boolean().describe(
    "When true, the policy applies to all integrations for the account. When false, integration_ids must be provided.",
  ).optional(),
  description: z.string().max(1000).describe(
    "Optional description of what this policy does.",
  ).optional(),
  display_name: z.string().max(255).describe(
    "Display name for the policy configuration.",
  ).optional(),
  enabled: z.boolean().describe(
    "Boolean specifying if the policy is enabled or disabled.",
  ).optional(),
  integration_ids: z.array(z.string()).describe(
    "The integrations this policy applies to. Required when applies_to_all_integrations is false.",
  ).optional(),
  finding_type_id: z.string().describe(
    "The finding type this policy is associated with. All remediation actions must match this finding type.",
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
  actions: z.object({
    remediation_types: z.array(z.object({
      display_name: z.string().optional(),
      remediation_type: z.string().optional(),
      remediation_type_id: z.string().optional(),
    })).optional(),
    webhook_configs: z.array(z.object({
      display_name: z.string().optional(),
      webhook_config_id: z.string().optional(),
    })).optional(),
  }).optional(),
  applies_to_all_integrations: z.boolean().optional(),
  created_at: z.string().optional(),
  description: z.string().optional(),
  disabled_at: z.string().optional(),
  display_name: z.string().optional(),
  enabled: z.boolean().optional(),
  finding_type_id: z.string().optional(),
  id: z.string(),
  integration_ids: z.array(z.string()).optional(),
  last_triggered_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  actions: z.object({
    remediation_types: z.array(z.object({
      remediation_type_id: z.string(),
    })).optional(),
    webhook_configs: z.array(z.object({
      webhook_config_id: z.string(),
    })).optional(),
  }).optional(),
  applies_to_all_integrations: z.boolean().optional(),
  description: z.string().max(1000).optional(),
  display_name: z.string().max(255).optional(),
  enabled: z.boolean().optional(),
  integration_ids: z.array(z.string()).optional(),
  finding_type_id: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Policies. Registered at `@swamp/cloudflare/data-security/policies`. */
export const model = {
  type: "@swamp/cloudflare/data-security/policies",
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
      description: "Policies resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Policies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = [
          "actions",
          "applies_to_all_integrations",
          "display_name",
          "enabled",
          "finding_type_id",
        ].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/policies";
        const body: Record<string, unknown> = {};
        if (g.actions !== undefined) body.actions = g.actions;
        if (g.applies_to_all_integrations !== undefined) {
          body.applies_to_all_integrations = g.applies_to_all_integrations;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.display_name !== undefined) body.display_name = g.display_name;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.finding_type_id !== undefined) {
          body.finding_type_id = g.finding_type_id;
        }
        if (g.integration_ids !== undefined) {
          body.integration_ids = g.integration_ids;
        }
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.description?.toString() ?? "current").replace(
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
      description: "Get a Policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/policies";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.description?.toString() ?? args.id).replace(
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
        "Look up an existing Policies by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/policies";
        const filters: [string, string][] = [];
        if (g.applies_to_all_integrations !== undefined) {
          filters.push([
            "applies_to_all_integrations",
            String(g.applies_to_all_integrations),
          ]);
        }
        if (g.description !== undefined) {
          filters.push(["description", String(g.description)]);
        }
        if (g.display_name !== undefined) {
          filters.push(["display_name", String(g.display_name)]);
        }
        if (g.enabled !== undefined) {
          filters.push(["enabled", String(g.enabled)]);
        }
        if (g.finding_type_id !== undefined) {
          filters.push(["finding_type_id", String(g.finding_type_id)]);
        }
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
          throw new Error(`No policies found matching filters: ${filterDesc}`);
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
          (g.description?.toString() ?? result.id?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
        "Import an existing Policies by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Policies to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/policies";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName =
          (result.description?.toString() ?? g.description?.toString() ??
            args.id).replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update Policies attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Policies by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/policies";
        const instanceName =
          (g.description?.toString() ?? args.identifier ?? "current").replace(
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
        if (g.actions !== undefined) body.actions = g.actions;
        if (g.applies_to_all_integrations !== undefined) {
          body.applies_to_all_integrations = g.applies_to_all_integrations;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.display_name !== undefined) body.display_name = g.display_name;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.integration_ids !== undefined) {
          body.integration_ids = g.integration_ids;
        }
        const unset = [
          "actions",
          "applies_to_all_integrations",
          "display_name",
          "enabled",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) if (live[k] !== undefined) body[k] = live[k];
        }
        const missingForUpdate = [
          "actions",
          "applies_to_all_integrations",
          "display_name",
          "enabled",
        ].filter((k) => body[k] === undefined);
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
      description: "Delete the Policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/policies";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const instanceName =
          (context.globalArgs.description?.toString() ?? args.id).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Policies state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Policies by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/policies";
        const instanceName =
          (g.description?.toString() ?? args.identifier ?? "current").replace(
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
