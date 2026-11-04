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

// Auto-generated extension model for @swamp/vercel/feature-flags/connections
// Do not edit manually. Re-generate with: deno task generate:vercel

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Vercel Connections.
 *
 * Wraps the Vercel API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import { create, listAll, remove } from "./_lib/vercel.ts";

const GlobalArgsSchema = z.object({
  teamId: z.string().optional().describe("Vercel team ID"),
  slug: z.string().optional().describe(
    "Vercel team slug (alternative to teamId)",
  ),
  projectIdOrName: z.string().describe("The project id or name"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  consumerProjectId: z.string().describe(
    "The project in the same team that may read the flags of this project",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Vercel API token; overrides the VERCEL_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  consumerProjectId: z.string().nullable().optional(),
  consumerProjectName: z.string().nullable().optional(),
  createdAt: z.number().nullable().optional(),
  createdBy: z.string().nullable().optional(),
  sourceProjectId: z.string().nullable().optional(),
  sourceProjectName: z.string().nullable().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  teamId: z.string().optional(),
  slug: z.string().optional(),
  projectIdOrName: z.string().optional(),
  name: z.string().optional(),
  consumerProjectId: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Vercel Connections. Registered at `@swamp/vercel/feature-flags/connections`. */
export const model = {
  type: "@swamp/vercel/feature-flags/connections",
  version: "2026.11.03.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connections resource state",
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
      description: "Create a Connections",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["consumerProjectId"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/v1/projects/" +
          encodeURIComponent(g.projectIdOrName) + "/feature-flags/connections";
        const body: Record<string, unknown> = {};
        if (g.consumerProjectId !== undefined) {
          body.consumerProjectId = g.consumerProjectId;
        }
        const raw = await create(endpoint, body, { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
        }, "PUT");
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
        "Look up an existing Connections by matching global argument values and import it into state",
      arguments: z.object({
        allowMissing: z.boolean().optional().describe(
          "Succeed and record found: false in lookupResult when nothing matches, instead of failing",
        ),
      }),
      execute: async (args: { allowMissing?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/projects/" +
          encodeURIComponent(g.projectIdOrName) + "/feature-flags/connections";
        const filters: [string, string][] = [];
        if (g.consumerProjectId !== undefined) {
          filters.push(["consumerProjectId", String(g.consumerProjectId)]);
        }
        if (g.consumerProjectName !== undefined) {
          filters.push(["consumerProjectName", String(g.consumerProjectName)]);
        }
        if (g.createdAt !== undefined) {
          filters.push(["createdAt", String(g.createdAt)]);
        }
        if (g.createdBy !== undefined) {
          filters.push(["createdBy", String(g.createdBy)]);
        }
        if (g.sourceProjectId !== undefined) {
          filters.push(["sourceProjectId", String(g.sourceProjectId)]);
        }
        if (g.sourceProjectName !== undefined) {
          filters.push(["sourceProjectName", String(g.sourceProjectName)]);
        }
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
            `No connections found matching filters: ${filterDesc}`,
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
    delete: {
      description: "Delete the Connections",
      arguments: z.object({
        id: z.string().describe("The ID of the Connections"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/projects/" +
          encodeURIComponent(g.projectIdOrName) + "/feature-flags/connections";
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
  },
};
