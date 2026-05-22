// Auto-generated extension model for @swamp/cloudflare/dlp/predefined
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Predefined.
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
  ai_context_enabled: z.boolean().optional(),
  allowed_match_count: z.number().int().min(0).max(1000).optional(),
  confidence_threshold: z.string().optional(),
  context_awareness: z.object({
    enabled: z.boolean(),
    skip: z.object({
      files: z.boolean(),
    }),
  }).describe(
    "Scan the context of predefined entries to only return matches surrounded by keywords.",
  ).optional(),
  entries: z.array(z.object({
    enabled: z.boolean(),
    id: z.string(),
  })).optional(),
  ocr_enabled: z.boolean().optional(),
  profile_id: z.string(),
});

const ResourceSchema = z.object({
  errors: z.array(z.object({
    code: z.number().optional(),
    documentation_url: z.string().optional(),
    message: z.string().optional(),
    source: z.object({
      pointer: z.string().optional(),
    }).optional(),
  })).optional(),
  messages: z.array(z.object({
    code: z.number().optional(),
    documentation_url: z.string().optional(),
    message: z.string().optional(),
    source: z.object({
      pointer: z.string().optional(),
    }).optional(),
  })).optional(),
  success: z.boolean().optional(),
  result: z.object({
    ai_context_enabled: z.boolean().optional(),
    allowed_match_count: z.number().optional(),
    confidence_threshold: z.string().optional(),
    context_awareness: z.object({
      enabled: z.boolean().optional(),
      skip: z.object({
        files: z.boolean().optional(),
      }).optional(),
    }).optional(),
    created_at: z.string().optional(),
    data_classes: z.array(z.string()).optional(),
    data_tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    entries: z.array(z.object({
      created_at: z.string().optional(),
      description: z.string().optional(),
      enabled: z.boolean().optional(),
      id: z.string().optional(),
      name: z.string().optional(),
      pattern: z.object({
        regex: z.string().optional(),
        validation: z.string().optional(),
      }).optional(),
      profile_id: z.string().optional(),
      updated_at: z.string().optional(),
      type: z.string().optional(),
    })).optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    ocr_enabled: z.boolean().optional(),
    sensitivity_levels: z.array(z.object({
      group_id: z.string().optional(),
      level_id: z.string().optional(),
    })).optional(),
    shared_entries: z.array(z.object({
      created_at: z.string().optional(),
      description: z.string().optional(),
      enabled: z.boolean().optional(),
      id: z.string().optional(),
      name: z.string().optional(),
      pattern: z.object({
        regex: z.string().optional(),
        validation: z.string().optional(),
      }).optional(),
      profile_id: z.string().optional(),
      updated_at: z.string().optional(),
      type: z.string().optional(),
    })).optional(),
    updated_at: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  ai_context_enabled: z.boolean().optional(),
  allowed_match_count: z.number().int().min(0).max(1000).optional(),
  confidence_threshold: z.string().optional(),
  context_awareness: z.object({
    enabled: z.boolean(),
    skip: z.object({
      files: z.boolean(),
    }),
  }).optional(),
  entries: z.array(z.object({
    enabled: z.boolean(),
    id: z.string(),
  })).optional(),
  ocr_enabled: z.boolean().optional(),
  profile_id: z.string().optional(),
});

/** Swamp extension model for Cloudflare Predefined. Registered at `@swamp/cloudflare/dlp/predefined`. */
export const model = {
  type: "@swamp/cloudflare/dlp/predefined",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Predefined resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Predefined",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/dlp/profiles/predefined";
        const body: Record<string, unknown> = {};
        if (g.ai_context_enabled !== undefined) {
          body.ai_context_enabled = g.ai_context_enabled;
        }
        if (g.allowed_match_count !== undefined) {
          body.allowed_match_count = g.allowed_match_count;
        }
        if (g.confidence_threshold !== undefined) {
          body.confidence_threshold = g.confidence_threshold;
        }
        if (g.context_awareness !== undefined) {
          body.context_awareness = g.context_awareness;
        }
        if (g.entries !== undefined) body.entries = g.entries;
        if (g.ocr_enabled !== undefined) body.ocr_enabled = g.ocr_enabled;
        if (g.profile_id !== undefined) body.profile_id = g.profile_id;
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
      description: "Get a Predefined",
      arguments: z.object({
        id: z.string().describe("The ID of the Predefined"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/dlp/profiles/predefined";
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
      description: "Update Predefined attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/dlp/profiles/predefined";
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
        if (g.ai_context_enabled !== undefined) {
          body.ai_context_enabled = g.ai_context_enabled;
        }
        if (g.allowed_match_count !== undefined) {
          body.allowed_match_count = g.allowed_match_count;
        }
        if (g.confidence_threshold !== undefined) {
          body.confidence_threshold = g.confidence_threshold;
        }
        if (g.context_awareness !== undefined) {
          body.context_awareness = g.context_awareness;
        }
        if (g.entries !== undefined) body.entries = g.entries;
        if (g.ocr_enabled !== undefined) body.ocr_enabled = g.ocr_enabled;
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
      description: "Delete the Predefined",
      arguments: z.object({
        id: z.string().describe("The ID of the Predefined"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/dlp/profiles/predefined";
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
      description: "Sync Predefined state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/dlp/profiles/predefined";
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
