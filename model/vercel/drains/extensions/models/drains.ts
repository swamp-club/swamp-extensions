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

// Auto-generated extension model for @swamp/vercel/drains/drains
// Do not edit manually. Re-generate with: deno task generate:vercel

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Vercel Drains.
 *
 * Wraps the Vercel API as a swamp model so create, get, lookup,
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
} from "./_lib/vercel.ts";

const GlobalArgsSchema = z.object({
  teamId: z.string().optional().describe("Vercel team ID"),
  slug: z.string().optional().describe(
    "Vercel team slug (alternative to teamId)",
  ),
  name: z.string().optional(),
  projects: z.enum(["some", "all"]).optional(),
  projectIds: z.array(z.string()).optional(),
  filter: z.object({
    version: z.string(),
    filter: z.object({
      type: z.string(),
      project: z.object({
        ids: z.array(z.string()).optional(),
      }).optional(),
      log: z.object({
        sources: z.array(
          z.enum([
            "build",
            "edge",
            "lambda",
            "static",
            "external",
            "firewall",
            "redirect",
          ]),
        ).optional(),
      }).optional(),
      deployment: z.object({
        environments: z.array(z.enum(["production", "preview"])).optional(),
      }).optional(),
    }),
  }).optional(),
  schemas: z.record(z.string(), z.unknown()).optional(),
  delivery: z.object({
    type: z.string(),
    endpoint: z.string(),
    compression: z.enum(["gzip", "none"]).optional(),
    encoding: z.enum(["json", "ndjson"]),
    headers: z.record(z.string(), z.unknown()),
    secret: z.string().optional(),
  }).optional(),
  sampling: z.array(z.object({
    type: z.string(),
    rate: z.number().min(0).max(1),
    env: z.enum(["production", "preview"]).optional(),
    requestPath: z.string().optional(),
  })).optional(),
  transforms: z.array(z.object({
    id: z.string(),
  })).optional(),
  status: z.enum(["enabled", "disabled"]).optional(),
  source: z.string().optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Vercel API token; overrides the VERCEL_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  teamId: z.string().optional(),
  slug: z.string().optional(),
  name: z.string().optional(),
  projects: z.enum(["some", "all"]).optional(),
  projectIds: z.array(z.string()).optional(),
  filter: z.object({
    version: z.string(),
    filter: z.object({
      type: z.string(),
      project: z.object({
        ids: z.array(z.string()).optional(),
      }).optional(),
      log: z.object({
        sources: z.array(
          z.enum([
            "build",
            "edge",
            "lambda",
            "static",
            "external",
            "firewall",
            "redirect",
          ]),
        ).optional(),
      }).optional(),
      deployment: z.object({
        environments: z.array(z.enum(["production", "preview"])).optional(),
      }).optional(),
    }),
  }).optional(),
  schemas: z.record(z.string(), z.unknown()).optional(),
  delivery: z.object({
    type: z.string(),
    endpoint: z.string(),
    compression: z.enum(["gzip", "none"]).optional(),
    encoding: z.enum(["json", "ndjson"]),
    headers: z.record(z.string(), z.unknown()),
    secret: z.string().optional(),
  }).optional(),
  sampling: z.array(z.object({
    type: z.string(),
    rate: z.number().min(0).max(1),
    env: z.enum(["production", "preview"]).optional(),
    requestPath: z.string().optional(),
  })).optional(),
  transforms: z.array(z.object({
    id: z.string(),
  })).optional(),
  status: z.enum(["enabled", "disabled"]).optional(),
  source: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Vercel Drains. Registered at `@swamp/vercel/drains/drains`. */
export const model = {
  type: "@swamp/vercel/drains/drains",
  version: "2026.10.01.1",
  upgrades: [
    {
      toVersion: "2026.08.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Drains resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Drains",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["name", "projects", "schemas"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/v1/drains";
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.projects !== undefined) body.projects = g.projects;
        if (g.projectIds !== undefined) body.projectIds = g.projectIds;
        if (g.filter !== undefined) body.filter = g.filter;
        if (g.schemas !== undefined) body.schemas = g.schemas;
        if (g.delivery !== undefined) body.delivery = g.delivery;
        if (g.sampling !== undefined) body.sampling = g.sampling;
        if (g.transforms !== undefined) body.transforms = g.transforms;
        if (g.source !== undefined) body.source = g.source;
        const raw = await create(endpoint, body, { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
        });
        const result = raw as ResourceData;
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
      description: "Get a Drains",
      arguments: z.object({ id: z.string().describe("The ID of the Drains") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/drains";
        const result = await read(endpoint, args.id, { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
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
        "Look up an existing Drains by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/drains";
        const filters: [string, string][] = [];
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.projects !== undefined) {
          filters.push(["projects", String(g.projects)]);
        }
        if (g.status !== undefined) filters.push(["status", String(g.status)]);
        if (g.source !== undefined) filters.push(["source", String(g.source)]);
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "none", { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
        }, undefined);
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
          throw new Error(`No drains found matching filters: ${filterDesc}`);
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
      description: "Import an existing Drains by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Drains to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/drains";
        const result = await read(endpoint, args.id, { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
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
      description: "Update Drains attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Drains by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/drains";
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
        if (g.name !== undefined) body.name = g.name;
        if (g.projects !== undefined) body.projects = g.projects;
        if (g.projectIds !== undefined) body.projectIds = g.projectIds;
        if (g.filter !== undefined) body.filter = g.filter;
        if (g.schemas !== undefined) body.schemas = g.schemas;
        if (g.delivery !== undefined) body.delivery = g.delivery;
        if (g.sampling !== undefined) body.sampling = g.sampling;
        if (g.transforms !== undefined) body.transforms = g.transforms;
        if (g.status !== undefined) body.status = g.status;
        if (g.source !== undefined) body.source = g.source;
        const result = await update(endpoint, existing.id, body, "PATCH", {
          token: g.token,
        }, { teamId: g.teamId, slug: g.slug }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Drains",
      arguments: z.object({ id: z.string().describe("The ID of the Drains") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/drains";
        const { existed } = await remove(
          endpoint,
          args.id,
          { token: g.token },
          { teamId: g.teamId, slug: g.slug },
        );
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
      description: "Sync Drains state from Vercel",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Drains by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/drains";
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
        const result = await tryRead(
          endpoint,
          existing.id,
          { token: g.token },
          { teamId: g.teamId, slug: g.slug },
        ) as ResourceData | null;
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
