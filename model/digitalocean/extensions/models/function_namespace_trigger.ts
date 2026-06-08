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

// Auto-generated extension model for @swamp/digitalocean/function-namespace-trigger
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean function namespace trigger.
 *
 * Wraps the `/v2/functions/namespaces/{namespace_id}/triggers` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  namespace_id: z.string().describe("Parent resource identifier"),
  is_enabled: z.boolean().describe(
    "Indicates weather the trigger is paused or unpaused.",
  ),
  scheduled_details: z.object({
    cron: z.string(),
    body: z.object({
      name: z.string().optional(),
    }).optional(),
  }).describe("Trigger details for SCHEDULED type, where body is optional.\n"),
  name: z.string().describe("The trigger's unique name within the namespace."),
  function: z.string().describe(
    "Name of function(action) that exists in the given namespace.",
  ),
  type: z.string().describe(
    "One of different type of triggers. Currently only SCHEDULED is supported.",
  ),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  namespace: z.string().optional(),
  name: z.string(),
  function: z.string().optional(),
  type: z.string().optional(),
  is_enabled: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  scheduled_details: z.object({
    cron: z.string().optional(),
    body: z.object({
      name: z.string().optional(),
    }).optional(),
  }).optional(),
  scheduled_runs: z.object({
    last_run_at: z.string().optional(),
    next_run_at: z.string().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  namespace_id: z.string().optional(),
  is_enabled: z.boolean().optional(),
  scheduled_details: z.object({
    cron: z.string(),
    body: z.object({
      name: z.string().optional(),
    }).optional(),
  }).optional(),
  name: z.string().optional(),
  function: z.string().optional(),
  type: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean function namespace trigger. Registered at `@swamp/digitalocean/function-namespace-trigger`. */
export const model = {
  type: "@swamp/digitalocean/function-namespace-trigger",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: token",
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
      description: "Function Namespace Trigger resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a function namespace trigger",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/functions/namespaces/${g.namespace_id}/triggers`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryRead(endpoint, g.name, undefined, g.token);
          if (existing) {
            throw new Error(`Resource already exists: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.function !== undefined) body.function = g.function;
        if (g.type !== undefined) body.type = g.type;
        if (g.is_enabled !== undefined) body.is_enabled = g.is_enabled;
        if (g.scheduled_details !== undefined) {
          body.scheduled_details = g.scheduled_details;
        }
        const result = await create(
          endpoint,
          body,
          undefined,
          g.token,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a function namespace trigger",
      arguments: z.object({
        name: z.string().describe("The name of the function namespace trigger"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/functions/namespaces/${g.namespace_id}/triggers`;
        const result = await read(
          endpoint,
          args.name,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.name.toString())
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
      description: "Update function namespace trigger attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/functions/namespaces/${g.namespace_id}/triggers`;
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
        if (g.is_enabled !== undefined) body.is_enabled = g.is_enabled;
        if (g.scheduled_details !== undefined) {
          body.scheduled_details = g.scheduled_details;
        }
        const result = await update(
          endpoint,
          existing.name ?? existing.id,
          body,
          "PUT",
          undefined,
          g.token,
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
      description: "Delete the function namespace trigger",
      arguments: z.object({
        name: z.string().describe("The name of the function namespace trigger"),
      }),
      execute: async (args: { name: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/functions/namespaces/${g.namespace_id}/triggers`;
        const { existed } = await remove(
          endpoint,
          args.name,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.name.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          name: args.name,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync function namespace trigger state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/functions/namespaces/${g.namespace_id}/triggers`;
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
        const result = await tryRead(
          endpoint,
          existing.name ?? existing.id,
          undefined,
          g.token,
        ) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          name: existing.name ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
