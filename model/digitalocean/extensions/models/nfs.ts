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

// Auto-generated extension model for @swamp/digitalocean/nfs
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean nfs.
 *
 * Wraps the `/v2/nfs` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  createAndPollAction,
  read,
  remove,
  tryFindByField,
  tryRead,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe("The human-readable name of the share."),
  size_gib: z.number().int().describe(
    "The desired/provisioned size of the share in GiB (Gibibytes). Must be >= 50.",
  ),
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
  ]).describe(
    "The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides.",
  ),
  vpc_ids: z.array(z.string()).describe(
    "List of VPC IDs that should be able to access the share.",
  ),
  performance_tier: z.string().describe("The performance tier of the share.")
    .optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  size_gib: z.number().optional(),
  region: z.string().optional(),
  status: z.string().optional(),
  created_at: z.string().optional(),
  vpc_ids: z.array(z.string()).optional(),
  performance_tier: z.string().optional(),
  mount_path: z.string().optional(),
  host: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  size_gib: z.number().int().optional(),
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
  vpc_ids: z.array(z.string()).optional(),
  performance_tier: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean nfs. Registered at `@swamp/digitalocean/nfs`. */
export const model = {
  type: "@swamp/digitalocean/nfs",
  version: "2026.06.24.1",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.03.27.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.03.30.1",
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
      toVersion: "2026.04.08.1",
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
    {
      toVersion: "2026.06.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "NFS resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    nfs_action: {
      description: "NFS action result",
      schema: z.object({}).passthrough(),
      lifetime: "ephemeral",
      garbageCollection: 5,
    },
  },
  methods: {
    create: {
      description: "Create a nfs",
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
            "/v2/nfs",
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
        if (g.size_gib !== undefined) body.size_gib = g.size_gib;
        if (g.region !== undefined) body.region = g.region;
        if (g.vpc_ids !== undefined) body.vpc_ids = g.vpc_ids;
        if (g.performance_tier !== undefined) {
          body.performance_tier = g.performance_tier;
        }
        const result = await create(
          "/v2/nfs",
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
      description: "Get a nfs",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the nfs"),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/nfs",
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
      description: "Delete the nfs",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the nfs"),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/nfs",
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
      description: "Sync nfs state from DigitalOcean",
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
          "/v2/nfs",
          existing.nfsid ?? existing.id,
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
          nfsid: existing.nfsid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    attach: {
      description: "attach the nfs",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the nfs"),
        region: z.string().describe(
          "The DigitalOcean region slug (e.g. atl1, nyc2) where the NFS snapshot resides.",
        ).optional(),
        vpc_id: z.string().describe(
          "The ID of the VPC to which the NFS share will be attached",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region?: string;
          vpc_id: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const params: Record<string, unknown> = {};
        if (args.vpc_id !== undefined) params.vpc_id = args.vpc_id;
        const body: Record<string, unknown> = { type: "attach", params };
        if (args.region !== undefined) body.region = args.region;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/nfs",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-attach`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "nfs_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName =
            (updatedResource as Record<string, unknown>).name?.toString() ??
              args.id.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
    detach: {
      description: "detach the nfs",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the nfs"),
        region: z.string().describe(
          "The DigitalOcean region slug (e.g. atl1, nyc2) where the NFS snapshot resides.",
        ).optional(),
        vpc_id: z.string().describe(
          "The ID of the VPC from which the NFS share will be detached",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region?: string;
          vpc_id: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const params: Record<string, unknown> = {};
        if (args.vpc_id !== undefined) params.vpc_id = args.vpc_id;
        const body: Record<string, unknown> = { type: "detach", params };
        if (args.region !== undefined) body.region = args.region;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/nfs",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-detach`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "nfs_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName =
            (updatedResource as Record<string, unknown>).name?.toString() ??
              args.id.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
    reassign: {
      description: "reassign the nfs",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the nfs"),
        region: z.string().describe(
          "The DigitalOcean region slug (e.g. atl1, nyc2) where the NFS snapshot resides.",
        ).optional(),
        old_vpc_id: z.string().describe(
          "The ID of the VPC from which the NFS share will be reassigned",
        ),
        new_vpc_id: z.string().describe(
          "The ID of the VPC to which the NFS share will be reassigned",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region?: string;
          old_vpc_id: string;
          new_vpc_id: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const params: Record<string, unknown> = {};
        if (args.old_vpc_id !== undefined) params.old_vpc_id = args.old_vpc_id;
        if (args.new_vpc_id !== undefined) params.new_vpc_id = args.new_vpc_id;
        const body: Record<string, unknown> = { type: "reassign", params };
        if (args.region !== undefined) body.region = args.region;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/nfs",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-reassign`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "nfs_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName =
            (updatedResource as Record<string, unknown>).name?.toString() ??
              args.id.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
    resize: {
      description: "resize the nfs",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the nfs"),
        region: z.string().describe(
          "The DigitalOcean region slug (e.g. atl1, nyc2) where the NFS snapshot resides.",
        ).optional(),
        size_gib: z.number().int().describe("The new size for the NFS share."),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region?: string;
          size_gib: number;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const params: Record<string, unknown> = {};
        if (args.size_gib !== undefined) params.size_gib = args.size_gib;
        const body: Record<string, unknown> = { type: "resize", params };
        if (args.region !== undefined) body.region = args.region;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/nfs",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-resize`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "nfs_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName =
            (updatedResource as Record<string, unknown>).name?.toString() ??
              args.id.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
    snapshot: {
      description: "snapshot the nfs",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the nfs"),
        region: z.string().describe(
          "The DigitalOcean region slug (e.g. atl1, nyc2) where the NFS snapshot resides.",
        ).optional(),
        name: z.string().describe("Snapshot name of the NFS share"),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region?: string;
          name: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const params: Record<string, unknown> = {};
        if (args.name !== undefined) params.name = args.name;
        const body: Record<string, unknown> = { type: "snapshot", params };
        if (args.region !== undefined) body.region = args.region;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/nfs",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-snapshot`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "nfs_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName =
            (updatedResource as Record<string, unknown>).name?.toString() ??
              args.id.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
    switch_performance_tier: {
      description: "switch performance tier the nfs",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe("The ID of the nfs"),
        region: z.string().describe(
          "The DigitalOcean region slug (e.g. atl1, nyc2) where the NFS snapshot resides.",
        ).optional(),
        performance_tier: z.string().describe(
          "The performance tier to which the NFS share will be switched (e.g., standard, high).",
        ),
        waitForCompletion: z.boolean().describe(
          "Wait for the action to complete before returning (default: true)",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          region?: string;
          performance_tier: string;
          waitForCompletion?: boolean;
        },
        context: any,
      ) => {
        const params: Record<string, unknown> = {};
        if (args.performance_tier !== undefined) {
          params.performance_tier = args.performance_tier;
        }
        const body: Record<string, unknown> = {
          type: "switch_performance_tier",
          params,
        };
        if (args.region !== undefined) body.region = args.region;
        const { action: actionResult, resource: updatedResource } =
          await createAndPollAction(
            "/v2/nfs",
            args.id,
            body,
            args.waitForCompletion ?? true,
            context.globalArgs.token,
          );
        const actionInstanceName = `${args.id}-switch_performance_tier`;
        const handles = [];
        const actionHandle = await context.writeResource(
          "nfs_action",
          actionInstanceName,
          actionResult,
        );
        handles.push(actionHandle);
        if (updatedResource) {
          const resourceInstanceName =
            (updatedResource as Record<string, unknown>).name?.toString() ??
              args.id.toString();
          const stateHandle = await context.writeResource(
            "state",
            resourceInstanceName,
            updatedResource,
          );
          handles.push(stateHandle);
        }
        return { dataHandles: handles };
      },
    },
  },
};
