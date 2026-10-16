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

// Auto-generated extension model for @swamp/cloudflare/data-security/finding-types
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Finding Types.
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
  applies_to_all_integrations: z.boolean().describe(
    "When true, this finding type applies to every current and future integration of the vendor.",
  ).optional(),
  description: z.string().max(4096).describe(
    "Human-readable description of the finding type. Cannot be empty. Maximum 4096 characters.",
  ).optional(),
  integration_ids: z.array(z.string()).describe(
    "Required and non-empty when applies_to_all_integrations is false; omit when it is true.",
  ).optional(),
  name: z.string().max(256).describe(
    "Human-readable name for the finding type. Maximum 256 characters.",
  ).optional(),
  severity: z.string().describe(
    "Default severity used when no integration-specific severity override exists.",
  ).optional(),
  asset_class: z.string().describe(
    "Asset class this finding type applies to (PascalCase, e.g. GoogleWorkspaceFile)",
  ).optional(),
  asset_vendor: z.string().describe(
    "Canonical vendor enum for the platform whose assets this finding type evaluates.",
  ).optional(),
  expression: z.string().max(4096).describe(
    "Rego expression body for the policy. `package cloudflare.casb.custom` and `import rego.v1` are added automatically. Do not include package or import declarations. This field cannot be changed after creation. Maximum 4096 characters.",
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
  applies_to_all_integrations: z.boolean().optional(),
  asset_class: z.string().optional(),
  asset_vendor: z.string().optional(),
  category: z.object({
    observation: z.string().optional(),
    product: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
  created_at: z.string().optional(),
  description: z.string().optional(),
  expression: z.string().optional(),
  id: z.string(),
  integration_ids: z.array(z.string()).optional(),
  match_count: z.number().optional(),
  name: z.string().optional(),
  origin: z.string().optional(),
  quarantined: z.boolean().optional(),
  severity: z.string().optional(),
  updated_at: z.string().optional(),
  vendor: z.string().optional(),
  version: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  applies_to_all_integrations: z.boolean().optional(),
  description: z.string().max(4096).optional(),
  integration_ids: z.array(z.string()).optional(),
  name: z.string().max(256).optional(),
  severity: z.string().optional(),
  asset_class: z.string().optional(),
  asset_vendor: z.string().optional(),
  expression: z.string().max(4096).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Finding Types. Registered at `@swamp/cloudflare/data-security/finding-types`. */
export const model = {
  type: "@swamp/cloudflare/data-security/finding-types",
  version: "2026.10.16.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Finding Types resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Finding Types",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = [
          "applies_to_all_integrations",
          "asset_class",
          "asset_vendor",
          "description",
          "expression",
          "name",
          "severity",
        ].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/finding_types";
        const body: Record<string, unknown> = {};
        if (g.applies_to_all_integrations !== undefined) {
          body.applies_to_all_integrations = g.applies_to_all_integrations;
        }
        if (g.asset_class !== undefined) body.asset_class = g.asset_class;
        if (g.asset_vendor !== undefined) body.asset_vendor = g.asset_vendor;
        if (g.description !== undefined) body.description = g.description;
        if (g.expression !== undefined) body.expression = g.expression;
        if (g.integration_ids !== undefined) {
          body.integration_ids = g.integration_ids;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.severity !== undefined) body.severity = g.severity;
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
      description: "Get a Finding Types",
      arguments: z.object({
        id: z.string().describe("The ID of the Finding Types"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/finding_types";
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
        "Look up an existing Finding Types by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/finding_types";
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
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.severity !== undefined) {
          filters.push(["severity", String(g.severity)]);
        }
        if (g.asset_class !== undefined) {
          filters.push(["asset_class", String(g.asset_class)]);
        }
        if (g.asset_vendor !== undefined) {
          filters.push(["asset_vendor", String(g.asset_vendor)]);
        }
        if (g.expression !== undefined) {
          filters.push(["expression", String(g.expression)]);
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
            `No finding types found matching filters: ${filterDesc}`,
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
        "Import an existing Finding Types by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Finding Types to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/finding_types";
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
      description: "Update Finding Types attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Finding Types by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/finding_types";
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
        if (g.applies_to_all_integrations !== undefined) {
          body.applies_to_all_integrations = g.applies_to_all_integrations;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.integration_ids !== undefined) {
          body.integration_ids = g.integration_ids;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.severity !== undefined) body.severity = g.severity;
        const unset = [
          "applies_to_all_integrations",
          "description",
          "integration_ids",
          "name",
          "severity",
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
          "applies_to_all_integrations",
          "description",
          "name",
          "severity",
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
      description: "Delete the Finding Types",
      arguments: z.object({
        id: z.string().describe("The ID of the Finding Types"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/finding_types";
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
      description: "Sync Finding Types state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Finding Types by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/data-security/posture/finding_types";
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
