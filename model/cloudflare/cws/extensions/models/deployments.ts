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

// Auto-generated extension model for @swamp/cloudflare/cws/deployments
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Deployments.
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
  basic_auth_credential_ids: z.array(z.string()).describe(
    "IDs of basic-auth credentials to attach",
  ).optional(),
  default_mode: z.enum(["ALLOW", "BLOCK"]).describe(
    "Default traffic mode: ALLOW or BLOCK",
  ).optional(),
  description: z.string().max(1024).describe("Optional free-form description.")
    .optional(),
  domain_acl_id: z.string().describe(
    "ID of the domain ACL to attach (omit or null for none)",
  ).optional(),
  name: z.string().min(1).max(100).describe("Name of the deployment")
    .optional(),
  on_error_action: z.enum(["BLOCK", "SKIP"]).describe(
    "Action for runtime Rego errors. Omit to use BLOCK.",
  ).optional(),
  policy_set_ids: z.array(z.string()).describe("IDs of policy sets to attach")
    .optional(),
  rego_raise_error: z.boolean().describe(
    "Whether OPA builtin failures are raised as runtime evaluation errors. Omit to use the default true value.",
  ).optional(),
  tags: z.record(z.string(), z.unknown()).describe(
    "Tags to attach. Keys are limited to 256 UTF-8 bytes and values to 1024 UTF-8 bytes.",
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
  basic_auth_credential_ids: z.array(z.string()).optional(),
  created_at: z.string().optional(),
  default_mode: z.string().optional(),
  description: z.string().optional(),
  domain_acl_id: z.string().optional(),
  id: z.string(),
  name: z.string().optional(),
  on_error_action: z.string().optional(),
  policy_set_ids: z.array(z.string()).optional(),
  rego_raise_error: z.boolean().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  basic_auth_credential_ids: z.array(z.string()).optional(),
  default_mode: z.enum(["ALLOW", "BLOCK"]).optional(),
  description: z.string().max(1024).optional(),
  domain_acl_id: z.string().optional(),
  name: z.string().min(1).max(100).optional(),
  on_error_action: z.enum(["BLOCK", "SKIP"]).optional(),
  policy_set_ids: z.array(z.string()).optional(),
  rego_raise_error: z.boolean().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Deployments. Registered at `@swamp/cloudflare/cws/deployments`. */
export const model = {
  type: "@swamp/cloudflare/cws/deployments",
  version: "2026.10.20.1",
  upgrades: [
    {
      toVersion: "2026.10.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Deployments resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    lookupResult: {
      description: "Outcome of the most recent lookup",
      schema: z.object({
        found: z.boolean(),
        filters: z.record(z.string(), z.string()),
        id: z.string().optional(),
      }),
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Deployments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = [
          "basic_auth_credential_ids",
          "default_mode",
          "name",
          "policy_set_ids",
        ].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/cws/deployments";
        const body: Record<string, unknown> = {};
        if (g.basic_auth_credential_ids !== undefined) {
          body.basic_auth_credential_ids = g.basic_auth_credential_ids;
        }
        if (g.default_mode !== undefined) body.default_mode = g.default_mode;
        if (g.description !== undefined) body.description = g.description;
        if (g.domain_acl_id !== undefined) body.domain_acl_id = g.domain_acl_id;
        if (g.name !== undefined) body.name = g.name;
        if (g.on_error_action !== undefined) {
          body.on_error_action = g.on_error_action;
        }
        if (g.policy_set_ids !== undefined) {
          body.policy_set_ids = g.policy_set_ids;
        }
        if (g.rego_raise_error !== undefined) {
          body.rego_raise_error = g.rego_raise_error;
        }
        if (g.tags !== undefined) body.tags = g.tags;
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
      description: "Get a Deployments",
      arguments: z.object({
        id: z.string().describe("The ID of the Deployments"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cws/deployments";
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
        "Look up an existing Deployments by matching global argument values and import it into state",
      arguments: z.object({
        allowMissing: z.boolean().optional().describe(
          "Succeed and record found: false in lookupResult when nothing matches, instead of failing",
        ),
      }),
      execute: async (args: { allowMissing?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cws/deployments";
        const filters: [string, string][] = [];
        if (g.default_mode !== undefined) {
          filters.push(["default_mode", String(g.default_mode)]);
        }
        if (g.description !== undefined) {
          filters.push(["description", String(g.description)]);
        }
        if (g.domain_acl_id !== undefined) {
          filters.push(["domain_acl_id", String(g.domain_acl_id)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.on_error_action !== undefined) {
          filters.push(["on_error_action", String(g.on_error_action)]);
        }
        if (g.rego_raise_error !== undefined) {
          filters.push(["rego_raise_error", String(g.rego_raise_error)]);
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
        const resultName = `lookup-${
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "")
        }`;
        if (matches.length === 0) {
          if (args.allowMissing) {
            const missHandle = await context.writeResource(
              "lookupResult",
              resultName,
              { found: false, filters: Object.fromEntries(filters) },
            );
            return { dataHandles: [missHandle] };
          }
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `No deployments found matching filters: ${filterDesc}`,
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
        const resultHandle = await context.writeResource(
          "lookupResult",
          resultName,
          {
            found: true,
            filters: Object.fromEntries(filters),
            id: result.id?.toString(),
          },
        );
        return { dataHandles: [handle, resultHandle] };
      },
    },
    adopt: {
      description:
        "Import an existing Deployments by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Deployments to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cws/deployments";
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
      description: "Update Deployments attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Deployments by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cws/deployments";
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
        if (g.basic_auth_credential_ids !== undefined) {
          body.basic_auth_credential_ids = g.basic_auth_credential_ids;
        }
        if (g.default_mode !== undefined) body.default_mode = g.default_mode;
        if (g.description !== undefined) body.description = g.description;
        if (g.domain_acl_id !== undefined) body.domain_acl_id = g.domain_acl_id;
        if (g.name !== undefined) body.name = g.name;
        if (g.on_error_action !== undefined) {
          body.on_error_action = g.on_error_action;
        }
        if (g.policy_set_ids !== undefined) {
          body.policy_set_ids = g.policy_set_ids;
        }
        if (g.rego_raise_error !== undefined) {
          body.rego_raise_error = g.rego_raise_error;
        }
        if (g.tags !== undefined) body.tags = g.tags;
        const unset = [
          "basic_auth_credential_ids",
          "default_mode",
          "description",
          "domain_acl_id",
          "name",
          "on_error_action",
          "policy_set_ids",
          "rego_raise_error",
          "tags",
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
        const missingForUpdate = [
          "basic_auth_credential_ids",
          "default_mode",
          "name",
          "policy_set_ids",
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
      description: "Delete the Deployments",
      arguments: z.object({
        id: z.string().describe("The ID of the Deployments"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cws/deployments";
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
      description: "Sync Deployments state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Deployments by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/cws/deployments";
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
