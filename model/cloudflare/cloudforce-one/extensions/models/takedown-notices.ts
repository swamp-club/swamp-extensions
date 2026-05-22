// Auto-generated extension model for @swamp/cloudflare/cloudforce-one/takedown-notices
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Takedown-notices.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  domain: z.string().min(1).max(253),
  matchId: z.number().int().min(0).optional(),
  matchType: z.enum(["logo", "domain"]).optional(),
  queryId: z.number().int().min(0).optional(),
  status: z.enum(["draft", "sent", "resolved", "expired"]).optional(),
});

const ResourceSchema = z.object({
  createdAt: z.string().optional(),
  domain: z.string().optional(),
  id: z.number(),
  matchId: z.number().optional(),
  matchType: z.string().optional(),
  queryId: z.number().optional(),
  status: z.string().optional(),
  updatedAt: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  domain: z.string().min(1).max(253).optional(),
  matchId: z.number().int().min(0).optional(),
  matchType: z.enum(["logo", "domain"]).optional(),
  queryId: z.number().int().min(0).optional(),
  status: z.enum(["draft", "sent", "resolved", "expired"]).optional(),
});

/** Swamp extension model for Cloudflare Takedown-notices. Registered at `@swamp/cloudflare/cloudforce-one/takedown-notices`. */
export const model = {
  type: "@swamp/cloudflare/cloudforce-one/takedown-notices",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Takedown-notices resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Takedown-notices",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/brand-protection/takedown-notices";
        const body: Record<string, unknown> = {};
        if (g.domain !== undefined) body.domain = g.domain;
        if (g.matchId !== undefined) body.matchId = g.matchId;
        if (g.matchType !== undefined) body.matchType = g.matchType;
        if (g.queryId !== undefined) body.queryId = g.queryId;
        if (g.status !== undefined) body.status = g.status;
        const result = await create(endpoint, body) as ResourceData;
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
      description: "Get a Takedown-notices",
      arguments: z.object({
        id: z.string().describe("The ID of the Takedown-notices"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/brand-protection/takedown-notices";
        const result = await read(endpoint, args.id) as ResourceData;
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
    update: {
      description: "Update Takedown-notices attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/brand-protection/takedown-notices";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.domain !== undefined) body.domain = g.domain;
        if (g.matchId !== undefined) body.matchId = g.matchId;
        if (g.matchType !== undefined) body.matchType = g.matchType;
        if (g.queryId !== undefined) body.queryId = g.queryId;
        if (g.status !== undefined) body.status = g.status;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PUT",
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Takedown-notices",
      arguments: z.object({
        id: z.string().describe("The ID of the Takedown-notices"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/brand-protection/takedown-notices";
        const { existed } = await remove(endpoint, args.id);
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
      description: "Sync Takedown-notices state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/brand-protection/takedown-notices";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const result = await tryRead(endpoint, existing.id) as
          | ResourceData
          | null;
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
