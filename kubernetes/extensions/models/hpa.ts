import { z } from "npm:zod@4.3.6";
import type {
  V2HorizontalPodAutoscaler,
  V2MetricSpec,
  V2MetricStatus,
} from "npm:@kubernetes/client-node@1.0.0";
import {
  buildClient,
  type DataHandle,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  sanitizeInstanceName,
} from "./_lib/helpers.ts";

// --- Schemas ---

const HpaSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  scaleTargetRef: z.string(),
  minReplicas: z.number(),
  maxReplicas: z.number(),
  currentReplicas: z.number(),
  desiredReplicas: z.number(),
  metrics: z.array(z.object({
    type: z.string(),
    name: z.string(),
    currentValue: z.string(),
    targetValue: z.string(),
  })),
  conditions: z.array(z.object({
    type: z.string(),
    status: z.string(),
    reason: z.string(),
    message: z.string(),
    lastTransitionTime: z.string(),
  })),
  lastScaleTime: z.string(),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({ namespace: z.string().optional() });
const GetArgsSchema = z.object({
  hpaName: z.string(),
  namespace: z.string().optional(),
});
const CreateArgsSchema = z.object({
  hpaName: z.string(),
  targetDeployment: z.string(),
  minReplicas: z.number().default(1),
  maxReplicas: z.number(),
  cpuTargetPercent: z.number().default(80),
  namespace: z.string().optional(),
});
const DeleteArgsSchema = z.object({
  hpaName: z.string(),
  namespace: z.string().optional(),
});

// --- Helpers ---

function normalizeMetricStatus(metric: V2MetricStatus) {
  const type = metric.type || "Unknown";
  let name = "";
  let currentValue = "";

  if (type === "Resource") {
    name = metric.resource?.name || "";
    currentValue = metric.resource?.current?.averageUtilization != null
      ? `${metric.resource.current.averageUtilization}%`
      : metric.resource?.current?.averageValue || "";
  } else if (type === "Pods") {
    name = metric.pods?.metric?.name || "";
    currentValue = metric.pods?.current?.averageValue || "";
  } else if (type === "Object") {
    name = metric.object?.metric?.name || "";
    currentValue = metric.object?.current?.value || "";
  } else if (type === "External") {
    name = metric.external?.metric?.name || "";
    currentValue = metric.external?.current?.value ||
      metric.external?.current?.averageValue || "";
  }

  return { type, name, currentValue, targetValue: "" };
}

function normalizeMetricSpec(spec: V2MetricSpec) {
  const type = spec.type || "Unknown";
  let name = "";
  let targetValue = "";

  if (type === "Resource") {
    name = spec.resource?.name || "";
    targetValue = spec.resource?.target?.averageUtilization != null
      ? `${spec.resource.target.averageUtilization}%`
      : spec.resource?.target?.averageValue || spec.resource?.target?.value ||
        "";
  } else if (type === "Pods") {
    name = spec.pods?.metric?.name || "";
    targetValue = spec.pods?.target?.averageValue || "";
  } else if (type === "Object") {
    name = spec.object?.metric?.name || "";
    targetValue = spec.object?.target?.value ||
      spec.object?.target?.averageValue || "";
  } else if (type === "External") {
    name = spec.external?.metric?.name || "";
    targetValue = spec.external?.target?.value ||
      spec.external?.target?.averageValue || "";
  }

  return { type, name, targetValue };
}

function normalizeHpa(raw: V2HorizontalPodAutoscaler) {
  const meta = normalizeMeta(raw);

  // Merge spec metrics (targets) with status metrics (current values)
  const specMetrics = raw.spec?.metrics || [];
  const statusMetrics = raw.status?.currentMetrics || [];

  const metrics = specMetrics.map((sm) => {
    const specNorm = normalizeMetricSpec(sm);
    const matched = statusMetrics.find((st) => {
      const stNorm = normalizeMetricStatus(st);
      return stNorm.type === specNorm.type && stNorm.name === specNorm.name;
    });
    const statusNorm = matched
      ? normalizeMetricStatus(matched)
      : { currentValue: "" };
    return {
      type: specNorm.type,
      name: specNorm.name,
      currentValue: statusNorm.currentValue || "",
      targetValue: specNorm.targetValue,
    };
  });

  return {
    ...meta,
    scaleTargetRef: `${raw.spec?.scaleTargetRef?.kind || ""}/${
      raw.spec?.scaleTargetRef?.name || ""
    }`,
    minReplicas: raw.spec?.minReplicas ?? 1,
    maxReplicas: raw.spec?.maxReplicas ?? 0,
    currentReplicas: raw.status?.currentReplicas ?? 0,
    desiredReplicas: raw.status?.desiredReplicas ?? 0,
    metrics,
    conditions: (raw.status?.conditions || []).map((c) => ({
      type: c.type || "",
      status: c.status || "",
      reason: c.reason || "",
      message: c.message || "",
      lastTransitionTime: c.lastTransitionTime
        ? new Date(c.lastTransitionTime).toISOString()
        : "",
    })),
    lastScaleTime: raw.status?.lastScaleTime
      ? new Date(raw.status.lastScaleTime).toISOString()
      : "",
  };
}

// --- Model ---

/** Kubernetes HorizontalPodAutoscaler model. */
export const model = {
  type: "@swamp/kubernetes/hpa",
  version: "2026.06.04.1",
  globalArguments: K8sGlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.05.27.2",
      description:
        "Version bump for extension-wide security fix in pod exec method",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "Copyright and branding update to Elder Swamp Club, Inc. " +
        "No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    hpa: {
      description:
        "HorizontalPodAutoscaler with current/target metrics, replica range, scale conditions, and last scale time",
      schema: HpaSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description:
        "List all HorizontalPodAutoscalers in the namespace with current vs target metrics and replica counts",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { autoscalingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await autoscalingApi.listNamespacedHorizontalPodAutoscaler(
          { namespace: ns, labelSelector: labels },
        );
        const hpas = resp.items || [];

        context.logger.info("Found {count} HPAs in {ns}", {
          count: hpas.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const hpa of hpas) {
          const normalized = normalizeHpa(hpa);
          const handle = await context.writeResource(
            "hpa",
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
        "Get an HPA's current vs target metrics, replica range, scale conditions, and last scale time",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { autoscalingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const hpa = await autoscalingApi.readNamespacedHorizontalPodAutoscaler({
          name: args.hpaName,
          namespace: ns,
        });
        const normalized = normalizeHpa(hpa);

        const handle = await context.writeResource(
          "hpa",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    create: {
      description:
        "Create an HPA targeting a deployment with CPU utilization threshold and replica range",
      arguments: CreateArgsSchema,
      execute: async (
        args: z.infer<typeof CreateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { autoscalingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const body = {
          metadata: { name: args.hpaName, namespace: ns },
          spec: {
            scaleTargetRef: {
              apiVersion: "apps/v1",
              kind: "Deployment",
              name: args.targetDeployment,
            },
            minReplicas: args.minReplicas,
            maxReplicas: args.maxReplicas,
            metrics: [{
              type: "Resource",
              resource: {
                name: "cpu",
                target: {
                  type: "Utilization",
                  averageUtilization: args.cpuTargetPercent,
                },
              },
            }],
          },
        };

        const created = await autoscalingApi
          .createNamespacedHorizontalPodAutoscaler({ namespace: ns, body });
        const normalized = normalizeHpa(created);

        context.logger.info("Created HPA {name} targeting {target} in {ns}", {
          name: args.hpaName,
          target: args.targetDeployment,
          ns,
        });

        const handle = await context.writeResource(
          "hpa",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete a HorizontalPodAutoscaler",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { autoscalingApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await autoscalingApi.deleteNamespacedHorizontalPodAutoscaler({
          name: args.hpaName,
          namespace: ns,
        });

        context.logger.info("Deleted HPA {name} in {ns}", {
          name: args.hpaName,
          ns,
        });
        return { dataHandles: [] };
      },
    },
  },
};
