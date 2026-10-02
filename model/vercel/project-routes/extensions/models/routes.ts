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

// Auto-generated extension model for @swamp/vercel/project-routes/routes
// Do not edit manually. Re-generate with: deno task generate:vercel

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Vercel Routes.
 *
 * Wraps the Vercel API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, listAll, update } from "./_lib/vercel.ts";

const GlobalArgsSchema = z.object({
  teamId: z.string().optional().describe("Vercel team ID"),
  slug: z.string().optional().describe(
    "Vercel team slug (alternative to teamId)",
  ),
  projectId: z.string().describe("Parent projectId"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  route: z.object({
    name: z.string().max(256),
    description: z.string().max(1024).optional(),
    enabled: z.boolean().optional(),
    srcSyntax: z.enum(["equals", "path-to-regexp", "regex"]).optional(),
    route: z.object({
      src: z.string(),
      dest: z.string().optional(),
      headers: z.record(z.string(), z.unknown()).optional(),
      caseSensitive: z.boolean().optional(),
      status: z.number().int().optional(),
      has: z.array(z.object({
        type: z.enum(["host", "header", "cookie", "query"]).optional(),
        key: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      missing: z.array(z.object({
        type: z.enum(["host", "header", "cookie", "query"]).optional(),
        key: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      transforms: z.array(z.object({
        type: z.enum(["request.headers", "request.query", "response.headers"])
          .optional(),
        op: z.enum(["append", "set", "delete"]).optional(),
        target: z.record(z.string(), z.unknown()).optional(),
        args: z.string().optional(),
        env: z.array(z.string()).optional(),
      })).optional(),
      respectOriginCacheControl: z.boolean().optional(),
    }),
  }).optional(),
  restore: z.boolean().describe(
    "If true, restores the staged route to the value in the production version.",
  ).optional(),
  position: z.object({
    placement: z.enum(["start", "end", "after", "before"]).optional(),
    referenceId: z.string().optional(),
  }).describe(
    'Controls where the route is inserted. Defaults to "end" if omitted.',
  ).optional(),
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
  projectId: z.string().optional(),
  name: z.string().optional(),
  route: z.object({
    name: z.string().max(256),
    description: z.string().max(1024).optional(),
    enabled: z.boolean().optional(),
    srcSyntax: z.enum(["equals", "path-to-regexp", "regex"]).optional(),
    route: z.object({
      src: z.string(),
      dest: z.string().optional(),
      headers: z.record(z.string(), z.unknown()).optional(),
      caseSensitive: z.boolean().optional(),
      status: z.number().int().optional(),
      has: z.array(z.object({
        type: z.enum(["host", "header", "cookie", "query"]).optional(),
        key: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      missing: z.array(z.object({
        type: z.enum(["host", "header", "cookie", "query"]).optional(),
        key: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      transforms: z.array(z.object({
        type: z.enum(["request.headers", "request.query", "response.headers"])
          .optional(),
        op: z.enum(["append", "set", "delete"]).optional(),
        target: z.record(z.string(), z.unknown()).optional(),
        args: z.string().optional(),
        env: z.array(z.string()).optional(),
      })).optional(),
      respectOriginCacheControl: z.boolean().optional(),
    }),
  }).optional(),
  restore: z.boolean().optional(),
  position: z.object({
    placement: z.enum(["start", "end", "after", "before"]).optional(),
    referenceId: z.string().optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Vercel Routes. Registered at `@swamp/vercel/project-routes/routes`. */
export const model = {
  type: "@swamp/vercel/project-routes/routes",
  version: "2026.10.01.1",
  upgrades: [
    {
      toVersion: "2026.08.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.02.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.02.4",
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
      description: "Routes resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Routes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["route"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/v1/projects/" + encodeURIComponent(g.projectId) +
          "/routes";
        const body: Record<string, unknown> = {};
        if (g.route !== undefined) body.route = g.route;
        if (g.position !== undefined) body.position = g.position;
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
    lookup: {
      description:
        "Look up an existing Routes by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/projects/" + encodeURIComponent(g.projectId) +
          "/routes";
        const filters: [string, string][] = [];
        if (g.restore !== undefined) {
          filters.push(["restore", String(g.restore)]);
        }
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
          throw new Error(`No routes found matching filters: ${filterDesc}`);
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
    update: {
      description: "Update Routes attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Routes by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/projects/" + encodeURIComponent(g.projectId) +
          "/routes";
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
        if (g.route !== undefined) body.route = g.route;
        if (g.restore !== undefined) body.restore = g.restore;
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
  },
};
