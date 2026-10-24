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

// Auto-generated extension model for @swamp/vercel/projects/env
// Do not edit manually. Re-generate with: deno task generate:vercel

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Vercel Env.
 *
 * Wraps the Vercel API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  idOrName: z.string().describe(
    "The unique project identifier or the project name",
  ),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  key: z.string().describe("The name of the environment variable").optional(),
  target: z.array(z.enum(["production", "preview", "development"])).describe(
    "The target environment of the environment variable",
  ).optional(),
  gitBranch: z.string().max(250).describe(
    "If defined, the git branch of the environment variable (must have target=preview)",
  ).optional(),
  type: z.enum(["system", "encrypted", "plain", "sensitive"]).describe(
    "The type of environment variable",
  ).optional(),
  value: z.string().meta({ sensitive: true }).describe(
    "The value of the environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  customEnvironmentIds: z.array(z.string()).describe(
    "The custom environment IDs associated with the environment variable",
  ).optional(),
  comment: z.string().max(500).describe(
    "A comment to add context on what this environment variable is for",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Vercel API token; overrides the VERCEL_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  comment: z.string().nullable().optional(),
  configurationId: z.string().nullable().optional(),
  contentHint: z.object({
    storeId: z.string().optional(),
    type: z.string().optional(),
  }).nullable().optional(),
  createdAt: z.number().nullable().optional(),
  createdBy: z.string().nullable().optional(),
  customEnvironmentIds: z.array(z.string()).nullable().optional(),
  decrypted: z.boolean().nullable().optional(),
  edgeConfigId: z.string().nullable().optional(),
  edgeConfigTokenId: z.string().nullable().optional(),
  gitBranch: z.string().nullable().optional(),
  id: z.string(),
  key: z.string().nullable().optional(),
  sunsetSecretId: z.string().nullable().optional(),
  target: z.array(z.string()).nullable().optional(),
  type: z.string().nullable().optional(),
  updatedAt: z.number().nullable().optional(),
  updatedBy: z.string().nullable().optional(),
  visibility: z.string().nullable().optional(),
  value: z.string().meta({ sensitive: true }).nullable().optional(),
  internalContentHint: z.object({
    encryptedValue: z.string().optional(),
    type: z.string().optional(),
  }).nullable().optional(),
  legacyValue: z.string().nullable().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  teamId: z.string().optional(),
  slug: z.string().optional(),
  idOrName: z.string().optional(),
  name: z.string().optional(),
  key: z.string().optional(),
  target: z.array(z.enum(["production", "preview", "development"])).optional(),
  gitBranch: z.string().max(250).optional(),
  type: z.enum(["system", "encrypted", "plain", "sensitive"]).optional(),
  value: z.string().meta({ sensitive: true }).optional(),
  customEnvironmentIds: z.array(z.string()).optional(),
  comment: z.string().max(500).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Vercel Env. Registered at `@swamp/vercel/projects/env`. */
export const model = {
  type: "@swamp/vercel/projects/env",
  version: "2026.10.23.1",
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
      toVersion: "2026.08.02.3",
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
      toVersion: "2026.08.03.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.20.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Env resource state",
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
      description: "Create a Env",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["key", "type", "value"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/v10/projects/" + encodeURIComponent(g.idOrName) +
          "/env";
        const body: Record<string, unknown> = {};
        if (g.key !== undefined) body.key = g.key;
        if (g.value !== undefined) body.value = g.value;
        if (g.type !== undefined) body.type = g.type;
        if (g.target !== undefined) body.target = g.target;
        if (g.gitBranch !== undefined) body.gitBranch = g.gitBranch;
        if (g.comment !== undefined) body.comment = g.comment;
        if (g.customEnvironmentIds !== undefined) {
          body.customEnvironmentIds = g.customEnvironmentIds;
        }
        const raw = await create(endpoint, body, { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
        });
        const created = (raw as Record<string, unknown>).created;
        const result =
          (Array.isArray(created) ? created[0] : created) as ResourceData;
        if (!result) {
          throw new Error(
            "Create returned empty result — check the 'failed' array in the response for errors",
          );
        }
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
      description: "Get a Env",
      arguments: z.object({ id: z.string().describe("The ID of the Env") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/projects/" + encodeURIComponent(g.idOrName) +
          "/env";
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
        "Look up an existing Env by matching global argument values and import it into state",
      arguments: z.object({
        allowMissing: z.boolean().optional().describe(
          "Succeed and record found: false in lookupResult when nothing matches, instead of failing",
        ),
      }),
      execute: async (args: { allowMissing?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v10/projects/" + encodeURIComponent(g.idOrName) +
          "/env";
        const filters: [string, string][] = [];
        if (g.key !== undefined) filters.push(["key", String(g.key)]);
        if (g.gitBranch !== undefined) {
          filters.push(["gitBranch", String(g.gitBranch)]);
        }
        if (g.type !== undefined) filters.push(["type", String(g.type)]);
        if (g.comment !== undefined) {
          filters.push(["comment", String(g.comment)]);
        }
        if (g.configurationId !== undefined) {
          filters.push(["configurationId", String(g.configurationId)]);
        }
        if (g.createdAt !== undefined) {
          filters.push(["createdAt", String(g.createdAt)]);
        }
        if (g.createdBy !== undefined) {
          filters.push(["createdBy", String(g.createdBy)]);
        }
        if (g.decrypted !== undefined) {
          filters.push(["decrypted", String(g.decrypted)]);
        }
        if (g.edgeConfigId !== undefined) {
          filters.push(["edgeConfigId", String(g.edgeConfigId)]);
        }
        if (g.edgeConfigTokenId !== undefined) {
          filters.push(["edgeConfigTokenId", String(g.edgeConfigTokenId)]);
        }
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (g.sunsetSecretId !== undefined) {
          filters.push(["sunsetSecretId", String(g.sunsetSecretId)]);
        }
        if (g.updatedAt !== undefined) {
          filters.push(["updatedAt", String(g.updatedAt)]);
        }
        if (g.updatedBy !== undefined) {
          filters.push(["updatedBy", String(g.updatedBy)]);
        }
        if (g.visibility !== undefined) {
          filters.push(["visibility", String(g.visibility)]);
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
          throw new Error(`No env found matching filters: ${filterDesc}`);
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
      description: "Import an existing Env by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Env to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/projects/" + encodeURIComponent(g.idOrName) +
          "/env";
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
      description: "Update Env attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Env by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v9/projects/" + encodeURIComponent(g.idOrName) +
          "/env";
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
        if (g.key !== undefined) body.key = g.key;
        if (g.target !== undefined) body.target = g.target;
        if (g.gitBranch !== undefined) body.gitBranch = g.gitBranch;
        if (g.type !== undefined) body.type = g.type;
        if (g.value !== undefined) body.value = g.value;
        if (g.customEnvironmentIds !== undefined) {
          body.customEnvironmentIds = g.customEnvironmentIds;
        }
        if (g.comment !== undefined) body.comment = g.comment;
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
      description: "Delete the Env",
      arguments: z.object({ id: z.string().describe("The ID of the Env") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v9/projects/" + encodeURIComponent(g.idOrName) +
          "/env";
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
      description: "Sync Env state from Vercel",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Env by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v1/projects/" + encodeURIComponent(g.idOrName) +
          "/env";
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
