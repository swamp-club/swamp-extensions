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
  policy: z.object({
    defaultAction: z.enum(["allow", "ask", "deny"]).optional(),
    rules: z.array(z.object({
      tool: z.string().optional(),
      match: z.record(z.string(), z.unknown()).optional(),
      action: z.enum(["allow", "ask", "deny"]).optional(),
    })).optional(),
  }).describe("Invocation policy. Omit to use a default action of ask.")
    .optional(),
  name: z.string(),
  tools: z.array(z.string()).describe(
    "Omitted enables every tool. An explicit empty array enables no tools.\nDirect tools may be <tool> or <tool>@<version>; toolbelt references must\nbe version-pinned as toolbelt:<belt-name>@<version>.",
  ).optional(),
  config: z.object({
    preloadTools: z.array(z.string()).optional(),
  }).describe(
    "Opaque session options. config.preloadTools may contain concrete tool\nnames (optionally version-pinned) and version-pinned toolbelt references.",
  ).optional(),
  actor_id: z.string(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  sessionUrn: z.string().optional(),
  policy: z.object({
    defaultAction: z.string().optional(),
    rules: z.array(z.object({
      tool: z.string().optional(),
      match: z.record(z.string(), z.unknown()).optional(),
      action: z.string().optional(),
    })).optional(),
  }).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  name: z.string().optional(),
  actorId: z.string().optional(),
  tools: z.object({
    references: z.array(z.object({
      kind: z.string().optional(),
      name: z.string().optional(),
      version: z.string().optional(),
    })).optional(),
  }).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  policy: z.object({
    defaultAction: z.enum(["allow", "ask", "deny"]).optional(),
    rules: z.array(z.object({
      tool: z.string().optional(),
      match: z.record(z.string(), z.unknown()).optional(),
      action: z.enum(["allow", "ask", "deny"]).optional(),
    })).optional(),
  }).optional(),
  name: z.string().optional(),
  tools: z.array(z.string()).optional(),
  config: z.object({
    preloadTools: z.array(z.string()).optional(),
  }).optional(),
  actor_id: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean action gateway session. Registered at `@swamp/digitalocean/action-gateway-session`. */
export const model = {
  type: "@swamp/digitalocean/action-gateway-session",
  version: "2026.09.24.1",
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
        if (g.policy !== undefined) body.policy = g.policy;
        if (g.name !== undefined) body.name = g.name;
        if (g.tools !== undefined) body.tools = g.tools;
        if (g.config !== undefined) body.config = g.config;
        if (g.actor_id !== undefined) body.actor_id = g.actor_id;
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
