// Auto-generated extension model for @swamp/cloudflare/devices/ip-profiles
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Ip-profiles.
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
    "An optional description of the Device IP profile.",
  ).optional(),
  enabled: z.boolean().describe(
    "Whether the Device IP profile will be applied to matching devices.",
  ).optional(),
  match: z.string().max(10000).describe(
    'The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".',
  ),
  name: z.string().describe("A user-friendly name for the Device IP profile."),
  precedence: z.number().int().describe(
    "The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.",
  ),
  subnet_id: z.string().describe("The ID of the Subnet."),
});

const ResourceSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  id: z.string(),
  match: z.string().optional(),
  name: z.string().optional(),
  precedence: z.number().optional(),
  subnet_id: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  match: z.string().max(10000).optional(),
  name: z.string().optional(),
  precedence: z.number().int().optional(),
  subnet_id: z.string().optional(),
});

/** Swamp extension model for Cloudflare Ip-profiles. Registered at `@swamp/cloudflare/devices/ip-profiles`. */
export const model = {
  type: "@swamp/cloudflare/devices/ip-profiles",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Ip-profiles resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Ip-profiles",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/ip-profiles";
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.match !== undefined) body.match = g.match;
        if (g.name !== undefined) body.name = g.name;
        if (g.precedence !== undefined) body.precedence = g.precedence;
        if (g.subnet_id !== undefined) body.subnet_id = g.subnet_id;
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
      description: "Get a Ip-profiles",
      arguments: z.object({
        id: z.string().describe("The ID of the Ip-profiles"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/ip-profiles";
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
      description: "Update Ip-profiles attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/ip-profiles";
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
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.match !== undefined) body.match = g.match;
        if (g.name !== undefined) body.name = g.name;
        if (g.precedence !== undefined) body.precedence = g.precedence;
        if (g.subnet_id !== undefined) body.subnet_id = g.subnet_id;
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
      description: "Delete the Ip-profiles",
      arguments: z.object({
        id: z.string().describe("The ID of the Ip-profiles"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/ip-profiles";
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
      description: "Sync Ip-profiles state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/ip-profiles";
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
