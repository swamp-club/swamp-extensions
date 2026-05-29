// Auto-generated extension model for @swamp/cloudflare/challenges/widgets
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Widgets.
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
  bot_fight_mode: z.boolean().describe(
    "If bot_fight_mode is set to `true`, Cloudflare issues computationally\nexpensive challenges in response to malicious bots (ENT only).\n",
  ).optional(),
  clearance_level: z.enum([
    "no_clearance",
    "jschallenge",
    "managed",
    "interactive",
  ]).describe(
    "If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,\nthis setting can determine the clearance level to be set\n",
  ).optional(),
  domains: z.array(z.string()),
  ephemeral_id: z.boolean().describe(
    "Return the Ephemeral ID in /siteverify (ENT only).\n",
  ).optional(),
  mode: z.enum(["non-interactive", "invisible", "managed"]).describe(
    "Widget Mode",
  ),
  name: z.string().min(1).max(254).describe(
    "Human readable widget name. Not unique. Cloudflare suggests that you\nset this to a meaningful string to make it easier to identify your\nwidget, and where it is used.\n",
  ),
  offlabel: z.boolean().describe(
    "Do not show any Cloudflare branding on the widget (ENT only).\n",
  ).optional(),
  region: z.enum(["world", "china"]).describe(
    "Region where this widget can be used. This cannot be changed after creation.\n",
  ).optional(),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  bot_fight_mode: z.boolean().optional(),
  clearance_level: z.string().optional(),
  created_on: z.string().optional(),
  domains: z.array(z.string()).optional(),
  ephemeral_id: z.boolean().optional(),
  mode: z.string().optional(),
  modified_on: z.string().optional(),
  name: z.string().optional(),
  offlabel: z.boolean().optional(),
  region: z.string().optional(),
  secret: z.string().optional(),
  sitekey: z.string().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  bot_fight_mode: z.boolean().optional(),
  clearance_level: z.enum([
    "no_clearance",
    "jschallenge",
    "managed",
    "interactive",
  ]).optional(),
  domains: z.array(z.string()).optional(),
  ephemeral_id: z.boolean().optional(),
  mode: z.enum(["non-interactive", "invisible", "managed"]).optional(),
  name: z.string().min(1).max(254).optional(),
  offlabel: z.boolean().optional(),
  region: z.enum(["world", "china"]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Widgets. Registered at `@swamp/cloudflare/challenges/widgets`. */
export const model = {
  type: "@swamp/cloudflare/challenges/widgets",
  version: "2026.05.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Widgets resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Widgets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
        const body: Record<string, unknown> = {};
        if (g.bot_fight_mode !== undefined) {
          body.bot_fight_mode = g.bot_fight_mode;
        }
        if (g.clearance_level !== undefined) {
          body.clearance_level = g.clearance_level;
        }
        if (g.domains !== undefined) body.domains = g.domains;
        if (g.ephemeral_id !== undefined) body.ephemeral_id = g.ephemeral_id;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.name !== undefined) body.name = g.name;
        if (g.offlabel !== undefined) body.offlabel = g.offlabel;
        if (g.region !== undefined) body.region = g.region;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Get a Widgets",
      arguments: z.object({ id: z.string().describe("The ID of the Widgets") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
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
    update: {
      description: "Update Widgets attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
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
        if (g.bot_fight_mode !== undefined) {
          body.bot_fight_mode = g.bot_fight_mode;
        }
        if (g.clearance_level !== undefined) {
          body.clearance_level = g.clearance_level;
        }
        if (g.domains !== undefined) body.domains = g.domains;
        if (g.ephemeral_id !== undefined) body.ephemeral_id = g.ephemeral_id;
        if (g.mode !== undefined) body.mode = g.mode;
        if (g.name !== undefined) body.name = g.name;
        if (g.offlabel !== undefined) body.offlabel = g.offlabel;
        if (g.region !== undefined) body.region = g.region;
        const result = await update(endpoint, existing.id, body, "PUT", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Widgets",
      arguments: z.object({ id: z.string().describe("The ID of the Widgets") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
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
      description: "Sync Widgets state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/challenges/widgets";
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
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
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
