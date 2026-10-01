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

// Auto-generated extension model for @swamp/digitalocean/action-gateway-session
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean action gateway session.
 *
 * Wraps the `/v2/action-gateway/sessions` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  read,
  remove,
  tryFindByField,
  tryRead,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe("Required human-readable session name."),
  actorId: z.string().regex(new RegExp("^[A-Za-z0-9._-]{1,64}$")).describe(
    "Optional actor binding: the user whose connections the session's tool calls use, matched against connection `user_id`. When set it must use the same alphabet as a connection's `user_id`, `[A-Za-z0-9._-]`, at most 64 characters; anything else is rejected with 400.",
  ).optional(),
  policy: z.object({
    defaultAction: z.enum(["allow", "ask", "deny"]).optional(),
    rules: z.array(z.object({
      tool: z.string().optional(),
      match: z.record(z.string(), z.unknown()).optional(),
      action: z.enum(["allow", "ask", "deny"]).optional(),
    })).optional(),
  }).describe(
    "Optional tool-permission policy. Omitted asks before every call.",
  ).optional(),
  tools: z.array(z.string()).describe(
    "Omitted enables every tool. An explicit empty array enables no tools. Direct tools may be `<tool>` or `<tool>@<version>`, using provider-qualified tool slugs, and a pinned version must be the released one; toolbelt references must be version-pinned as `toolbelt:<belt-name>@<version>`.",
  ).optional(),
  config: z.record(z.string(), z.unknown()).describe(
    "Optional session options. config.preloadTools may contain concrete tool names (optionally version-pinned) and version-pinned toolbelt references. config.customInstructions is a string of at most 1000 characters. config.outputViews maps up to 100 tool slugs to the name of an output view to apply to that tool's results.",
  ).optional(),
  network: z.object({
    vpcUuid: z.string().optional(),
  }).describe(
    "Product-level session network binding. When set, `vpc_uuid` must identify a VPC owned by the session's team.",
  ).optional(),
  insights: z.object({
    metrics: z.boolean().optional(),
    logs: z.boolean().optional(),
    traces: z.boolean().optional(),
  }).describe(
    "Omitted when the request omitted insights or explicitly sent null.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  sessionUrn: z.string().optional(),
  name: z.string().optional(),
  actorId: z.string().optional(),
  policy: z.object({
    defaultAction: z.string().optional(),
    rules: z.array(z.object({
      tool: z.string().optional(),
      match: z.record(z.string(), z.unknown()).optional(),
      action: z.string().optional(),
    })).optional(),
  }).nullable().optional(),
  tools: z.object({
    references: z.array(z.object({
      kind: z.string().optional(),
      name: z.string().optional(),
      version: z.string().optional(),
    })).optional(),
  }).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  network: z.object({
    vpcUuid: z.string().optional(),
  }).optional(),
  insights: z.object({
    metrics: z.boolean().optional(),
    logs: z.boolean().optional(),
    traces: z.boolean().optional(),
  }).optional(),
  agentUrn: z.string().optional(),
  agentName: z.string().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  owning_user_id: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  actorId: z.string().regex(new RegExp("^[A-Za-z0-9._-]{1,64}$")).optional(),
  policy: z.object({
    defaultAction: z.enum(["allow", "ask", "deny"]).optional(),
    rules: z.array(z.object({
      tool: z.string().optional(),
      match: z.record(z.string(), z.unknown()).optional(),
      action: z.enum(["allow", "ask", "deny"]).optional(),
    })).optional(),
  }).optional(),
  tools: z.array(z.string()).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  network: z.object({
    vpcUuid: z.string().optional(),
  }).optional(),
  insights: z.object({
    metrics: z.boolean().optional(),
    logs: z.boolean().optional(),
    traces: z.boolean().optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean action gateway session. Registered at `@swamp/digitalocean/action-gateway-session`. */
export const model = {
  type: "@swamp/digitalocean/action-gateway-session",
  version: "2026.10.01.1",
  upgrades: [
    {
      toVersion: "2026.10.01.1",
      description: "Added: actorId, network, insights. Removed: actor_id",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { actor_id: _actor_id, ...rest } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Action Gateway Session resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a action gateway session",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/action-gateway/sessions",
            "name",
            g.name?.toString() ?? "",
            g.token,
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.actorId !== undefined) body.actorId = g.actorId;
        if (g.policy !== undefined) body.policy = g.policy;
        if (g.tools !== undefined) body.tools = g.tools;
        if (g.config !== undefined) body.config = g.config;
        if (g.network !== undefined) body.network = g.network;
        if (g.insights !== undefined) body.insights = g.insights;
        const result = await create(
          "/v2/action-gateway/sessions",
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
      description: "Get a action gateway session",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway session",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/action-gateway/sessions",
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id.toString())
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the action gateway session",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway session",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/action-gateway/sessions",
          args.id,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync action gateway session state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
          "/v2/action-gateway/sessions",
          existing.sessionurn ?? existing.id,
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
          sessionurn: existing.sessionurn ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
