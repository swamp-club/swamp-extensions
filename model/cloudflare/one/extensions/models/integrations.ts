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

// Auto-generated extension model for @swamp/cloudflare/one/integrations
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Integrations.
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
  credentials: z.record(z.string(), z.unknown()).describe(
    "Credentials for the integration.",
  ).optional(),
  dlp_profiles: z.array(z.string()).describe(
    "List of DLP profile IDs to associate.",
  ).optional(),
  name: z.string().min(1).max(256).describe("Name of the integration.")
    .optional(),
  permissions: z.array(z.string().min(1)).describe(
    "List of permission scopes (uses policy defaults if empty).",
  ).optional(),
  use_cases: z.array(z.enum(["casb", "ces", "auto_remediation"])).describe(
    "List of use case or feature slugs to enroll (e.g., ['casb', 'ces', 'auto_remediation']).",
  ).optional(),
  application: z.enum([
    "ANTHROPIC",
    "AWS",
    "BITBUCKET",
    "BOX",
    "CONFLUENCE",
    "DROPBOX",
    "GITHUB",
    "GOOGLE_CLOUD_PLATFORM",
    "GOOGLE_WORKSPACE",
    "JIRA",
    "MICROSOFT_INTERNAL",
    "OPENAI",
    "SALESFORCE",
    "SERVICENOW",
    "SLACK",
  ]).describe(
    "Vendor/application slug (e.g., GOOGLE_WORKSPACE).\n\n* `ANTHROPIC` - ANTHROPIC\n* `AWS` - AWS\n* `BITBUCKET` - BITBUCKET\n* `BOX` - BOX\n* `CONFLUENCE` - CONFLUENCE\n* `DROPBOX` - DROPBOX\n* `GITHUB` - GITHUB\n* `GOOGLE_CLOUD_PLATFORM` - GOOGLE_CLOUD_PLATFORM\n* `GOOGLE_WORKSPACE` - GOOGLE_WORKSPACE\n* `JIRA` - JIRA\n* `MICROSOFT_INTERNAL` - MICROSOFT_INTERNAL\n* `OPENAI` - OPENAI\n* `SALESFORCE` - SALESFORCE\n* `SERVICENOW` - SERVICENOW\n* `SLACK` - SLACK",
  ).optional(),
  auth_method: z.string().min(1).describe(
    "Authentication method slug (uses default if omitted).",
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
  application: z.record(z.string(), z.unknown()).optional(),
  auth_method: z.record(z.string(), z.unknown()).optional(),
  authorization_link: z.object({
    components: z.record(z.string(), z.unknown()).optional(),
    link: z.string().optional(),
  }).optional(),
  created: z.string().optional(),
  credentials_expiry: z.string().optional(),
  dlp_profiles: z.array(z.string()).optional(),
  health_details: z.array(z.record(z.string(), z.unknown())).optional(),
  id: z.string(),
  is_paused: z.boolean().optional(),
  last_hydrated: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  updated: z.string().optional(),
  use_cases: z.array(z.record(z.string(), z.unknown())).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  credentials: z.record(z.string(), z.unknown()).optional(),
  dlp_profiles: z.array(z.string()).optional(),
  name: z.string().min(1).max(256).optional(),
  permissions: z.array(z.string().min(1)).optional(),
  use_cases: z.array(z.enum(["casb", "ces", "auto_remediation"])).optional(),
  application: z.enum([
    "ANTHROPIC",
    "AWS",
    "BITBUCKET",
    "BOX",
    "CONFLUENCE",
    "DROPBOX",
    "GITHUB",
    "GOOGLE_CLOUD_PLATFORM",
    "GOOGLE_WORKSPACE",
    "JIRA",
    "MICROSOFT_INTERNAL",
    "OPENAI",
    "SALESFORCE",
    "SERVICENOW",
    "SLACK",
  ]).optional(),
  auth_method: z.string().min(1).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Integrations. Registered at `@swamp/cloudflare/one/integrations`. */
export const model = {
  type: "@swamp/cloudflare/one/integrations",
  version: "2026.09.29.1",
  upgrades: [
    {
      toVersion: "2026.07.16.1",
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
      toVersion: "2026.08.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.15.1",
      description: "No schema changes",
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
      description: "Integrations resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Integrations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["application", "credentials", "name"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/one/integrations";
        const body: Record<string, unknown> = {};
        if (g.application !== undefined) body.application = g.application;
        if (g.auth_method !== undefined) body.auth_method = g.auth_method;
        if (g.credentials !== undefined) body.credentials = g.credentials;
        if (g.dlp_profiles !== undefined) body.dlp_profiles = g.dlp_profiles;
        if (g.name !== undefined) body.name = g.name;
        if (g.permissions !== undefined) body.permissions = g.permissions;
        if (g.use_cases !== undefined) body.use_cases = g.use_cases;
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
      description: "Get a Integrations",
      arguments: z.object({
        id: z.string().describe("The ID of the Integrations"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/one/integrations";
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
        "Look up an existing Integrations by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/one/integrations";
        const filters: [string, string][] = [];
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.application !== undefined) {
          filters.push(["application", String(g.application)]);
        }
        if (g.auth_method !== undefined) {
          filters.push(["auth_method", String(g.auth_method)]);
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
            `No integrations found matching filters: ${filterDesc}`,
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
        "Import an existing Integrations by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Integrations to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/one/integrations";
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
      description: "Update Integrations attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Integrations by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/one/integrations";
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
        if (g.credentials !== undefined) body.credentials = g.credentials;
        if (g.dlp_profiles !== undefined) body.dlp_profiles = g.dlp_profiles;
        if (g.name !== undefined) body.name = g.name;
        if (g.permissions !== undefined) body.permissions = g.permissions;
        if (g.use_cases !== undefined) body.use_cases = g.use_cases;
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
    delete: {
      description: "Delete the Integrations",
      arguments: z.object({
        id: z.string().describe("The ID of the Integrations"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/one/integrations";
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
      description: "Sync Integrations state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Integrations by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/one/integrations";
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
