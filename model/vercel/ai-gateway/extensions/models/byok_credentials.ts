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

// Auto-generated extension model for @swamp/vercel/ai-gateway/byok-credentials
// Do not edit manually. Re-generate with: deno task generate:vercel

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Vercel Byok Credentials.
 *
 * Wraps the Vercel API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import { create, read, remove, tryRead, update } from "./_lib/vercel.ts";

const GlobalArgsSchema = z.object({
  teamId: z.string().optional().describe("Vercel team ID"),
  slug: z.string().optional().describe(
    "Vercel team slug (alternative to teamId)",
  ),
  name: z.string().max(100).describe(
    "The developer-entered name for this credential",
  ).optional(),
  active: z.boolean().describe(
    "Whether the credential is active and can be used",
  ).optional(),
  zeroDataRetention: z.boolean().describe(
    "Whether the customer attested this external credential has a zero data retention policy",
  ).optional(),
  userId: z.string().describe(
    "The ID of the user performing this action, used for Activity-log attribution.",
  ).optional(),
  ownerId: z.string().describe(
    "The owner ID for this credential. Ignored for customer tokens, which always create in their own team.",
  ).optional(),
  providerSlug: z.string().describe(
    'The provider slug this credential is for (e.g., "openai", "anthropic")',
  ).optional(),
  mappings: z.array(z.object({
    gatewayModelSlug: z.string(),
    customModelId: z.string(),
  })).describe(
    "Model mappings to create atomically with the credential (e.g. Azure deployments). One DynamoDB transaction holds the credential plus all mappings, so at most 99 mappings fit.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Vercel API token; overrides the VERCEL_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  active: z.boolean().nullable().optional(),
  createdAt: z.number().nullable().optional(),
  credentialId: z.string().nullable().optional(),
  lastFourChars: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  ownerId: z.string().nullable().optional(),
  providerSlug: z.string().nullable().optional(),
  updatedAt: z.number().nullable().optional(),
  zeroDataRetention: z.boolean().nullable().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  teamId: z.string().optional(),
  slug: z.string().optional(),
  name: z.string().max(100).optional(),
  active: z.boolean().optional(),
  zeroDataRetention: z.boolean().optional(),
  userId: z.string().optional(),
  ownerId: z.string().optional(),
  providerSlug: z.string().optional(),
  mappings: z.array(z.object({
    gatewayModelSlug: z.string(),
    customModelId: z.string(),
  })).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Vercel Byok Credentials. Registered at `@swamp/vercel/ai-gateway/byok-credentials`. */
export const model = {
  type: "@swamp/vercel/ai-gateway/byok-credentials",
  version: "2026.10.28.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Byok Credentials resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Byok Credentials",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["name", "providerSlug"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/ai-gateway/byok-credentials";
        const body: Record<string, unknown> = {};
        if (g.ownerId !== undefined) body.ownerId = g.ownerId;
        if (g.providerSlug !== undefined) body.providerSlug = g.providerSlug;
        if (g.name !== undefined) body.name = g.name;
        if (g.active !== undefined) body.active = g.active;
        if (g.zeroDataRetention !== undefined) {
          body.zeroDataRetention = g.zeroDataRetention;
        }
        if (g.userId !== undefined) body.userId = g.userId;
        if (g.mappings !== undefined) body.mappings = g.mappings;
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
      description: "Get a Byok Credentials",
      arguments: z.object({
        id: z.string().describe("The ID of the Byok Credentials"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/ai-gateway/byok-credentials";
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
    adopt: {
      description:
        "Import an existing Byok Credentials by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Byok Credentials to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/ai-gateway/byok-credentials";
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
      description: "Update Byok Credentials attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Byok Credentials by credentialId (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/ai-gateway/byok-credentials";
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
        if (g.name !== undefined && g.name !== existing.name) {
          body.name = g.name;
        }
        if (g.active !== undefined) body.active = g.active;
        if (g.zeroDataRetention !== undefined) {
          body.zeroDataRetention = g.zeroDataRetention;
        }
        if (g.userId !== undefined) body.userId = g.userId;
        if (Object.keys(body).length === 0) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            existing,
          );
          return { dataHandles: [handle] };
        }
        const result = await update(
          endpoint,
          existing.credentialId,
          body,
          "PATCH",
          { token: g.token },
          { teamId: g.teamId, slug: g.slug },
        ) as ResourceData;
        if (
          result && typeof result === "object" &&
          (result as Record<string, unknown>).name === undefined
        ) (result as Record<string, unknown>).name = body.name ?? existing.name;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Byok Credentials",
      arguments: z.object({
        id: z.string().describe("The ID of the Byok Credentials"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/ai-gateway/byok-credentials";
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
      description: "Sync Byok Credentials state from Vercel",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Byok Credentials by credentialId (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/ai-gateway/byok-credentials";
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
        if (!existing.credentialId) {
          throw new Error("Stored state has no credentialId - cannot sync");
        }
        const result = await tryRead(endpoint, existing.credentialId, {
          token: g.token,
        }, { teamId: g.teamId, slug: g.slug }) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.credentialId,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
