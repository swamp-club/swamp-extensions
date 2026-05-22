// Auto-generated extension model for @swamp/cloudflare/email-security/block-senders
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Block Senders.
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
  comments: z.string().max(1024).optional(),
  created_at: z.string().optional(),
  id: z.string().describe("Blocked sender pattern identifier").optional(),
  is_regex: z.boolean().optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
  pattern: z.string().min(1).max(1024).optional(),
  pattern_type: z.enum(["EMAIL", "DOMAIN", "IP", "UNKNOWN"]).describe(
    "Type of pattern matching.\nNote: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.\n",
  ).optional(),
});

const ResourceSchema = z.object({
  comments: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string(),
  is_regex: z.boolean().optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
  pattern: z.string().optional(),
  pattern_type: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  comments: z.string().max(1024).optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  is_regex: z.boolean().optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
  pattern: z.string().min(1).max(1024).optional(),
  pattern_type: z.enum(["EMAIL", "DOMAIN", "IP", "UNKNOWN"]).optional(),
});

/** Swamp extension model for Cloudflare Block Senders. Registered at `@swamp/cloudflare/email-security/block-senders`. */
export const model = {
  type: "@swamp/cloudflare/email-security/block-senders",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Block Senders resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Block Senders",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/block_senders";
        const body: Record<string, unknown> = {};
        if (g.comments !== undefined) body.comments = g.comments;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.id !== undefined) body.id = g.id;
        if (g.is_regex !== undefined) body.is_regex = g.is_regex;
        if (g.last_modified !== undefined) body.last_modified = g.last_modified;
        if (g.modified_at !== undefined) body.modified_at = g.modified_at;
        if (g.pattern !== undefined) body.pattern = g.pattern;
        if (g.pattern_type !== undefined) body.pattern_type = g.pattern_type;
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
      description: "Get a Block Senders",
      arguments: z.object({
        id: z.string().describe("The ID of the Block Senders"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/block_senders";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update Block Senders attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/block_senders";
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
        if (g.comments !== undefined) body.comments = g.comments;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.id !== undefined) body.id = g.id;
        if (g.is_regex !== undefined) body.is_regex = g.is_regex;
        if (g.last_modified !== undefined) body.last_modified = g.last_modified;
        if (g.modified_at !== undefined) body.modified_at = g.modified_at;
        if (g.pattern !== undefined) body.pattern = g.pattern;
        if (g.pattern_type !== undefined) body.pattern_type = g.pattern_type;
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
      description: "Delete the Block Senders",
      arguments: z.object({
        id: z.string().describe("The ID of the Block Senders"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/block_senders";
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
      description: "Sync Block Senders state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/block_senders";
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
