// Auto-generated extension model for @swamp/digitalocean/kubernetes-cluster
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean kubernetes cluster.
 *
 * Wraps the `/v2/kubernetes/clusters` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  discover,
  pollResourceReady,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe("A human-readable name for a Kubernetes cluster."),
  tags: z.array(z.string()).describe(
    "An array of tags to apply to the Kubernetes cluster. All clusters are automatically tagged `k8s` and `k8s:$K8S_CLUSTER_ID`. <br><br>Requires `tag:read` and `tag:create` scope, as well as `tag:delete` if existing tags are getting removed.",
  ).optional(),
  maintenance_policy: z.object({
    start_time: z.string().optional(),
    duration: z.string().optional(),
    day: z.enum([
      "any",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]).optional(),
  }).describe(
    "An object specifying the maintenance window policy for the Kubernetes cluster.",
  ).optional(),
  auto_upgrade: z.boolean().describe(
    "A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window.",
  ).optional(),
  surge_upgrade: z.boolean().describe(
    "A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. Surge upgrade makes cluster upgrades fast and reliable by bringing up new nodes before destroying the outdated nodes.",
  ).optional(),
  ha: z.boolean().describe(
    "A boolean value indicating whether the control plane is run in a highly available configuration in the cluster. Highly available control planes incur less downtime. The property cannot be disabled. When omitted on create, the default is version-dependent; for DOKS 1.36.0 and later, the default is true; for earlier versions, the default is false.",
  ).optional(),
  control_plane_firewall: z.object({
    enabled: z.boolean().optional(),
    allowed_addresses: z.array(z.string()).optional(),
  }).describe(
    "An object specifying the control plane firewall for the Kubernetes cluster. Control plane firewall is in early availability (invite only).",
  ).optional(),
  cluster_autoscaler_configuration: z.object({
    scale_down_utilization_threshold: z.number().optional(),
    scale_down_unneeded_time: z.string().optional(),
    expanders: z.array(z.enum(["random", "priority", "least_waste"]))
      .optional(),
  }).describe("An object specifying custom cluster autoscaler configuration.")
    .optional(),
  routing_agent: z.object({
    enabled: z.boolean().optional(),
  }).describe(
    "An object specifying whether the routing-agent component should be enabled for the Kubernetes cluster.",
  ).optional(),
  amd_gpu_device_plugin: z.object({
    enabled: z.boolean().optional(),
  }).describe(
    "An object specifying whether the AMD GPU Device Plugin should be enabled in the Kubernetes cluster. It's enabled by default for clusters with an AMD GPU node pool.",
  ).optional(),
  amd_gpu_device_metrics_exporter_plugin: z.object({
    enabled: z.boolean().optional(),
  }).describe(
    "An object specifying whether the AMD Device Metrics Exporter should be enabled in the Kubernetes cluster.",
  ).optional(),
  nvidia_gpu_device_plugin: z.object({
    enabled: z.boolean().optional(),
  }).describe(
    "An object specifying whether the Nvidia GPU Device Plugin should be enabled in the Kubernetes cluster. It's enabled by default for clusters with an Nvidia GPU node pool.",
  ).optional(),
  rdma_shared_dev_plugin: z.object({
    enabled: z.boolean().optional(),
  }).describe(
    "An object specifying whether the RDMA shared device plugin should be enabled in the Kubernetes cluster.",
  ).optional(),
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
    "The slug identifier for the region where the Kubernetes cluster is located.",
  ),
  version: z.string().describe(
    'The slug identifier for the version of Kubernetes used for the cluster. If set to a minor version (e.g. "1.14"), the latest version within it will be used (e.g. "1.14.6-do.1"); if set to "latest", the latest published version will be used. See the `/v2/kubernetes/options` endpoint to find all currently available versions.',
  ),
  cluster_subnet: z.string().describe(
    "The range of IP addresses for the overlay network of the Kubernetes cluster in CIDR notation.",
  ).optional(),
  service_subnet: z.string().describe(
    "The range of assignable IP addresses for services running in the Kubernetes cluster in CIDR notation.",
  ).optional(),
  vpc_uuid: z.string().describe(
    "A string specifying the UUID of the VPC to which the Kubernetes cluster is assigned.<br><br>Requires `vpc:read` scope.",
  ).optional(),
  node_pools: z.array(z.object({
    size: z.string(),
    id: z.string().optional(),
    name: z.string(),
    count: z.number().int(),
    tags: z.array(z.string()).optional(),
    labels: z.record(z.string(), z.unknown()).optional(),
    taints: z.array(z.object({
      key: z.string().optional(),
      value: z.string().optional(),
      effect: z.enum(["NoSchedule", "PreferNoSchedule", "NoExecute"])
        .optional(),
    })).optional(),
    auto_scale: z.boolean().optional(),
    min_nodes: z.number().int().optional(),
    max_nodes: z.number().int().optional(),
    nodes: z.array(z.object({
      id: z.string().optional(),
      name: z.string().optional(),
      status: z.object({
        state: z.enum(["provisioning", "running", "draining", "deleting"])
          .optional(),
      }).optional(),
      droplet_id: z.string().optional(),
      created_at: z.string().optional(),
      updated_at: z.string().optional(),
    })).optional(),
  })).describe(
    "An object specifying the details of the worker nodes available to the Kubernetes cluster.",
  ),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  region: z.string().optional(),
  version: z.string().optional(),
  cluster_subnet: z.string().optional(),
  service_subnet: z.string().optional(),
  vpc_uuid: z.string().optional(),
  ipv4: z.string().optional(),
  endpoint: z.string().optional(),
  tags: z.array(z.string()).optional(),
  node_pools: z.array(z.object({
    size: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    count: z.number().optional(),
    tags: z.array(z.string()).optional(),
    labels: z.record(z.string(), z.unknown()).optional(),
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
  })).optional(),
  maintenance_policy: z.object({
    start_time: z.string().optional(),
    duration: z.string().optional(),
    day: z.string().optional(),
  }).nullable().optional(),
  auto_upgrade: z.boolean().optional(),
  status: z.object({
    state: z.string().optional(),
    message: z.string().optional(),
  }).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  surge_upgrade: z.boolean().optional(),
  ha: z.boolean().optional(),
  registry_enabled: z.boolean().optional(),
  registries: z.array(z.string()).nullable().optional(),
  control_plane_firewall: z.object({
    enabled: z.boolean().optional(),
    allowed_addresses: z.array(z.string()).optional(),
  }).nullable().optional(),
  cluster_autoscaler_configuration: z.object({
    scale_down_utilization_threshold: z.number().optional(),
    scale_down_unneeded_time: z.string().optional(),
    expanders: z.array(z.string()).optional(),
  }).nullable().optional(),
  routing_agent: z.object({
    enabled: z.boolean().optional(),
  }).nullable().optional(),
  amd_gpu_device_plugin: z.object({
    enabled: z.boolean().optional(),
  }).nullable().optional(),
  amd_gpu_device_metrics_exporter_plugin: z.object({
    enabled: z.boolean().optional(),
  }).nullable().optional(),
  nvidia_gpu_device_plugin: z.object({
    enabled: z.boolean().optional(),
  }).nullable().optional(),
  rdma_shared_dev_plugin: z.object({
    enabled: z.boolean().optional(),
  }).nullable().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  tags: z.array(z.string()).optional(),
  maintenance_policy: z.object({
    start_time: z.string().optional(),
    duration: z.string().optional(),
    day: z.enum([
      "any",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]).optional(),
  }).optional(),
  auto_upgrade: z.boolean().optional(),
  surge_upgrade: z.boolean().optional(),
  ha: z.boolean().optional(),
  control_plane_firewall: z.object({
    enabled: z.boolean().optional(),
    allowed_addresses: z.array(z.string()).optional(),
  }).optional(),
  cluster_autoscaler_configuration: z.object({
    scale_down_utilization_threshold: z.number().optional(),
    scale_down_unneeded_time: z.string().optional(),
    expanders: z.array(z.enum(["random", "priority", "least_waste"]))
      .optional(),
  }).optional(),
  routing_agent: z.object({
    enabled: z.boolean().optional(),
  }).optional(),
  amd_gpu_device_plugin: z.object({
    enabled: z.boolean().optional(),
  }).optional(),
  amd_gpu_device_metrics_exporter_plugin: z.object({
    enabled: z.boolean().optional(),
  }).optional(),
  nvidia_gpu_device_plugin: z.object({
    enabled: z.boolean().optional(),
  }).optional(),
  rdma_shared_dev_plugin: z.object({
    enabled: z.boolean().optional(),
  }).optional(),
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
  version: z.string().optional(),
  cluster_subnet: z.string().optional(),
  service_subnet: z.string().optional(),
  vpc_uuid: z.string().optional(),
  node_pools: z.array(z.object({
    size: z.string(),
    id: z.string().optional(),
    name: z.string(),
    count: z.number().int(),
    tags: z.array(z.string()).optional(),
    labels: z.record(z.string(), z.unknown()).optional(),
    taints: z.array(z.object({
      key: z.string().optional(),
      value: z.string().optional(),
      effect: z.enum(["NoSchedule", "PreferNoSchedule", "NoExecute"])
        .optional(),
    })).optional(),
    auto_scale: z.boolean().optional(),
    min_nodes: z.number().int().optional(),
    max_nodes: z.number().int().optional(),
    nodes: z.array(z.object({
      id: z.string().optional(),
      name: z.string().optional(),
      status: z.object({
        state: z.enum(["provisioning", "running", "draining", "deleting"])
          .optional(),
      }).optional(),
      droplet_id: z.string().optional(),
      created_at: z.string().optional(),
      updated_at: z.string().optional(),
    })).optional(),
  })).optional(),
});

/** Swamp extension model for DigitalOcean kubernetes cluster. Registered at `@swamp/digitalocean/kubernetes-cluster`. */
export const model = {
  type: "@swamp/digitalocean/kubernetes-cluster",
  version: "2026.05.15.1",
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
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Kubernetes Cluster resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a kubernetes cluster",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { checkExists?: boolean; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/kubernetes/clusters",
            "name",
            g.name?.toString() ?? "",
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.region !== undefined) body.region = g.region;
        if (g.version !== undefined) body.version = g.version;
        if (g.cluster_subnet !== undefined) {
          body.cluster_subnet = g.cluster_subnet;
        }
        if (g.service_subnet !== undefined) {
          body.service_subnet = g.service_subnet;
        }
        if (g.vpc_uuid !== undefined) body.vpc_uuid = g.vpc_uuid;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.node_pools !== undefined) body.node_pools = g.node_pools;
        if (g.maintenance_policy !== undefined) {
          body.maintenance_policy = g.maintenance_policy;
        }
        if (g.auto_upgrade !== undefined) body.auto_upgrade = g.auto_upgrade;
        if (g.surge_upgrade !== undefined) body.surge_upgrade = g.surge_upgrade;
        if (g.ha !== undefined) body.ha = g.ha;
        if (g.control_plane_firewall !== undefined) {
          body.control_plane_firewall = g.control_plane_firewall;
        }
        if (g.cluster_autoscaler_configuration !== undefined) {
          body.cluster_autoscaler_configuration =
            g.cluster_autoscaler_configuration;
        }
        if (g.routing_agent !== undefined) body.routing_agent = g.routing_agent;
        if (g.amd_gpu_device_plugin !== undefined) {
          body.amd_gpu_device_plugin = g.amd_gpu_device_plugin;
        }
        if (g.amd_gpu_device_metrics_exporter_plugin !== undefined) {
          body.amd_gpu_device_metrics_exporter_plugin =
            g.amd_gpu_device_metrics_exporter_plugin;
        }
        if (g.nvidia_gpu_device_plugin !== undefined) {
          body.nvidia_gpu_device_plugin = g.nvidia_gpu_device_plugin;
        }
        if (g.rdma_shared_dev_plugin !== undefined) {
          body.rdma_shared_dev_plugin = g.rdma_shared_dev_plugin;
        }
        let result = await create(
          "/v2/kubernetes/clusters",
          body,
        ) as ResourceData;
        if (args.waitForReady !== false) {
          const resourceId = result.clusterid ?? result.id;
          if (resourceId) {
            result = await pollResourceReady(
              "/v2/kubernetes/clusters",
              resourceId as string | number,
              {
                "statusField": "status.state",
                "readyValues": ["running"],
                "failedValues": ["error", "degraded"],
              },
            ) as ResourceData;
          }
        }
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a kubernetes cluster",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the kubernetes cluster",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/kubernetes/clusters",
          args.id,
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
      description: "Update kubernetes cluster attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g.name !== undefined) body.name = g.name;
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.maintenance_policy !== undefined) {
          body.maintenance_policy = g.maintenance_policy;
        }
        if (g.auto_upgrade !== undefined) body.auto_upgrade = g.auto_upgrade;
        if (g.surge_upgrade !== undefined) body.surge_upgrade = g.surge_upgrade;
        if (g.ha !== undefined) body.ha = g.ha;
        if (g.control_plane_firewall !== undefined) {
          body.control_plane_firewall = g.control_plane_firewall;
        }
        if (g.cluster_autoscaler_configuration !== undefined) {
          body.cluster_autoscaler_configuration =
            g.cluster_autoscaler_configuration;
        }
        if (g.routing_agent !== undefined) body.routing_agent = g.routing_agent;
        if (g.amd_gpu_device_plugin !== undefined) {
          body.amd_gpu_device_plugin = g.amd_gpu_device_plugin;
        }
        if (g.amd_gpu_device_metrics_exporter_plugin !== undefined) {
          body.amd_gpu_device_metrics_exporter_plugin =
            g.amd_gpu_device_metrics_exporter_plugin;
        }
        if (g.nvidia_gpu_device_plugin !== undefined) {
          body.nvidia_gpu_device_plugin = g.nvidia_gpu_device_plugin;
        }
        if (g.rdma_shared_dev_plugin !== undefined) {
          body.rdma_shared_dev_plugin = g.rdma_shared_dev_plugin;
        }
        let result = await update(
          "/v2/kubernetes/clusters",
          existing.clusterid ?? existing.id,
          body,
          "PUT",
        ) as ResourceData;
        if (args.waitForReady !== false) {
          const resourceId = result.clusterid ?? result.id ??
            existing.clusterid ?? existing.id;
          if (resourceId) {
            result = await pollResourceReady(
              "/v2/kubernetes/clusters",
              resourceId as string | number,
              {
                "statusField": "status.state",
                "readyValues": ["running"],
                "failedValues": ["error", "degraded"],
              },
            ) as ResourceData;
          }
        }
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the kubernetes cluster",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the kubernetes cluster",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove("/v2/kubernetes/clusters", args.id);
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
      description: "Sync kubernetes cluster state from DigitalOcean",
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
          "/v2/kubernetes/clusters",
          existing.clusterid ?? existing.id,
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
          clusterid: existing.clusterid ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    list_options: {
      description:
        "List available options for kubernetes cluster (versions, sizes, regions)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const result = await discover("/v2/kubernetes/options");
        const handle = await context.writeResource("state", "options", result);
        return { dataHandles: [handle] };
      },
    },
  },
};
