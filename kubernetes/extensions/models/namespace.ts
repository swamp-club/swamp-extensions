import { z } from "npm:zod@4.3.6";
import type {
  V1LimitRange,
  V1Namespace,
  V1ResourceQuota,
} from "npm:@kubernetes/client-node@1.0.0";
import {
  buildClient,
  type DataHandle,
  type K8sGlobalArgs,
  normalizeMeta,
} from "./_lib/helpers.ts";

// --- Global Args (cluster-scoped, no namespace field) ---

const GlobalArgsSchema = z.object({
  context: z.string().optional(),
  kubeconfig: z.string().optional(),
  labels: z.string().optional(),
});

type NamespaceGlobalArgs = z.infer<typeof GlobalArgsSchema>;

interface NamespaceContext {
  globalArgs: NamespaceGlobalArgs;
  logger: {
    info(msg: string, props?: Record<string, unknown>): void;
    warning(msg: string, props?: Record<string, unknown>): void;
    error(msg: string, props?: Record<string, unknown>): void;
    warn(msg: string, props?: Record<string, unknown>): void;
  };
  writeResource(
    specName: string,
    instanceName: string,
    data: Record<string, unknown>,
  ): Promise<DataHandle>;
}

// --- Schemas ---

const NamespaceSchema = z.object({
  name: z.string(),
  uid: z.string(),
  phase: z.string(),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  finalizers: z.array(z.string()),
  conditions: z.array(z.object({
    type: z.string(),
    status: z.string(),
    message: z.string(),
  })),
  createdAt: z.string(),
}).passthrough();

const ResourceQuotaSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  hard: z.record(z.string(), z.string()),
  used: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const LimitRangeSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  limits: z.array(z.object({
    type: z.string(),
    default: z.record(z.string(), z.string()),
    defaultRequest: z.record(z.string(), z.string()),
    max: z.record(z.string(), z.string()),
    min: z.record(z.string(), z.string()),
  })),
  createdAt: z.string(),
}).passthrough();

const ResourceCountsSchema = z.object({
  namespace: z.string(),
  pods: z.number(),
  services: z.number(),
  deployments: z.number(),
  configmaps: z.number(),
  secrets: z.number(),
  serviceaccounts: z.number(),
  persistentvolumeclaims: z.number(),
  collectedAt: z.string(),
}).passthrough();

const NamespaceHealthSchema = z.object({
  namespace: z.string(),
  healthy: z.boolean(),
  summary: z.object({
    deploymentsReady: z.number(),
    deploymentsTotal: z.number(),
    podsRunning: z.number(),
    podsTotal: z.number(),
    servicesHealthy: z.number(),
    servicesTotal: z.number(),
    warningCount: z.number(),
  }),
  deployments: z.array(z.object({
    name: z.string(),
    replicas: z.number(),
    readyReplicas: z.number(),
    ready: z.boolean(),
  })),
  pods: z.array(z.object({
    name: z.string(),
    phase: z.string(),
    running: z.boolean(),
  })),
  services: z.array(z.object({
    name: z.string(),
    selector: z.record(z.string(), z.string()),
    matchedPodCount: z.number(),
    healthy: z.boolean(),
    reason: z.string(),
  })),
  warnings: z.array(z.object({
    name: z.string(),
    reason: z.string(),
    message: z.string(),
    involvedObject: z.string(),
  })),
  collectedAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({});
const GetArgsSchema = z.object({
  namespaceName: z.string(),
});
const CreateArgsSchema = z.object({
  namespaceName: z.string(),
  labels: z.record(z.string(), z.string()).optional(),
});
const DeleteArgsSchema = z.object({
  namespaceName: z.string(),
});
const UpdateArgsSchema = z.object({
  namespaceName: z.string(),
  labels: z.record(z.string(), z.string()).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
});
const GetResourceQuotasArgsSchema = z.object({
  namespaceName: z.string(),
});
const SetResourceQuotaArgsSchema = z.object({
  namespaceName: z.string(),
  quotaName: z.string(),
  hard: z.record(z.string(), z.string()),
});
const DeleteResourceQuotaArgsSchema = z.object({
  namespaceName: z.string(),
  quotaName: z.string(),
});
const GetLimitRangesArgsSchema = z.object({
  namespaceName: z.string(),
});
const SetLimitRangeArgsSchema = z.object({
  namespaceName: z.string(),
  limitRangeName: z.string(),
  limits: z.array(z.object({
    type: z.string(),
    default: z.record(z.string(), z.string()).optional(),
    defaultRequest: z.record(z.string(), z.string()).optional(),
    max: z.record(z.string(), z.string()).optional(),
    min: z.record(z.string(), z.string()).optional(),
  })),
});
const DeleteLimitRangeArgsSchema = z.object({
  namespaceName: z.string(),
  limitRangeName: z.string(),
});
const GetResourceCountsArgsSchema = z.object({
  namespaceName: z.string(),
});
const HealthArgsSchema = z.object({
  namespaceName: z.string(),
});

// --- Helpers ---

function toK8sGlobalArgs(globalArgs: NamespaceGlobalArgs): K8sGlobalArgs {
  return { namespace: "default", ...globalArgs };
}

function normalizeNamespace(raw: V1Namespace) {
  const meta = normalizeMeta(raw);

  return {
    name: meta.name,
    uid: meta.uid,
    phase: raw.status?.phase || "Unknown",
    labels: meta.labels,
    annotations: meta.annotations,
    finalizers: raw.spec?.finalizers || [],
    conditions: (raw.status?.conditions || []).map((c) => ({
      type: c.type || "",
      status: c.status || "",
      message: c.message || "",
    })),
    createdAt: meta.createdAt,
  };
}

function normalizeResourceQuota(raw: V1ResourceQuota) {
  const meta = normalizeMeta(raw);

  const toRecord = (
    obj: Record<string, string | number> | undefined,
  ): Record<string, string> => {
    if (!obj) return {};
    const result: Record<string, string> = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = String(v);
    }
    return result;
  };

  return {
    name: meta.name,
    namespace: meta.namespace,
    hard: toRecord(raw.spec?.hard),
    used: toRecord(raw.status?.used),
    createdAt: meta.createdAt,
  };
}

function normalizeLimitRange(raw: V1LimitRange) {
  const meta = normalizeMeta(raw);

  const toRecord = (
    obj: Record<string, string | number> | undefined,
  ): Record<string, string> => {
    if (!obj) return {};
    const result: Record<string, string> = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = String(v);
    }
    return result;
  };

  return {
    name: meta.name,
    namespace: meta.namespace,
    limits: (raw.spec?.limits || []).map((l) => ({
      type: l.type || "",
      default: toRecord(l._default),
      defaultRequest: toRecord(l.defaultRequest),
      max: toRecord(l.max),
      min: toRecord(l.min),
    })),
    createdAt: meta.createdAt,
  };
}

// --- Model ---

/** Kubernetes Namespace model. */
export const model = {
  type: "@swamp/kubernetes/namespace",
  version: "2026.05.27.2",
  globalArguments: GlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.05.27.2",
      description:
        "Version bump for extension-wide security fix in pod exec method",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    namespace: {
      description:
        "Namespace state including phase, finalizers, conditions, labels, and annotations",
      schema: NamespaceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    resourceQuota: {
      description:
        "Resource quota showing hard limits and current usage for pods, CPU, memory, etc.",
      schema: ResourceQuotaSchema,
      lifetime: "infinite",
      garbageCollection: 5,
    },
    limitRange: {
      description:
        "Limit range defining default, min, and max resource constraints for containers in a namespace",
      schema: LimitRangeSchema,
      lifetime: "infinite",
      garbageCollection: 5,
    },
    resourceCounts: {
      description:
        "Count of pods, services, deployments, configmaps, secrets, service accounts, and PVCs in a namespace",
      schema: ResourceCountsSchema,
      lifetime: "1h",
      garbageCollection: 5,
    },
    namespaceHealth: {
      description:
        "Aggregated namespace health: per-deployment readiness, per-pod phase, per-service selector/port match, and Warning event count, plus a single top-level healthy boolean",
      schema: NamespaceHealthSchema,
      lifetime: "5m",
      garbageCollection: 10,
    },
  },
  methods: {
    // --- Namespace CRUD ---

    list: {
      description:
        "List all namespaces in the cluster, optionally filtered by label selector",
      arguments: ListArgsSchema,
      execute: async (
        _args: Record<string, never>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));
        const labels = context.globalArgs.labels;

        const resp = await coreApi.listNamespace({ labelSelector: labels });
        const namespaces = resp.items || [];

        context.logger.info("Found {count} namespaces", {
          count: namespaces.length,
        });

        const handles: DataHandle[] = [];
        for (const ns of namespaces) {
          const normalized = normalizeNamespace(ns);
          const handle = await context.writeResource(
            "namespace",
            normalized.name,
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    get: {
      description:
        "Get a single namespace's phase, finalizers, conditions, labels, and annotations",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const ns = await coreApi.readNamespace({ name: args.namespaceName });
        const normalized = normalizeNamespace(ns);

        const handle = await context.writeResource(
          "namespace",
          normalized.name,
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    create: {
      description: "Create a new namespace with optional labels",
      arguments: CreateArgsSchema,
      execute: async (
        args: z.infer<typeof CreateArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const body = {
          metadata: {
            name: args.namespaceName,
            ...(args.labels && { labels: args.labels }),
          },
        };

        const created = await coreApi.createNamespace({ body });
        const normalized = normalizeNamespace(created);

        context.logger.info("Created namespace {name}", {
          name: args.namespaceName,
        });

        const handle = await context.writeResource(
          "namespace",
          normalized.name,
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete a namespace and all resources within it",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        await coreApi.deleteNamespace({ name: args.namespaceName });

        context.logger.info("Deleted namespace {name}", {
          name: args.namespaceName,
        });
        return { dataHandles: [] };
      },
    },

    update: {
      description:
        "Merge new labels and/or annotations onto a namespace via read-then-replace",
      arguments: UpdateArgsSchema,
      execute: async (
        args: z.infer<typeof UpdateArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        // Read current state, merge in changes, replace
        const current = await coreApi.readNamespace({
          name: args.namespaceName,
        });
        const meta = current.metadata || {};

        if (args.labels) {
          meta.labels = { ...(meta.labels || {}), ...args.labels };
        }
        if (args.annotations) {
          meta.annotations = {
            ...(meta.annotations || {}),
            ...args.annotations,
          };
        }
        current.metadata = meta;

        const replaced = await coreApi.replaceNamespace({
          name: args.namespaceName,
          body: current,
        });
        const normalized = normalizeNamespace(replaced);

        context.logger.info("Updated namespace {name}", {
          name: args.namespaceName,
        });

        const handle = await context.writeResource(
          "namespace",
          normalized.name,
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    // --- Resource Quotas ---

    getResourceQuotas: {
      description:
        "List all resource quotas in a namespace showing hard limits and current usage",
      arguments: GetResourceQuotasArgsSchema,
      execute: async (
        args: z.infer<typeof GetResourceQuotasArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const resp = await coreApi.listNamespacedResourceQuota({
          namespace: args.namespaceName,
        });
        const quotas = resp.items || [];

        context.logger.info("Found {count} resource quotas in {ns}", {
          count: quotas.length,
          ns: args.namespaceName,
        });

        const handles: DataHandle[] = [];
        for (const q of quotas) {
          const normalized = normalizeResourceQuota(q);
          const handle = await context.writeResource(
            "resourceQuota",
            `${args.namespaceName}-${normalized.name}`,
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    setResourceQuota: {
      description:
        "Create or replace a resource quota with the given hard limits (pods, cpu, memory, etc.)",
      arguments: SetResourceQuotaArgsSchema,
      execute: async (
        args: z.infer<typeof SetResourceQuotaArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const body = {
          metadata: {
            name: args.quotaName,
            namespace: args.namespaceName,
          },
          spec: { hard: args.hard },
        };

        let result;
        let exists = true;
        try {
          await coreApi.readNamespacedResourceQuota({
            name: args.quotaName,
            namespace: args.namespaceName,
          });
        } catch (err: unknown) {
          if (
            err instanceof Error && "statusCode" in err &&
            (err as { statusCode: number }).statusCode === 404
          ) {
            exists = false;
          } else {
            throw err;
          }
        }

        if (exists) {
          result = await coreApi.replaceNamespacedResourceQuota({
            name: args.quotaName,
            namespace: args.namespaceName,
            body,
          });
          context.logger.info("Replaced resource quota {name} in {ns}", {
            name: args.quotaName,
            ns: args.namespaceName,
          });
        } else {
          result = await coreApi.createNamespacedResourceQuota({
            namespace: args.namespaceName,
            body,
          });
          context.logger.info("Created resource quota {name} in {ns}", {
            name: args.quotaName,
            ns: args.namespaceName,
          });
        }

        const normalized = normalizeResourceQuota(result);
        const handle = await context.writeResource(
          "resourceQuota",
          `${args.namespaceName}-${normalized.name}`,
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    deleteResourceQuota: {
      description: "Delete a resource quota from a namespace",
      arguments: DeleteResourceQuotaArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteResourceQuotaArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        await coreApi.deleteNamespacedResourceQuota({
          name: args.quotaName,
          namespace: args.namespaceName,
        });

        context.logger.info("Deleted resource quota {name} from {ns}", {
          name: args.quotaName,
          ns: args.namespaceName,
        });
        return { dataHandles: [] };
      },
    },

    // --- Limit Ranges ---

    getLimitRanges: {
      description:
        "List all limit ranges in a namespace showing default, min, and max resource constraints",
      arguments: GetLimitRangesArgsSchema,
      execute: async (
        args: z.infer<typeof GetLimitRangesArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const resp = await coreApi.listNamespacedLimitRange({
          namespace: args.namespaceName,
        });
        const ranges = resp.items || [];

        context.logger.info("Found {count} limit ranges in {ns}", {
          count: ranges.length,
          ns: args.namespaceName,
        });

        const handles: DataHandle[] = [];
        for (const lr of ranges) {
          const normalized = normalizeLimitRange(lr);
          const handle = await context.writeResource(
            "limitRange",
            `${args.namespaceName}-${normalized.name}`,
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    setLimitRange: {
      description:
        "Create or replace a limit range defining default, min, and max resource constraints per container type",
      arguments: SetLimitRangeArgsSchema,
      execute: async (
        args: z.infer<typeof SetLimitRangeArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        const body = {
          metadata: {
            name: args.limitRangeName,
            namespace: args.namespaceName,
          },
          spec: { limits: args.limits },
        };

        let result;
        let exists = true;
        try {
          await coreApi.readNamespacedLimitRange({
            name: args.limitRangeName,
            namespace: args.namespaceName,
          });
        } catch (err: unknown) {
          if (
            err instanceof Error && "statusCode" in err &&
            (err as { statusCode: number }).statusCode === 404
          ) {
            exists = false;
          } else {
            throw err;
          }
        }

        if (exists) {
          result = await coreApi.replaceNamespacedLimitRange({
            name: args.limitRangeName,
            namespace: args.namespaceName,
            body,
          });
          context.logger.info("Replaced limit range {name} in {ns}", {
            name: args.limitRangeName,
            ns: args.namespaceName,
          });
        } else {
          result = await coreApi.createNamespacedLimitRange({
            namespace: args.namespaceName,
            body,
          });
          context.logger.info("Created limit range {name} in {ns}", {
            name: args.limitRangeName,
            ns: args.namespaceName,
          });
        }

        const normalized = normalizeLimitRange(result);
        const handle = await context.writeResource(
          "limitRange",
          `${args.namespaceName}-${normalized.name}`,
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    deleteLimitRange: {
      description: "Delete a limit range from a namespace",
      arguments: DeleteLimitRangeArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteLimitRangeArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi } = buildClient(toK8sGlobalArgs(context.globalArgs));

        await coreApi.deleteNamespacedLimitRange({
          name: args.limitRangeName,
          namespace: args.namespaceName,
        });

        context.logger.info("Deleted limit range {name} from {ns}", {
          name: args.limitRangeName,
          ns: args.namespaceName,
        });
        return { dataHandles: [] };
      },
    },

    // --- Resource Counts ---

    getResourceCounts: {
      description:
        "Count pods, services, deployments, configmaps, secrets, service accounts, and PVCs in a namespace via parallel API calls",
      arguments: GetResourceCountsArgsSchema,
      execute: async (
        args: z.infer<typeof GetResourceCountsArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi, appsApi } = buildClient(
          toK8sGlobalArgs(context.globalArgs),
        );
        const ns = args.namespaceName;

        // Run all counts in parallel
        const [
          pods,
          services,
          deployments,
          configmaps,
          secrets,
          serviceaccounts,
          pvcs,
        ] = await Promise.all([
          coreApi.listNamespacedPod({ namespace: ns }).then((r) =>
            r.items?.length || 0
          ),
          coreApi.listNamespacedService({ namespace: ns }).then((r) =>
            r.items?.length || 0
          ),
          appsApi.listNamespacedDeployment({ namespace: ns }).then((r) =>
            r.items?.length || 0
          ),
          coreApi.listNamespacedConfigMap({ namespace: ns }).then((r) =>
            r.items?.length || 0
          ),
          coreApi.listNamespacedSecret({ namespace: ns }).then((r) =>
            r.items?.length || 0
          ),
          coreApi.listNamespacedServiceAccount({ namespace: ns }).then((r) =>
            r.items?.length || 0
          ),
          coreApi.listNamespacedPersistentVolumeClaim({ namespace: ns }).then((
            r,
          ) => r.items?.length || 0),
        ]);

        const counts = {
          namespace: ns,
          pods,
          services,
          deployments,
          configmaps,
          secrets,
          serviceaccounts,
          persistentvolumeclaims: pvcs,
          collectedAt: new Date().toISOString(),
        };

        context.logger.info(
          "Resource counts for {ns}: {pods} pods, {svc} services, {dep} deployments",
          { ns, pods, svc: services, dep: deployments },
        );

        const handle = await context.writeResource(
          "resourceCounts",
          ns,
          counts,
        );
        return { dataHandles: [handle] };
      },
    },

    // --- Aggregated Health ---

    health: {
      description:
        "Single-call health aggregator. Returns {healthy: bool} plus per-resource breakdown for deployments, pods, services, and Warning events. Use this instead of fanning out across deployment/pod/service/event models when you just need to know whether a namespace is healthy.",
      arguments: HealthArgsSchema,
      execute: async (
        args: z.infer<typeof HealthArgsSchema>,
        context: NamespaceContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { coreApi, appsApi } = buildClient(
          toK8sGlobalArgs(context.globalArgs),
        );
        const ns = args.namespaceName;

        const [deployResp, podResp, svcResp, warnResp] = await Promise.all([
          appsApi.listNamespacedDeployment({ namespace: ns }),
          coreApi.listNamespacedPod({ namespace: ns }),
          coreApi.listNamespacedService({ namespace: ns }),
          coreApi.listNamespacedEvent({
            namespace: ns,
            fieldSelector: "type=Warning",
          }),
        ]);

        const deployments = (deployResp.items || []).map((d) => {
          const replicas = d.spec?.replicas ?? 0;
          const ready = d.status?.readyReplicas ?? 0;
          return {
            name: d.metadata?.name || "",
            replicas,
            readyReplicas: ready,
            ready: replicas > 0 && replicas === ready,
          };
        });

        const allPods = podResp.items || [];
        const healthyPhases = new Set(["Running", "Succeeded"]);
        const pods = allPods.map((p) => ({
          name: p.metadata?.name || "",
          phase: p.status?.phase || "Unknown",
          running: healthyPhases.has(p.status?.phase || ""),
        }));

        const services = (svcResp.items || []).map((svc) => {
          const sel = svc.spec?.selector || {};
          const ports = svc.spec?.ports || [];
          const selKeys = Object.keys(sel);
          const name = svc.metadata?.name || "";

          if (selKeys.length === 0) {
            return {
              name,
              selector: sel,
              matchedPodCount: 0,
              healthy: true,
              reason: "no selector (headless or external)",
            };
          }

          const matched = allPods.filter((p) => {
            const lbl = p.metadata?.labels || {};
            return selKeys.every((k) => lbl[k] === sel[k]);
          });

          if (matched.length === 0) {
            return {
              name,
              selector: sel,
              matchedPodCount: 0,
              healthy: false,
              reason: "selector matches no pods",
            };
          }

          const portsWithoutListeners = ports.filter((sp) => {
            const target = String(sp.targetPort || sp.port);
            const targetNum = parseInt(target, 10);
            return !matched.some((p) =>
              (p.spec?.containers || []).some((c) =>
                (c.ports || []).some((pc) =>
                  pc.containerPort === targetNum ||
                  String(pc.containerPort) === target
                )
              )
            );
          });

          if (portsWithoutListeners.length > 0) {
            const missing = portsWithoutListeners
              .map((p) => p.targetPort || p.port)
              .join(",");
            return {
              name,
              selector: sel,
              matchedPodCount: matched.length,
              healthy: false,
              reason: `no pod listens on targetPort(s): ${missing}`,
            };
          }

          return {
            name,
            selector: sel,
            matchedPodCount: matched.length,
            healthy: true,
            reason: "ok",
          };
        });

        const warnings = (warnResp.items || []).map((e) => ({
          name: e.metadata?.name || "",
          reason: e.reason || "",
          message: e.message || "",
          involvedObject: `${e.involvedObject?.kind || ""}/${
            e.involvedObject?.name || ""
          }`,
        }));

        const summary = {
          deploymentsReady: deployments.filter((d) => d.ready).length,
          deploymentsTotal: deployments.length,
          podsRunning: pods.filter((p) => p.running).length,
          podsTotal: pods.length,
          servicesHealthy: services.filter((s) => s.healthy).length,
          servicesTotal: services.length,
          warningCount: warnings.length,
        };

        const healthy = summary.deploymentsReady === summary.deploymentsTotal &&
          summary.podsRunning === summary.podsTotal &&
          summary.servicesHealthy === summary.servicesTotal &&
          summary.warningCount === 0;

        const health = {
          namespace: ns,
          healthy,
          summary,
          deployments,
          pods,
          services,
          warnings,
          collectedAt: new Date().toISOString(),
        };

        context.logger.info(
          "Health for {ns}: healthy={healthy} ({dr}/{dt} deps ready, {pr}/{pt} pods running, {sh}/{st} svcs healthy, {wc} warnings)",
          {
            ns,
            healthy,
            dr: summary.deploymentsReady,
            dt: summary.deploymentsTotal,
            pr: summary.podsRunning,
            pt: summary.podsTotal,
            sh: summary.servicesHealthy,
            st: summary.servicesTotal,
            wc: summary.warningCount,
          },
        );

        const handle = await context.writeResource(
          "namespaceHealth",
          ns,
          health,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
