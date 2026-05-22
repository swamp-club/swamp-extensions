// Auto-generated extension model for @swamp/cloudflare/access/policy-tests
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Policy-tests.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  policies: z.array(z.object({
    decision: z.enum(["allow", "deny", "non_identity", "bypass"]),
    exclude: z.array(z.object({
      group: z.object({
        id: z.string(),
      }),
    })).optional(),
    include: z.array(z.object({
      group: z.object({
        id: z.string(),
      }),
    })),
    name: z.string(),
    require: z.array(z.object({
      group: z.object({
        id: z.string(),
      }),
    })).optional(),
  })).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  percent_approved: z.number().optional(),
  percent_blocked: z.number().optional(),
  percent_errored: z.number().optional(),
  percent_users_processed: z.number().optional(),
  status: z.string().optional(),
  total_users: z.number().optional(),
  users_approved: z.number().optional(),
  users_blocked: z.number().optional(),
  users_errored: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  policies: z.array(z.object({
    decision: z.enum(["allow", "deny", "non_identity", "bypass"]),
    exclude: z.array(z.object({
      group: z.object({
        id: z.string(),
      }),
    })).optional(),
    include: z.array(z.object({
      group: z.object({
        id: z.string(),
      }),
    })),
    name: z.string(),
    require: z.array(z.object({
      group: z.object({
        id: z.string(),
      }),
    })).optional(),
  })).optional(),
});

/** Swamp extension model for Cloudflare Policy-tests. Registered at `@swamp/cloudflare/access/policy-tests`. */
export const model = {
  type: "@swamp/cloudflare/access/policy-tests",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Policy-tests resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Policy-tests",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policy-tests";
        const body: Record<string, unknown> = {};
        if (g.policies !== undefined) body.policies = g.policies;
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
      description: "Get a Policy-tests",
      arguments: z.object({
        id: z.string().describe("The ID of the Policy-tests"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policy-tests";
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
    sync: {
      description: "Sync Policy-tests state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policy-tests";
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
