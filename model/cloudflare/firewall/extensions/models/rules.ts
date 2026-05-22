// Auto-generated extension model for @swamp/cloudflare/firewall/rules
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Rules.
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  allowed_modes: z.array(
    z.enum([
      "block",
      "challenge",
      "whitelist",
      "js_challenge",
      "managed_challenge",
    ]),
  ).describe(
    "The available actions that a rule can apply to a matched request.",
  ).optional(),
  configuration: z.object({
    target: z.enum(["ip"]).optional(),
    value: z.string().optional(),
  }),
  created_on: z.string().describe("The timestamp of when the rule was created.")
    .optional(),
  id: z.string().max(32).describe(
    "The unique identifier of the IP Access rule.",
  ).optional(),
  mode: z.enum([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]).describe("The action to apply to a matched request."),
  modified_on: z.string().describe(
    "The timestamp of when the rule was last modified.",
  ).optional(),
  notes: z.string().describe(
    "An informative summary of the rule, typically used as a reminder or explanation.",
  ).optional(),
  scope: z.object({
    email: z.string().max(90).optional(),
    id: z.string().max(32).optional(),
    type: z.enum(["user", "organization"]).optional(),
  }).describe("All zones owned by the user will have the rule applied.")
    .optional(),
}).refine(
  (d) => (d.account_id != null) !== (d.zone_id != null),
  "Exactly one of account_id or zone_id must be provided",
);

const ResourceSchema = z.object({
  allowed_modes: z.array(z.string()).optional(),
  configuration: z.object({
    target: z.string().optional(),
    value: z.string().optional(),
  }).optional(),
  created_on: z.string().optional(),
  id: z.string(),
  mode: z.string().optional(),
  modified_on: z.string().optional(),
  notes: z.string().optional(),
  scope: z.object({
    email: z.string().optional(),
    id: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  zone_id: z.string().optional(),
  name: z.string().optional(),
  allowed_modes: z.array(
    z.enum([
      "block",
      "challenge",
      "whitelist",
      "js_challenge",
      "managed_challenge",
    ]),
  ).optional(),
  configuration: z.object({
    target: z.enum(["ip"]).optional(),
    value: z.string().optional(),
  }).optional(),
  created_on: z.string().optional(),
  id: z.string().max(32).optional(),
  mode: z.enum([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]).optional(),
  modified_on: z.string().optional(),
  notes: z.string().optional(),
  scope: z.object({
    email: z.string().max(90).optional(),
    id: z.string().max(32).optional(),
    type: z.enum(["user", "organization"]).optional(),
  }).optional(),
});

/** Swamp extension model for Cloudflare Rules. Registered at `@swamp/cloudflare/firewall/rules`. */
export const model = {
  type: "@swamp/cloudflare/firewall/rules",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Rules resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Rules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/firewall/access_rules/rules";
        const body: Record<string, unknown> = {};
        if (g.configuration !== undefined) body.configuration = g.configuration;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.notes !== undefined) body.notes = g.notes;
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
      description: "Get a Rules",
      arguments: z.object({ id: z.string().describe("The ID of the Rules") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/firewall/access_rules/rules";
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
      description: "Update Rules attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/firewall/access_rules/rules";
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
        if (g.allowed_modes !== undefined) body.allowed_modes = g.allowed_modes;
        if (g.configuration !== undefined) body.configuration = g.configuration;
        if (g.created_on !== undefined) body.created_on = g.created_on;
        if (g.id !== undefined) body.id = g.id;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.modified_on !== undefined) body.modified_on = g.modified_on;
        if (g.notes !== undefined) body.notes = g.notes;
        if (g.scope !== undefined) body.scope = g.scope;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PATCH",
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
      description: "Delete the Rules",
      arguments: z.object({ id: z.string().describe("The ID of the Rules") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/firewall/access_rules/rules";
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
      description: "Sync Rules state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/firewall/access_rules/rules";
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
