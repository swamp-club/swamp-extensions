import { z } from "npm:zod@4.3.6";
import type { V1Node, V1Pod } from "npm:@kubernetes/client-node@1.0.0";
import {
  buildClient,
  type DataHandle,
  type K8sGlobalArgs,
  normalizeMeta,
  sanitizeInstanceName,
} from "./_lib/helpers.ts";

// --- Global Args (cluster-scoped, no namespace) ---

const NodeGlobalArgsSchema = z.object({
  context: z.string().optional(),
  kubeconfig: z.string().optional(),
  labels: z.string().optional(),
});

type NodeGlobalArgs = z.infer<typeof NodeGlobalArgsSchema>;

interface NodeContext {
  globalArgs: NodeGlobalArgs;
  logger: {
    info(msg: string, props?: Record<string, unknown>): void;
    warning(msg: string, props?: Record<string, unknown>): void;
    warn(msg: string, props?: Record<string, unknown>): void;
    error(msg: string, props?: Record<string, unknown>): void;
  };
  writeResource(
    specName: string,
    instanceName: string,
    data: Record<string, unknown>,
  ): Promise<DataHandle>;
}

// --- Schemas ---

const NodeSchema = z.object({
  name: z.string(),
  uid: z.string(),
  conditions: z.array(z.object({
    type: z.string(),
    status: z.string(),
    reason: z.string(),
    message: z.string(),
    lastTransitionTime: z.string(),
  })),
  capacityCpu: z.string(),
  capacityMemory: z.string(),
  capacityPods: z.string(),
  allocatableCpu: z.string(),
  allocatableMemory: z.string(),
  allocatablePods: z.string(),
  os: z.string(),
  arch: z.string(),
  kubeletVersion: z.string(),
  containerRuntime: z.string(),
  internalIP: z.string(),
  hostname: z.string(),
  taints: z.array(z.object({
    key: z.string(),
    value: z.string(),
    effect: z.string(),
  })),
  unschedulable: z.boolean(),
  podCIDR: z.string(),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const NodeMetricsSchema = z.object({
  name: z.string(),
  cpuUsage: z.string(),
  memoryUsage: z.string(),
  collectedAt: z.string(),
}).passthrough();

const NodePodSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  phase: z.string(),
  nodeName: z.string(),
  podIP: z.string(),
  hostIP: z.string(),
  startTime: z.string(),
  restartCount: z.number(),
  containerStatuses: z.array(z.object({
    name: z.string(),
    ready: z.boolean(),
    restartCount: z.number(),
    state: z.string(),
    image: z.string(),
  })),
  conditions: z.array(z.object({
    type: z.string(),
    status: z.string(),
  })),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({});
const GetArgsSchema = z.object({
  nodeName: z.string(),
});
const GetMetricsArgsSchema = z.object({});
const CordonArgsSchema = z.object({
  nodeName: z.string(),
});
const UncordonArgsSchema = z.object({
  nodeName: z.string(),
});
const TaintArgsSchema = z.object({
  nodeName: z.string(),
  key: z.string(),
  value: z.string().default(""),
  effect: z.enum(["NoSchedule", "PreferNoSchedule", "NoExecute"]),
});
const UntaintArgsSchema = z.object({
  nodeName: z.string(),
  key: z.string(),
});
const GetPodsOnNodeArgsSchema = z.object({
  nodeName: z.string(),
});

// --- Helpers ---

function toK8sGlobalArgs(globalArgs: NodeGlobalArgs): K8sGlobalArgs {
  return { namespace: "default", ...globalArgs };
}

function normalizeNode(raw: V1Node) {
  const meta = normalizeMeta(raw);
  const addresses = raw.status?.addresses || [];

  const findAddress = (type: string) => {
    const addr = addresses.find((a) => a.type === type);
    return addr?.address || "";
  };

  return {
    name: meta.name,
    uid: meta.uid,
    conditions: (raw.status?.conditions || []).map((c) => ({
      type: c.type || "",
      status: c.status || "",
      reason: c.reason || "",
      message: c.message || "",
      lastTransitionTime: c.lastTransitionTime
        ? new Date(c.lastTransitionTime).toISOString()
        : "",
    })),
    capacityCpu: raw.status?.capacity?.cpu || "",
    capacityMemory: raw.status?.capacity?.memory || "",
    capacityPods: raw.status?.capacity?.pods || "",
    allocatableCpu: raw.status?.allocatable?.cpu || "",
    allocatableMemory: raw.status?.allocatable?.memory || "",
    allocatablePods: raw.status?.allocatable?.pods || "",
    os: raw.status?.nodeInfo?.operatingSystem || "",
    arch: raw.status?.nodeInfo?.architecture || "",
    kubeletVersion: raw.status?.nodeInfo?.kubeletVersion || "",
    containerRuntime: raw.status?.nodeInfo?.containerRuntimeVersion || "",
    internalIP: findAddress("InternalIP"),
    hostname: findAddress("Hostname"),
    taints: (raw.spec?.taints || []).map((t) => ({
      key: t.key || "",
      value: t.value || "",
      effect: t.effect || "",
    })),
    unschedulable: raw.spec?.unschedulable || false,
    podCIDR: raw.spec?.podCIDR || "",
    labels: meta.labels,
    annotations: meta.annotations,
    createdAt: meta.createdAt,
  };
}

function normalizePodForNode(raw: V1Pod) {
  const meta = normalizeMeta(raw);

  const containerStatuses = (raw.status?.containerStatuses || []).map((cs) => ({
    name: cs.name || "",
    ready: cs.ready || false,
    restartCount: cs.restartCount || 0,
    state: cs.state ? Object.keys(cs.state)[0] || "unknown" : "unknown",
    image: cs.image || "",
  }));

  const totalRestarts = containerStatuses.reduce(
    (sum, cs) => sum + cs.restartCount,
    0,
  );

  return {
    ...meta,
    phase: raw.status?.phase || "Unknown",
    nodeName: raw.spec?.nodeName || "",
    podIP: raw.status?.podIP || "",
    hostIP: raw.status?.hostIP || "",
    startTime: raw.status?.startTime
      ? new Date(raw.status.startTime).toISOString()
      : "",
    restartCount: totalRestarts,
    containerStatuses,
    conditions: (raw.status?.conditions || []).map((c) => ({
      type: c.type || "",
      status: c.status || "",
    })),
  };
}

// --- Model ---

/** Kubernetes Node model. */
export const model = {
  type: "@swamp/kubernetes/node",
  version: "2026.06.04.1",
  globalArguments: NodeGlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.05.27.2",
      description:
        "Version bump for extension-wide security fix in pod exec method",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    node: {
      description:
        "Node with conditions, capacity, allocatable resources, taints, and node info",
      schema: NodeSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    nodeMetrics: {
      description: "Node CPU and memory usage from metrics-server",
      schema: NodeMetricsSchema,
      lifetime: "1h",
      garbageCollection: 5,
    },
    nodePod: {
      description: "Pod running on a specific node",
      schema: NodePodSchema,
      lifetime: "1h",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description:
        "List all nodes with status, capacity, conditions, and taints",
      arguments: ListArgsSchema,
      execute: async (
        _args: Record<string, never>,
        context: NodeContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));
        const labels = context.globalArgs.labels;

        const resp = await coreApi.listNode({ labelSelector: labels });
        const nodes = resp.items || [];

        context.logger.info("Found {count} nodes", { count: nodes.length });

        const handles: DataHandle[] = [];
        for (const node of nodes) {
          const normalized = normalizeNode(node);
          const handle = await context.writeResource(
            "node",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    get: {
      description:
        "Get a node's full status including conditions, capacity, taints, and node info",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: NodeContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const node = await coreApi.readNode({ name: args.nodeName });
        const normalized = normalizeNode(node);

        const handle = await context.writeResource(
          "node",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    getMetrics: {
      description: "Get CPU and memory usage for all nodes from metrics-server",
      arguments: GetMetricsArgsSchema,
      execute: async (
        _args: Record<string, never>,
        context: NodeContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { metricsClient } = buildClient(
          toK8sGlobalArgs(context.globalArgs),
        );

        let nodeMetrics;
        try {
          const resp = await metricsClient.getNodeMetrics();
          nodeMetrics = resp.items || [];
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          context.logger.warning(
            "Metrics API unavailable: {error}. Is metrics-server installed?",
            { error: message },
          );
          return { dataHandles: [] };
        }

        const handles: DataHandle[] = [];
        for (const nm of nodeMetrics) {
          const normalized = {
            name: nm.metadata?.name || "",
            cpuUsage: nm.usage?.cpu || "0",
            memoryUsage: nm.usage?.memory || "0",
            collectedAt: new Date().toISOString(),
          };

          const handle = await context.writeResource(
            "nodeMetrics",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }

        context.logger.info("Collected metrics for {count} nodes", {
          count: handles.length,
        });
        return { dataHandles: handles };
      },
    },

    cordon: {
      description: "Cordon a node by setting spec.unschedulable = true",
      arguments: CordonArgsSchema,
      execute: async (
        args: z.infer<typeof CordonArgsSchema>,
        context: NodeContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const current = await coreApi.readNode({ name: args.nodeName });
        current.spec!.unschedulable = true;

        const replaced = await coreApi.replaceNode({
          name: args.nodeName,
          body: current,
        });
        const normalized = normalizeNode(replaced);

        context.logger.info("Cordoned node {name}", { name: args.nodeName });

        const handle = await context.writeResource(
          "node",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    uncordon: {
      description: "Uncordon a node by setting spec.unschedulable = false",
      arguments: UncordonArgsSchema,
      execute: async (
        args: z.infer<typeof UncordonArgsSchema>,
        context: NodeContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const current = await coreApi.readNode({ name: args.nodeName });
        current.spec!.unschedulable = false;

        const replaced = await coreApi.replaceNode({
          name: args.nodeName,
          body: current,
        });
        const normalized = normalizeNode(replaced);

        context.logger.info("Uncordoned node {name}", { name: args.nodeName });

        const handle = await context.writeResource(
          "node",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    taint: {
      description: "Add a taint to a node",
      arguments: TaintArgsSchema,
      execute: async (
        args: z.infer<typeof TaintArgsSchema>,
        context: NodeContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const current = await coreApi.readNode({ name: args.nodeName });
        if (!current.spec!.taints) {
          current.spec!.taints = [];
        }

        // Remove existing taint with the same key if any
        current.spec!.taints = current.spec!.taints.filter((t) =>
          t.key !== args.key
        );
        current.spec!.taints.push({
          key: args.key,
          value: args.value,
          effect: args.effect,
        });

        const replaced = await coreApi.replaceNode({
          name: args.nodeName,
          body: current,
        });
        const normalized = normalizeNode(replaced);

        context.logger.info(
          "Added taint {key}={value}:{effect} to node {name}",
          {
            key: args.key,
            value: args.value,
            effect: args.effect,
            name: args.nodeName,
          },
        );

        const handle = await context.writeResource(
          "node",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    untaint: {
      description: "Remove a taint from a node by key",
      arguments: UntaintArgsSchema,
      execute: async (
        args: z.infer<typeof UntaintArgsSchema>,
        context: NodeContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const current = await coreApi.readNode({ name: args.nodeName });
        if (current.spec!.taints) {
          current.spec!.taints = current.spec!.taints.filter((t) =>
            t.key !== args.key
          );
        }

        const replaced = await coreApi.replaceNode({
          name: args.nodeName,
          body: current,
        });
        const normalized = normalizeNode(replaced);

        context.logger.info("Removed taint {key} from node {name}", {
          key: args.key,
          name: args.nodeName,
        });

        const handle = await context.writeResource(
          "node",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    getPodsOnNode: {
      description:
        "List all pods running on a specific node across all namespaces",
      arguments: GetPodsOnNodeArgsSchema,
      execute: async (
        args: z.infer<typeof GetPodsOnNodeArgsSchema>,
        context: NodeContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const resp = await coreApi.listPodForAllNamespaces({
          fieldSelector: `spec.nodeName=${args.nodeName}`,
        });
        const pods = resp.items || [];

        context.logger.info("Found {count} pods on node {node}", {
          count: pods.length,
          node: args.nodeName,
        });

        const handles: DataHandle[] = [];
        for (const pod of pods) {
          const normalized = normalizePodForNode(pod);
          const handle = await context.writeResource(
            "nodePod",
            sanitizeInstanceName(`${normalized.namespace}-${normalized.name}`),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },
  },
};
