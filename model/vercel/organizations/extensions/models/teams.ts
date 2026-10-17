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

// Auto-generated extension model for @swamp/vercel/organizations/teams
// Do not edit manually. Re-generate with: deno task generate:vercel

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Vercel Teams.
 *
 * Wraps the Vercel API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, listAll, remove } from "./_lib/vercel.ts";

const GlobalArgsSchema = z.object({
  teamId: z.string().optional().describe("Vercel team ID"),
  slug: z.string().optional().describe(
    "Vercel team slug (alternative to teamId)",
  ),
  organizationId: z.string().describe("The ID of the organization."),
  mode: z.enum(["create", "link"]).describe(
    'Whether to create a new team under the organization (\\"create\\") or link an existing one (\\"link\\").',
  ).optional(),
  resourceTeamId: z.string().describe(
    "The ID of an existing team to add to the organization (link mode).",
  ).optional(),
  resourceSlug: z.string().describe(
    "The slug of an existing team to link, or the slug for a new team to create.",
  ).optional(),
  name: z.string().describe(
    "The display name for a new team. Required in create mode; rejected in link mode.",
  ).optional(),
  billingPlan: z.enum(["enterprise", "platform"]).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Vercel API token; overrides the VERCEL_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  cursor: z.string().nullable().optional(),
  teams: z.array(z.object({
    avatar: z.string().optional(),
    billingPlan: z.string().optional(),
    createdAt: z.string().optional(),
    memberCount: z.number().optional(),
    name: z.string().optional(),
    organizationId: z.string().optional(),
    slug: z.string().optional(),
    ssoMode: z.string().optional(),
    teamId: z.string().optional(),
    updatedAt: z.string().optional(),
  })).nullable().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  teamId: z.string().optional(),
  slug: z.string().optional(),
  organizationId: z.string().optional(),
  mode: z.enum(["create", "link"]).optional(),
  resourceTeamId: z.string().optional(),
  resourceSlug: z.string().optional(),
  name: z.string().optional(),
  billingPlan: z.enum(["enterprise", "platform"]).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Vercel Teams. Registered at `@swamp/vercel/organizations/teams`. */
export const model = {
  type: "@swamp/vercel/organizations/teams",
  version: "2026.10.17.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Teams resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Teams",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["mode"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/v1/organizations/" +
          encodeURIComponent(g.organizationId) + "/teams";
        const body: Record<string, unknown> = {};
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.resourceTeamId !== undefined) body.teamId = g.resourceTeamId;
        if (g.resourceSlug !== undefined) body.slug = g.resourceSlug;
        if (g.name !== undefined) body.name = g.name;
        if (g.billingPlan !== undefined) body.billingPlan = g.billingPlan;
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
        "Look up an existing Teams by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/organizations/" +
          encodeURIComponent(g.organizationId) + "/teams";
        const filters: [string, string][] = [];
        if (g.resourceTeamId !== undefined) {
          filters.push(["teamId", String(g.resourceTeamId)]);
        }
        if (g.resourceSlug !== undefined) {
          filters.push(["slug", String(g.resourceSlug)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.billingPlan !== undefined) {
          filters.push(["billingPlan", String(g.billingPlan)]);
        }
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(
          endpoint,
          "cursor",
          { token: g.token },
          { teamId: g.teamId, slug: g.slug },
          undefined,
          "next",
        );
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
          throw new Error(`No teams found matching filters: ${filterDesc}`);
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
    delete: {
      description: "Delete the Teams",
      arguments: z.object({ id: z.string().describe("The ID of the Teams") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/organizations/" +
          encodeURIComponent(g.organizationId) + "/teams";
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
