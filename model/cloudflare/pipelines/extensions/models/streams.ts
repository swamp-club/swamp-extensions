// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/cloudflare/pipelines/streams
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Streams.
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
  http: z.object({
    authentication: z.boolean(),
    cors: z.object({
      origins: z.array(z.string()).optional(),
    }).optional(),
    enabled: z.boolean(),
  }).optional(),
  worker_binding: z.object({
    enabled: z.boolean(),
  }).optional(),
  format: z.object({
    decimal_encoding: z.enum(["number", "string", "bytes"]).optional(),
    timestamp_format: z.enum(["rfc3339", "unix_millis"]).optional(),
    unstructured: z.boolean().optional(),
    type: z.enum(["json"]),
  }).optional(),
  name: z.string().min(1).max(128).describe(
    "Specifies the name of the Stream.",
  ),
  schema: z.object({
    fields: z.array(z.object({
      metadata_key: z.string().optional(),
      name: z.string(),
      required: z.boolean().optional(),
      sql_name: z.string().optional(),
    })).optional(),
    format: z.string().optional(),
    inferred: z.boolean().optional(),
  }).optional(),
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
  created_at: z.string().optional(),
  endpoint: z.string().optional(),
  format: z.object({
    decimal_encoding: z.string().optional(),
    timestamp_format: z.string().optional(),
    unstructured: z.boolean().optional(),
    type: z.string().optional(),
  }).optional(),
  http: z.object({
    authentication: z.boolean().optional(),
    cors: z.object({
      origins: z.array(z.string()).optional(),
    }).optional(),
    enabled: z.boolean().optional(),
  }).optional(),
  id: z.string(),
  modified_at: z.string().optional(),
  name: z.string().optional(),
  schema: z.object({
    fields: z.array(z.object({
      metadata_key: z.string().optional(),
      name: z.string().optional(),
      required: z.boolean().optional(),
      sql_name: z.string().optional(),
    })).optional(),
    format: z.string().optional(),
    inferred: z.boolean().optional(),
  }).optional(),
  version: z.number().optional(),
  worker_binding: z.object({
    enabled: z.boolean().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  http: z.object({
    authentication: z.boolean(),
    cors: z.object({
      origins: z.array(z.string()).optional(),
    }).optional(),
    enabled: z.boolean(),
  }).optional(),
  worker_binding: z.object({
    enabled: z.boolean(),
  }).optional(),
  format: z.object({
    decimal_encoding: z.enum(["number", "string", "bytes"]).optional(),
    timestamp_format: z.enum(["rfc3339", "unix_millis"]).optional(),
    unstructured: z.boolean().optional(),
    type: z.enum(["json"]),
  }).optional(),
  name: z.string().min(1).max(128).optional(),
  schema: z.object({
    fields: z.array(z.object({
      metadata_key: z.string().optional(),
      name: z.string(),
      required: z.boolean().optional(),
      sql_name: z.string().optional(),
    })).optional(),
    format: z.string().optional(),
    inferred: z.boolean().optional(),
  }).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Streams. Registered at `@swamp/cloudflare/pipelines/streams`. */
export const model = {
  type: "@swamp/cloudflare/pipelines/streams",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Streams resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Streams",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
        const body: Record<string, unknown> = {};
        if (g.format !== undefined) body.format = g.format;
        if (g.http !== undefined) body.http = g.http;
        if (g.name !== undefined) body.name = g.name;
        if (g.schema !== undefined) body.schema = g.schema;
        if (g.worker_binding !== undefined) {
          body.worker_binding = g.worker_binding;
        }
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
      description: "Get a Streams",
      arguments: z.object({ id: z.string().describe("The ID of the Streams") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
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
      description: "Update Streams attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
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
        if (g.http !== undefined) body.http = g.http;
        if (g.worker_binding !== undefined) {
          body.worker_binding = g.worker_binding;
        }
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
      description: "Delete the Streams",
      arguments: z.object({ id: z.string().describe("The ID of the Streams") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
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
      description: "Sync Streams state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pipelines/v1/streams";
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
