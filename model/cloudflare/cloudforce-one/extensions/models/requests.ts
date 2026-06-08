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

// Auto-generated extension model for @swamp/cloudflare/cloudforce-one/requests
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Requests.
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
  content: z.string().describe("Request content.").optional(),
  priority: z.string().describe("Priority for analyzing the request.")
    .optional(),
  request_type: z.string().describe("Requested information from request.")
    .optional(),
  summary: z.string().describe("Brief description of the request.").optional(),
  tlp: z.enum(["clear", "amber", "amber-strict", "green", "red"]).describe(
    "The CISA defined Traffic Light Protocol (TLP).",
  ).optional(),
  completed_after: z.string().optional(),
  completed_before: z.string().optional(),
  created_after: z.string().optional(),
  created_before: z.string().optional(),
  page: z.number().int().describe("Page number of results."),
  per_page: z.number().int().describe("Number of results per page."),
  sort_by: z.string().describe("Field to sort results by.").optional(),
  sort_order: z.enum(["asc", "desc"]).describe("Sort order (asc or desc).")
    .optional(),
  status: z.enum([
    "open",
    "accepted",
    "reported",
    "approved",
    "completed",
    "declined",
  ]).describe("Request Status.").optional(),
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
  completed: z.string().optional(),
  content: z.string().optional(),
  created: z.string().optional(),
  id: z.string(),
  message_tokens: z.number().optional(),
  priority: z.string().optional(),
  readable_id: z.string().optional(),
  request: z.string().optional(),
  status: z.string().optional(),
  summary: z.string().optional(),
  tlp: z.string().optional(),
  tokens: z.number().optional(),
  updated: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  content: z.string().optional(),
  priority: z.string().optional(),
  request_type: z.string().optional(),
  summary: z.string().optional(),
  tlp: z.enum(["clear", "amber", "amber-strict", "green", "red"]).optional(),
  completed_after: z.string().optional(),
  completed_before: z.string().optional(),
  created_after: z.string().optional(),
  created_before: z.string().optional(),
  page: z.number().int().optional(),
  per_page: z.number().int().optional(),
  sort_by: z.string().optional(),
  sort_order: z.enum(["asc", "desc"]).optional(),
  status: z.enum([
    "open",
    "accepted",
    "reported",
    "approved",
    "completed",
    "declined",
  ]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Requests. Registered at `@swamp/cloudflare/cloudforce-one/requests`. */
export const model = {
  type: "@swamp/cloudflare/cloudforce-one/requests",
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
      description: "Requests resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Requests",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/requests";
        const body: Record<string, unknown> = {};
        if (g.completed_after !== undefined) {
          body.completed_after = g.completed_after;
        }
        if (g.completed_before !== undefined) {
          body.completed_before = g.completed_before;
        }
        if (g.created_after !== undefined) body.created_after = g.created_after;
        if (g.created_before !== undefined) {
          body.created_before = g.created_before;
        }
        if (g.page !== undefined) body.page = g.page;
        if (g.per_page !== undefined) body.per_page = g.per_page;
        if (g.request_type !== undefined) body.request_type = g.request_type;
        if (g.sort_by !== undefined) body.sort_by = g.sort_by;
        if (g.sort_order !== undefined) body.sort_order = g.sort_order;
        if (g.status !== undefined) body.status = g.status;
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
      description: "Get a Requests",
      arguments: z.object({
        id: z.string().describe("The ID of the Requests"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/requests";
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
      description: "Update Requests attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/requests";
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
        if (g.content !== undefined) body.content = g.content;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.request_type !== undefined) body.request_type = g.request_type;
        if (g.summary !== undefined) body.summary = g.summary;
        if (g.tlp !== undefined) body.tlp = g.tlp;
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
      description: "Delete the Requests",
      arguments: z.object({
        id: z.string().describe("The ID of the Requests"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/requests";
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
      description: "Sync Requests state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/requests";
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
