// Auto-generated extension model for @swamp/cloudflare/magic/routes
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Routes.
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
  description: z.string().describe(
    "An optional human provided description of the static route.",
  ).optional(),
  nexthop: z.string().describe("The next-hop IP Address for the static route."),
  prefix: z.string().describe(
    "IP Prefix in Classless Inter-Domain Routing format.",
  ),
  priority: z.number().int().describe("Priority of the static route."),
  scope: z.object({
    colo_names: z.array(z.string()).optional(),
    colo_regions: z.array(z.string()).optional(),
  }).describe("Used only for ECMP routes.").optional(),
  weight: z.number().int().describe(
    "Optional weight of the ECMP scope - if provided.",
  ).optional(),
});

const ResourceSchema = z.object({
  route: z.object({
    created_on: z.string().optional(),
    description: z.string().optional(),
    id: z.string().optional(),
    modified_on: z.string().optional(),
    nexthop: z.string().optional(),
    prefix: z.string().optional(),
    priority: z.number().optional(),
    scope: z.object({
      colo_names: z.array(z.string()).optional(),
      colo_regions: z.array(z.string()).optional(),
    }).optional(),
    weight: z.number().optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  description: z.string().optional(),
  nexthop: z.string().optional(),
  prefix: z.string().optional(),
  priority: z.number().int().optional(),
  scope: z.object({
    colo_names: z.array(z.string()).optional(),
    colo_regions: z.array(z.string()).optional(),
  }).optional(),
  weight: z.number().int().optional(),
});

/** Swamp extension model for Cloudflare Routes. Registered at `@swamp/cloudflare/magic/routes`. */
export const model = {
  type: "@swamp/cloudflare/magic/routes",
  version: "2026.05.22.1",
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
        const endpoint = "/accounts/" + g.account_id + "/magic/routes";
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.nexthop !== undefined) body.nexthop = g.nexthop;
        if (g.prefix !== undefined) body.prefix = g.prefix;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.scope !== undefined) body.scope = g.scope;
        if (g.weight !== undefined) body.weight = g.weight;
        const result = await create(endpoint, body) as ResourceData;
        const instanceName = (g.description?.toString() ?? "current").replace(
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
      description: "Get a Routes",
      arguments: z.object({ id: z.string().describe("The ID of the Routes") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/routes";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (g.description?.toString() ?? args.id).replace(
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
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/routes";
        const instanceName = (g.description?.toString() ?? "current").replace(
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
        if (g.description !== undefined) body.description = g.description;
        if (g.nexthop !== undefined) body.nexthop = g.nexthop;
        if (g.prefix !== undefined) body.prefix = g.prefix;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.scope !== undefined) body.scope = g.scope;
        if (g.weight !== undefined) body.weight = g.weight;
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
      description: "Delete the Routes",
      arguments: z.object({ id: z.string().describe("The ID of the Routes") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/routes";
        const { existed } = await remove(endpoint, args.id);
        const instanceName =
          (context.globalArgs.description?.toString() ?? args.id).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Routes state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/routes";
        const instanceName = (g.description?.toString() ?? "current").replace(
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
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
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
