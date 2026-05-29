// Auto-generated extension model for @swamp/cloudflare/ai-gateway/custom-providers
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Custom-providers.
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
  base_url: z.string(),
  beta: z.boolean().optional(),
  curl_example: z.string().optional(),
  description: z.string().optional(),
  enable: z.boolean().optional(),
  headers: z.string().max(8192).optional(),
  js_example: z.string().optional(),
  link: z.string().optional(),
  logo: z.string().optional(),
  name: z.string(),
  position: z.number().int().optional(),
  slug: z.string(),
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
  base_url: z.string().optional(),
  beta: z.boolean().optional(),
  created_at: z.string().optional(),
  curl_example: z.string().optional(),
  description: z.string().optional(),
  enable: z.boolean().optional(),
  headers: z.string().optional(),
  id: z.string(),
  js_example: z.string().optional(),
  link: z.string().optional(),
  logo: z.string().optional(),
  modified_at: z.string().optional(),
  name: z.string().optional(),
  position: z.number().optional(),
  slug: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  base_url: z.string().optional(),
  beta: z.boolean().optional(),
  curl_example: z.string().optional(),
  description: z.string().optional(),
  enable: z.boolean().optional(),
  headers: z.string().max(8192).optional(),
  js_example: z.string().optional(),
  link: z.string().optional(),
  logo: z.string().optional(),
  name: z.string().optional(),
  position: z.number().int().optional(),
  slug: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Custom-providers. Registered at `@swamp/cloudflare/ai-gateway/custom-providers`. */
export const model = {
  type: "@swamp/cloudflare/ai-gateway/custom-providers",
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
      description: "Custom-providers resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Custom-providers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers";
        const body: Record<string, unknown> = {};
        if (g.base_url !== undefined) body.base_url = g.base_url;
        if (g.beta !== undefined) body.beta = g.beta;
        if (g.curl_example !== undefined) body.curl_example = g.curl_example;
        if (g.description !== undefined) body.description = g.description;
        if (g.enable !== undefined) body.enable = g.enable;
        if (g.headers !== undefined) body.headers = g.headers;
        if (g.js_example !== undefined) body.js_example = g.js_example;
        if (g.link !== undefined) body.link = g.link;
        if (g.name !== undefined) body.name = g.name;
        if (g.position !== undefined) body.position = g.position;
        if (g.slug !== undefined) body.slug = g.slug;
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
      description: "Get a Custom-providers",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom-providers"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers";
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
      description: "Update Custom-providers attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers";
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
        if (g.base_url !== undefined) body.base_url = g.base_url;
        if (g.beta !== undefined) body.beta = g.beta;
        if (g.curl_example !== undefined) body.curl_example = g.curl_example;
        if (g.description !== undefined) body.description = g.description;
        if (g.enable !== undefined) body.enable = g.enable;
        if (g.headers !== undefined) body.headers = g.headers;
        if (g.js_example !== undefined) body.js_example = g.js_example;
        if (g.link !== undefined) body.link = g.link;
        if (g.logo !== undefined) body.logo = g.logo;
        if (g.name !== undefined) body.name = g.name;
        if (g.position !== undefined) body.position = g.position;
        if (g.slug !== undefined) body.slug = g.slug;
        const result = await update(endpoint, existing.id, body, "PATCH", {
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
      description: "Delete the Custom-providers",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom-providers"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers";
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
      description: "Sync Custom-providers state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/ai-gateway/custom-providers";
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
