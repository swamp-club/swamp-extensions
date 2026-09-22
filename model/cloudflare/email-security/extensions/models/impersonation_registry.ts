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

// Auto-generated extension model for @swamp/cloudflare/email-security/impersonation-registry
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Impersonation Registry.
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
  comments: z.string().optional(),
  created_at: z.string().optional(),
  directory_id: z.number().int().optional(),
  directory_node_id: z.number().int().optional(),
  email: z.string().optional(),
  external_directory_node_id: z.string().optional(),
  id: z.string().describe("Impersonation registry entry identifier.")
    .optional(),
  is_email_regex: z.boolean().optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
  name: z.string().max(1024).optional(),
  provenance: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  comments: z.string().optional(),
  created_at: z.string().optional(),
  directory_id: z.number().optional(),
  directory_node_id: z.number().optional(),
  email: z.string().optional(),
  external_directory_node_id: z.string().optional(),
  id: z.string(),
  is_email_regex: z.boolean().optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
  name: z.string().optional(),
  provenance: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  comments: z.string().optional(),
  created_at: z.string().optional(),
  directory_id: z.number().int().optional(),
  directory_node_id: z.number().int().optional(),
  email: z.string().optional(),
  external_directory_node_id: z.string().optional(),
  id: z.string().optional(),
  is_email_regex: z.boolean().optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
  name: z.string().max(1024).optional(),
  provenance: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Impersonation Registry. Registered at `@swamp/cloudflare/email-security/impersonation-registry`. */
export const model = {
  type: "@swamp/cloudflare/email-security/impersonation-registry",
  version: "2026.09.22.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Impersonation Registry resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Impersonation Registry",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/impersonation_registry";
        const body: Record<string, unknown> = {};
        if (g.comments !== undefined) body.comments = g.comments;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.directory_id !== undefined) body.directory_id = g.directory_id;
        if (g.directory_node_id !== undefined) {
          body.directory_node_id = g.directory_node_id;
        }
        if (g.email !== undefined) body.email = g.email;
        if (g.external_directory_node_id !== undefined) {
          body.external_directory_node_id = g.external_directory_node_id;
        }
        if (g.id !== undefined) body.id = g.id;
        if (g.is_email_regex !== undefined) {
          body.is_email_regex = g.is_email_regex;
        }
        if (g.last_modified !== undefined) body.last_modified = g.last_modified;
        if (g.modified_at !== undefined) body.modified_at = g.modified_at;
        if (g.name !== undefined) body.name = g.name;
        if (g.provenance !== undefined) body.provenance = g.provenance;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
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
      description: "Get a Impersonation Registry",
      arguments: z.object({
        id: z.string().describe("The ID of the Impersonation Registry"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/impersonation_registry";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
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
        "Look up an existing Impersonation Registry by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/impersonation_registry";
        const filters: [string, string][] = [];
        if (g.comments !== undefined) {
          filters.push(["comments", String(g.comments)]);
        }
        if (g.created_at !== undefined) {
          filters.push(["created_at", String(g.created_at)]);
        }
        if (g.directory_id !== undefined) {
          filters.push(["directory_id", String(g.directory_id)]);
        }
        if (g.directory_node_id !== undefined) {
          filters.push(["directory_node_id", String(g.directory_node_id)]);
        }
        if (g.email !== undefined) filters.push(["email", String(g.email)]);
        if (g.external_directory_node_id !== undefined) {
          filters.push([
            "external_directory_node_id",
            String(g.external_directory_node_id),
          ]);
        }
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (g.is_email_regex !== undefined) {
          filters.push(["is_email_regex", String(g.is_email_regex)]);
        }
        if (g.last_modified !== undefined) {
          filters.push(["last_modified", String(g.last_modified)]);
        }
        if (g.modified_at !== undefined) {
          filters.push(["modified_at", String(g.modified_at)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.provenance !== undefined) {
          filters.push(["provenance", String(g.provenance)]);
        }
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "page", undefined, {
          apiToken: g.apiToken,
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
            `No impersonation registry found matching filters: ${filterDesc}`,
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
        "Import an existing Impersonation Registry by ID into state for management",
      arguments: z.object({
        id: z.string().describe(
          "The ID of the Impersonation Registry to import",
        ),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/impersonation_registry";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
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
      description: "Update Impersonation Registry attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Impersonation Registry by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/impersonation_registry";
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
        if (g.comments !== undefined) body.comments = g.comments;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.directory_id !== undefined) body.directory_id = g.directory_id;
        if (g.directory_node_id !== undefined) {
          body.directory_node_id = g.directory_node_id;
        }
        if (g.email !== undefined) body.email = g.email;
        if (g.external_directory_node_id !== undefined) {
          body.external_directory_node_id = g.external_directory_node_id;
        }
        if (g.id !== undefined) body.id = g.id;
        if (g.is_email_regex !== undefined) {
          body.is_email_regex = g.is_email_regex;
        }
        if (g.last_modified !== undefined) body.last_modified = g.last_modified;
        if (g.modified_at !== undefined) body.modified_at = g.modified_at;
        if (g.name !== undefined) body.name = g.name;
        if (g.provenance !== undefined) body.provenance = g.provenance;
        const result = await update(endpoint, existing.id, body, "PATCH", {
          apiToken: g.apiToken,
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
      description: "Delete the Impersonation Registry",
      arguments: z.object({
        id: z.string().describe("The ID of the Impersonation Registry"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/impersonation_registry";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
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
      description: "Sync Impersonation Registry state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Impersonation Registry by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/impersonation_registry";
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
