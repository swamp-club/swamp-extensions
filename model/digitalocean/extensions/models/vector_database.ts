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

// Auto-generated extension model for @swamp/digitalocean/vector-database
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean vector database.
 *
 * Wraps the `/v2/vector-databases` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  read,
  remove,
  subResourceUpdate,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  config: z.object({
    default_quantization: z.string().optional(),
    enable_auto_schema: z.boolean().optional(),
    weaviate_version: z.string().optional(),
  }).describe("VectorDBConfig holds optional, advanced cluster settings.")
    .optional(),
  id: z.string().describe("ID of the vector database.").optional(),
  project_id: z.string().describe(
    "Required. ID of the project to create the vector database in.",
  ).optional(),
  name: z.string().describe("Required. Human-readable name for the database.")
    .optional(),
  region: z.enum([
    "nyc1",
    "sfo1",
    "nyc2",
    "ams2",
    "sgp1",
    "lon1",
    "nyc3",
    "ams3",
    "fra1",
    "tor1",
    "sfo2",
    "blr1",
    "sfo3",
    "syd1",
    "atl1",
  ]).describe("Required. Region slug where the database will be provisioned.")
    .optional(),
  size: z.string().describe("Required. Resource tier: small, medium, or large.")
    .optional(),
  tags: z.array(z.string()).describe(
    "A set of arbitrary tags to organize your vector database",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  config: z.object({
    default_quantization: z.string().optional(),
    enable_auto_schema: z.boolean().optional(),
    weaviate_version: z.string().optional(),
  }).optional(),
  created_at: z.string().optional(),
  endpoints: z.object({
    grpc: z.string().optional(),
    http: z.string().optional(),
  }).optional(),
  forked_from_id: z.string().optional(),
  id: z.string(),
  last_restore_id: z.string().optional(),
  name: z.string().optional(),
  owner_uuid: z.string().optional(),
  project_id: z.string().optional(),
  region: z.string().optional(),
  size: z.string().optional(),
  status: z.string().optional(),
  tags: z.array(z.string()).optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  config: z.object({
    default_quantization: z.string().optional(),
    enable_auto_schema: z.boolean().optional(),
    weaviate_version: z.string().optional(),
  }).optional(),
  id: z.string().optional(),
  project_id: z.string().optional(),
  name: z.string().optional(),
  region: z.enum([
    "nyc1",
    "sfo1",
    "nyc2",
    "ams2",
    "sgp1",
    "lon1",
    "nyc3",
    "ams3",
    "fra1",
    "tor1",
    "sfo2",
    "blr1",
    "sfo3",
    "syd1",
    "atl1",
  ]).optional(),
  size: z.string().optional(),
  tags: z.array(z.string()).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean vector database. Registered at `@swamp/digitalocean/vector-database`. */
export const model = {
  type: "@swamp/digitalocean/vector-database",
  version: "2026.06.24.2",
  upgrades: [
    {
      toVersion: "2026.06.24.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Vector Database resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a vector database",
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
            "/v2/vector-databases",
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
        if (g.project_id !== undefined) body.project_id = g.project_id;
        if (g.region !== undefined) body.region = g.region;
        if (g.size !== undefined) body.size = g.size;
        if (g.tags !== undefined) body.tags = g.tags;
        const result = await create(
          "/v2/vector-databases",
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
      description: "Get a vector database",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the vector database",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/vector-databases",
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
    update: {
      description: "Update vector database attributes",
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
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.config !== undefined) body.config = g.config;
        if (g.id !== undefined) body.id = g.id;
        if (g.project_id !== undefined) body.project_id = g.project_id;
        const result = await update(
          "/v2/vector-databases",
          existing.id ?? existing.id,
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
      description: "Delete the vector database",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the vector database",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/vector-databases",
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
      description: "Sync vector database state from DigitalOcean",
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
          "/v2/vector-databases",
          existing.id ?? existing.id,
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
          id: existing.id ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    tags: {
      description: "tags the vector database",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the vector database",
        ),
        tags: z.array(z.string()).describe(
          "Tags to set on the vector database. Replaces all existing tags.",
        ).optional(),
      }),
      execute: async (
        args: { id: string | number; tags?: unknown[] },
        context: any,
      ) => {
        const body: Record<string, unknown> = {};
        if (args.id !== undefined) body.id = args.id;
        if (args.tags !== undefined) body.tags = args.tags;
        await subResourceUpdate(
          "/v2/vector-databases",
          args.id,
          "tags",
          body,
          "PUT",
          context.globalArgs.token,
        );
        const result = await read(
          "/v2/vector-databases",
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
  },
};
