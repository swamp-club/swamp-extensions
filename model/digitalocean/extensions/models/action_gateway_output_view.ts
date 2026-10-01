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

// Auto-generated extension model for @swamp/digitalocean/action-gateway-output-view
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean action gateway output view.
 *
 * Wraps the `/v2/action-gateway/output-views` API as a swamp model so create, get, update,
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
  tool: z.string().describe(
    "Exactly one of tool or `tool_id` selects the tool version. tool is a provider-qualified slug, optionally pinned as `<tool>@<version>`. You can bind only the released version your catalog exposes: an unpinned slug resolves it and the response echoes it as version; a pin must equal it, and a `tool_id` (the opaque identity from tool search) must be that version. Any other version returns 404.",
  ).optional(),
  tool_id: z.string().describe("Opaque ID of the tool version; see tool.")
    .optional(),
  name: z.string().regex(new RegExp("^[a-z][a-z0-9_-]{0,63}$")).describe(
    "View name. Must match `^`[a-z]``[a-z0-9_-]`{0,63}$` and be unique per tool version within your team.",
  ),
  description: z.string().max(512).describe(
    "Optional description. At most 512 bytes.",
  ).optional(),
  fields: z.array(z.string()).describe(
    "Output paths to keep, 1 to 64 of them. Each is a dotted path of up to 8 segments made of `[A-Za-z0-9_-]`, and must be declared by the tool's output schema; arrays are traversed element-wise. Paths may not repeat or be a prefix of one another. The tool version must declare an object output schema.",
  ),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  view_id: z.string().optional(),
  tool_id: z.string().optional(),
  tool: z.string().optional(),
  version: z.string().optional(),
  team_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  kind: z.string().optional(),
  fields: z.array(z.string()).optional(),
  output_schema: z.record(z.string(), z.unknown()).nullable().optional(),
  audit: z.object({
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    deletedAt: z.string().optional(),
  }).nullable().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  tool: z.string().optional(),
  tool_id: z.string().optional(),
  name: z.string().regex(new RegExp("^[a-z][a-z0-9_-]{0,63}$")).optional(),
  description: z.string().max(512).optional(),
  fields: z.array(z.string()).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean action gateway output view. Registered at `@swamp/digitalocean/action-gateway-output-view`. */
export const model = {
  type: "@swamp/digitalocean/action-gateway-output-view",
  version: "2026.10.01.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Action Gateway Output View resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a action gateway output view",
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
            "/v2/action-gateway/output-views",
            "name",
            g.name?.toString() ?? "",
            g.token,
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.tool !== undefined) body.tool = g.tool;
        if (g.tool_id !== undefined) body.tool_id = g.tool_id;
        if (g.name !== undefined) body.name = g.name;
        if (g.description !== undefined) body.description = g.description;
        if (g.fields !== undefined) body.fields = g.fields;
        const result = await create(
          "/v2/action-gateway/output-views",
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
      description: "Get a action gateway output view",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway output view",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/action-gateway/output-views",
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
      description: "Delete the action gateway output view",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway output view",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/action-gateway/output-views",
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
      description: "Sync action gateway output view state from DigitalOcean",
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
          "/v2/action-gateway/output-views",
          existing.viewid ?? existing.id,
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
          viewid: existing.viewid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
