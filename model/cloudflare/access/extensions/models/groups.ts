// Auto-generated extension model for @swamp/cloudflare/access/groups
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Groups.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().optional().describe(
    "Cloudflare account ID (provide account_id or zone_id)",
  ),
  zone_id: z.string().optional().describe(
    "Cloudflare zone ID (provide account_id or zone_id)",
  ),
  exclude: z.array(z.object({
    group: z.object({
      id: z.string(),
    }),
  })).describe(
    "Rules evaluated with a NOT logical operator. To match a policy, a user cannot meet any of the Exclude rules.",
  ).optional(),
  include: z.array(z.object({
    group: z.object({
      id: z.string(),
    }),
  })).describe(
    "Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.",
  ),
  is_default: z.boolean().describe("Whether this is the default group")
    .optional(),
  name: z.string().describe("The name of the Access group."),
  require: z.array(z.object({
    group: z.object({
      id: z.string(),
    }),
  })).describe(
    "Rules evaluated with an AND logical operator. To match a policy, a user must meet all of the Require rules.",
  ).optional(),
}).refine(
  (d) => (d.account_id != null) !== (d.zone_id != null),
  "Exactly one of account_id or zone_id must be provided",
);

const ResourceSchema = z.object({
  created_at: z.string().optional(),
  exclude: z.array(z.object({
    group: z.object({
      id: z.string().optional(),
    }).optional(),
  })).optional(),
  id: z.string(),
  include: z.array(z.object({
    group: z.object({
      id: z.string().optional(),
    }).optional(),
  })).optional(),
  is_default: z.array(z.object({
    group: z.object({
      id: z.string().optional(),
    }).optional(),
  })).optional(),
  name: z.string().optional(),
  require: z.array(z.object({
    group: z.object({
      id: z.string().optional(),
    }).optional(),
  })).optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  zone_id: z.string().optional(),
  exclude: z.array(z.object({
    group: z.object({
      id: z.string(),
    }),
  })).optional(),
  include: z.array(z.object({
    group: z.object({
      id: z.string(),
    }),
  })).optional(),
  is_default: z.boolean().optional(),
  name: z.string().optional(),
  require: z.array(z.object({
    group: z.object({
      id: z.string(),
    }),
  })).optional(),
});

/** Swamp extension model for Cloudflare Groups. Registered at `@swamp/cloudflare/access/groups`. */
export const model = {
  type: "@swamp/cloudflare/access/groups",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Groups resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Groups",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/groups";
        const body: Record<string, unknown> = {};
        if (g.exclude !== undefined) body.exclude = g.exclude;
        if (g.include !== undefined) body.include = g.include;
        if (g.is_default !== undefined) body.is_default = g.is_default;
        if (g.name !== undefined) body.name = g.name;
        if (g.require !== undefined) body.require = g.require;
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
      description: "Get a Groups",
      arguments: z.object({ id: z.string().describe("The ID of the Groups") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/groups";
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
      description: "Update Groups attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/groups";
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
        if (g.exclude !== undefined) body.exclude = g.exclude;
        if (g.include !== undefined) body.include = g.include;
        if (g.is_default !== undefined) body.is_default = g.is_default;
        if (g.name !== undefined) body.name = g.name;
        if (g.require !== undefined) body.require = g.require;
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
      description: "Delete the Groups",
      arguments: z.object({ id: z.string().describe("The ID of the Groups") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/groups";
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
      description: "Sync Groups state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/groups";
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
