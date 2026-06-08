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

// Auto-generated extension model for @swamp/digitalocean/dedicated-inference
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean dedicated inference.
 *
 * Wraps the `/v2/dedicated-inferences` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  spec: z.object({
    version: z.number().int(),
    name: z.string().max(255).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
    region: z.enum(["atl1", "nyc2", "tor1"]),
    vpc: z.object({
      uuid: z.string(),
    }),
    enable_public_endpoint: z.boolean(),
    model_deployments: z.array(z.object({
      model_id: z.string().optional(),
      model_slug: z.string().optional(),
      model_provider: z.enum(["hugging_face"]).optional(),
      workload_config: z.record(z.string(), z.unknown()).optional(),
      accelerators: z.array(z.object({
        scale: z.number().int().min(1),
        type: z.string(),
        accelerator_slug: z.string(),
        status: z.enum(["new", "provisioning", "active"]).optional(),
      })).optional(),
    })),
  }).describe("Structured configuration for a Dedicated Inference deployment."),
  access_tokens: z.record(z.string(), z.unknown()).describe(
    "Key-value pairs for provider tokens (e.g. Hugging Face).",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  status: z.string().optional(),
  region: z.string().optional(),
  vpc_uuid: z.string().optional(),
  spec: z.object({
    version: z.number().optional(),
    name: z.string().optional(),
    region: z.string().optional(),
    vpc: z.object({
      uuid: z.string().optional(),
    }).optional(),
    enable_public_endpoint: z.boolean().optional(),
    model_deployments: z.array(z.object({
      model_id: z.string().optional(),
      model_slug: z.string().optional(),
      model_provider: z.string().optional(),
      workload_config: z.record(z.string(), z.unknown()).optional(),
      accelerators: z.array(z.object({
        scale: z.number().optional(),
        type: z.string().optional(),
        accelerator_slug: z.string().optional(),
        status: z.string().optional(),
      })).optional(),
    })).optional(),
  }).optional(),
  pending_deployment_spec: z.object({
    id: z.string().optional(),
    version: z.number().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    vpc: z.object({
      uuid: z.string().optional(),
    }).optional(),
    enable_public_endpoint: z.boolean().optional(),
    model_deployments: z.array(z.object({
      model_id: z.string().optional(),
      model_slug: z.string().optional(),
      model_provider: z.string().optional(),
      workload_config: z.record(z.string(), z.unknown()).optional(),
      accelerators: z.array(z.object({
        scale: z.number().optional(),
        type: z.string().optional(),
        accelerator_slug: z.string().optional(),
        status: z.string().optional(),
      })).optional(),
    })).optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  }).optional(),
  endpoints: z.object({
    public_endpoint_fqdn: z.string().optional(),
    private_endpoint_fqdn: z.string().optional(),
  }).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  spec: z.object({
    version: z.number().int(),
    name: z.string().max(255).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
    region: z.enum(["atl1", "nyc2", "tor1"]),
    vpc: z.object({
      uuid: z.string(),
    }),
    enable_public_endpoint: z.boolean(),
    model_deployments: z.array(z.object({
      model_id: z.string().optional(),
      model_slug: z.string().optional(),
      model_provider: z.enum(["hugging_face"]).optional(),
      workload_config: z.record(z.string(), z.unknown()).optional(),
      accelerators: z.array(z.object({
        scale: z.number().int().min(1),
        type: z.string(),
        accelerator_slug: z.string(),
        status: z.enum(["new", "provisioning", "active"]).optional(),
      })).optional(),
    })),
  }).optional(),
  access_tokens: z.record(z.string(), z.unknown()).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean dedicated inference. Registered at `@swamp/digitalocean/dedicated-inference`. */
export const model = {
  type: "@swamp/digitalocean/dedicated-inference",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      description: "Dedicated Inference resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dedicated inference",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.spec !== undefined) body.spec = g.spec;
        if (g.access_tokens !== undefined) body.access_tokens = g.access_tokens;
        const result = await create(
          "/v2/dedicated-inferences",
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
      description: "Get a dedicated inference",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the dedicated inference",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/dedicated-inferences",
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
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
      description: "Update dedicated inference attributes",
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
        if (g.spec !== undefined) body.spec = g.spec;
        if (g.access_tokens !== undefined) body.access_tokens = g.access_tokens;
        const result = await update(
          "/v2/dedicated-inferences",
          existing.dedicatedinferenceid ?? existing.id,
          body,
          "PATCH",
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
      description: "Delete the dedicated inference",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the dedicated inference",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/dedicated-inferences",
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
      description: "Sync dedicated inference state from DigitalOcean",
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
          "/v2/dedicated-inferences",
          existing.dedicatedinferenceid ?? existing.id,
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
          dedicatedinferenceid: existing.dedicatedinferenceid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
