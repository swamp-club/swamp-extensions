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

// Auto-generated extension model for @swamp/digitalocean/kubernetes-cluster-node-pool
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean kubernetes cluster node pool.
 *
 * Wraps the `/v2/kubernetes/clusters/{cluster_id}/node_pools` API as a swamp model so create, get, update,
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
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  cluster_id: z.string().describe("Parent resource identifier"),
  name: z.string().describe("A human-readable name for the node pool."),
  count: z.number().int().describe(
    "The number of Droplet instances in the node pool.",
  ),
  tags: z.array(z.string()).describe(
    "An array containing the tags applied to the node pool. All node pools are automatically tagged `k8s`, `k8s-worker`, and `k8s:$K8S_CLUSTER_ID`. <br><br>Requires `tag:read` scope.",
  ).optional(),
  labels: z.record(z.string(), z.unknown()).describe(
    "An object of key/value mappings specifying labels to apply to all nodes in a pool. Labels will automatically be applied to all existing nodes and any subsequent nodes added to the pool. Note that when a label is removed, it is not deleted from the nodes in the pool.",
  ).optional(),
  taints: z.array(z.object({
    key: z.string().optional(),
    value: z.string().optional(),
    effect: z.enum(["NoSchedule", "PreferNoSchedule", "NoExecute"]).optional(),
  })).describe(
    "An array of taints to apply to all nodes in a pool. Taints will automatically be applied to all existing nodes and any subsequent nodes added to the pool. When a taint is removed, it is deleted from all nodes in the pool.",
  ).optional(),
  auto_scale: z.boolean().describe(
    "A boolean value indicating whether auto-scaling is enabled for this node pool.",
  ).optional(),
  min_nodes: z.number().int().describe(
    "The minimum number of nodes that this node pool can be auto-scaled to. The value will be `0` if `auto_scale` is set to `false`.",
  ).optional(),
  max_nodes: z.number().int().describe(
    "The maximum number of nodes that this node pool can be auto-scaled to. The value will be `0` if `auto_scale` is set to `false`.",
  ).optional(),
  size: z.string().describe(
    "The slug identifier for the type of Droplet used as workers in the node pool.",
  ),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  size: z.string().optional(),
  id: z.string(),
  name: z.string().optional(),
  count: z.number().optional(),
  tags: z.array(z.string()).optional(),
  labels: z.record(z.string(), z.unknown()).nullable().optional(),
  taints: z.array(z.object({
    key: z.string().optional(),
    value: z.string().optional(),
    effect: z.string().optional(),
  })).optional(),
  auto_scale: z.boolean().optional(),
  min_nodes: z.number().optional(),
  max_nodes: z.number().optional(),
  nodes: z.array(z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    status: z.object({
      state: z.string().optional(),
    }).optional(),
    droplet_id: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  cluster_id: z.string().optional(),
  name: z.string().optional(),
  count: z.number().int().optional(),
  tags: z.array(z.string()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  taints: z.array(z.object({
    key: z.string().optional(),
    value: z.string().optional(),
    effect: z.enum(["NoSchedule", "PreferNoSchedule", "NoExecute"]).optional(),
  })).optional(),
  auto_scale: z.boolean().optional(),
  min_nodes: z.number().int().optional(),
  max_nodes: z.number().int().optional(),
  size: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean kubernetes cluster node pool. Registered at `@swamp/digitalocean/kubernetes-cluster-node-pool`. */
export const model = {
  type: "@swamp/digitalocean/kubernetes-cluster-node-pool",
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
      description: "Kubernetes Cluster Node Pool resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a kubernetes cluster node pool",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/kubernetes/clusters/${g.cluster_id}/node_pools`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            endpoint,
            "name",
            g.name?.toString() ?? "",
            g.token,
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.size !== undefined) body.size = g.size;
        if (g.name !== undefined) body.name = g.name;
        if (g.count !== undefined) body.count = g.count;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.taints !== undefined) body.taints = g.taints;
        if (g.auto_scale !== undefined) body.auto_scale = g.auto_scale;
        if (g.min_nodes !== undefined) body.min_nodes = g.min_nodes;
        if (g.max_nodes !== undefined) body.max_nodes = g.max_nodes;
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
      description: "Get a kubernetes cluster node pool",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the kubernetes cluster node pool",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/kubernetes/clusters/${g.cluster_id}/node_pools`;
        const result = await read(
          endpoint,
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
      description: "Update kubernetes cluster node pool attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/kubernetes/clusters/${g.cluster_id}/node_pools`;
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
        if (g.name !== undefined) body.name = g.name;
        if (g.count !== undefined) body.count = g.count;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.taints !== undefined) body.taints = g.taints;
        if (g.auto_scale !== undefined) body.auto_scale = g.auto_scale;
        if (g.min_nodes !== undefined) body.min_nodes = g.min_nodes;
        if (g.max_nodes !== undefined) body.max_nodes = g.max_nodes;
        const result = await update(
          endpoint,
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
      description: "Delete the kubernetes cluster node pool",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the kubernetes cluster node pool",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/kubernetes/clusters/${g.cluster_id}/node_pools`;
        const { existed } = await remove(
          endpoint,
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
      description: "Sync kubernetes cluster node pool state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/kubernetes/clusters/${g.cluster_id}/node_pools`;
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
  },
};
