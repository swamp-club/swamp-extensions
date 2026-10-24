import { z } from "npm:zod@4.6.7";
import type {
  V1Container,
  V1StatefulSet,
  V1Volume,
} from "npm:@kubernetes/client-node@1.4.0";
import {
  buildClient,
  type DataHandle,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  sanitizeInstanceName,
} from "./_lib/helpers.ts";

// --- Schemas ---

const ContainerSchema = z.object({
  name: z.string(),
  image: z.string(),
  ports: z.array(z.object({
    containerPort: z.number(),
    protocol: z.string(),
  })),
  env: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })),
  requestsCpu: z.string(),
  requestsMemory: z.string(),
  limitsCpu: z.string(),
  limitsMemory: z.string(),
  volumeMounts: z.array(z.object({
    name: z.string(),
    mountPath: z.string(),
    readOnly: z.boolean(),
  })),
  runAsNonRoot: z.boolean(),
  readOnlyRootFilesystem: z.boolean(),
  runAsUser: z.number(),
});

const VolumeSchema = z.object({
  name: z.string(),
  kind: z.string(),
  source: z.string(),
});

const VolumeClaimTemplateSchema = z.object({
  name: z.string(),
  storageClassName: z.string(),
  accessModes: z.array(z.string()),
  requestedStorage: z.string(),
});

const StatefulSetSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  replicas: z.number(),
  readyReplicas: z.number(),
  currentReplicas: z.number(),
  updatedReplicas: z.number(),
  availableReplicas: z.number(),
  serviceName: z.string(),
  podManagementPolicy: z.string(),
  updateStrategyType: z.string(),
  updateStrategyPartition: z.number(),
  currentRevision: z.string(),
  updateRevision: z.string(),
  collisionCount: z.number(),
  conditions: z.array(z.object({
    type: z.string(),
    status: z.string(),
    reason: z.string(),
    message: z.string(),
    lastTransitionTime: z.string(),
  })),
  containers: z.array(ContainerSchema),
  volumes: z.array(VolumeSchema),
  volumeClaimTemplates: z.array(VolumeClaimTemplateSchema),
  podTemplateLabels: z.record(z.string(), z.string()),
  selector: z.record(z.string(), z.string()),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({ namespace: z.string().optional() });
const GetArgsSchema = z.object({
  statefulSetName: z.string(),
  namespace: z.string().optional(),
});
const ScaleArgsSchema = z.object({
  statefulSetName: z.string(),
  replicas: z.number(),
  namespace: z.string().optional(),
});
const DeleteArgsSchema = z.object({
  statefulSetName: z.string(),
  namespace: z.string().optional(),
});
const RestartArgsSchema = z.object({
  statefulSetName: z.string(),
  namespace: z.string().optional(),
});

// --- Helpers ---

function normalizeVolume(vol: V1Volume) {
  if (vol.configMap) {
    return {
      name: vol.name,
      kind: "configMap",
      source: vol.configMap.name || "",
    };
  }
  if (vol.secret) {
    return {
      name: vol.name,
      kind: "secret",
      source: vol.secret.secretName || "",
    };
  }
  if (vol.emptyDir) return { name: vol.name, kind: "emptyDir", source: "" };
  if (vol.persistentVolumeClaim) {
    return {
      name: vol.name,
      kind: "pvc",
      source: vol.persistentVolumeClaim.claimName || "",
    };
  }
  if (vol.hostPath) {
    return {
      name: vol.name,
      kind: "hostPath",
      source: vol.hostPath.path || "",
    };
  }
  return { name: vol.name, kind: "unknown", source: "" };
}

function normalizeContainer(c: V1Container) {
  return {
    name: c.name || "",
    image: c.image || "",
    ports: (c.ports || []).map((p) => ({
      containerPort: p.containerPort || 0,
      protocol: p.protocol || "TCP",
    })),
    env: (c.env || []).map((e) => ({
      name: e.name || "",
      value: e.value || (e.valueFrom ? JSON.stringify(e.valueFrom) : ""),
    })),
    requestsCpu: c.resources?.requests?.["cpu"] as string || "",
    requestsMemory: c.resources?.requests?.["memory"] as string || "",
    limitsCpu: c.resources?.limits?.["cpu"] as string || "",
    limitsMemory: c.resources?.limits?.["memory"] as string || "",
    volumeMounts: (c.volumeMounts || []).map((vm) => ({
      name: vm.name || "",
      mountPath: vm.mountPath || "",
      readOnly: vm.readOnly || false,
    })),
    runAsNonRoot: c.securityContext?.runAsNonRoot || false,
    readOnlyRootFilesystem: c.securityContext?.readOnlyRootFilesystem || false,
    runAsUser: c.securityContext?.runAsUser ?? -1,
  };
}

function normalizeStatefulSet(raw: V1StatefulSet) {
  const meta = normalizeMeta(raw);

  const volumeClaimTemplates = (raw.spec?.volumeClaimTemplates || []).map(
    (pvc) => ({
      name: pvc.metadata?.name || "",
      storageClassName: pvc.spec?.storageClassName || "",
      accessModes: pvc.spec?.accessModes || [],
      requestedStorage:
        (pvc.spec?.resources?.requests?.["storage"] as string) ||
        "",
    }),
  );

  return {
    ...meta,
    replicas: raw.spec?.replicas ?? 0,
    readyReplicas: raw.status?.readyReplicas ?? 0,
    currentReplicas: raw.status?.currentReplicas ?? 0,
    updatedReplicas: raw.status?.updatedReplicas ?? 0,
    availableReplicas: raw.status?.availableReplicas ?? 0,
    serviceName: raw.spec?.serviceName || "",
    podManagementPolicy: raw.spec?.podManagementPolicy || "OrderedReady",
    updateStrategyType: raw.spec?.updateStrategy?.type || "RollingUpdate",
    updateStrategyPartition:
      raw.spec?.updateStrategy?.rollingUpdate?.partition ?? 0,
    currentRevision: raw.status?.currentRevision || "",
    updateRevision: raw.status?.updateRevision || "",
    collisionCount: raw.status?.collisionCount ?? 0,
    conditions: (raw.status?.conditions || []).map((c) => ({
      type: c.type || "",
      status: c.status || "",
      reason: c.reason || "",
      message: c.message || "",
      lastTransitionTime: c.lastTransitionTime
        ? new Date(c.lastTransitionTime).toISOString()
        : "",
    })),
    containers: (raw.spec?.template?.spec?.containers || []).map(
      normalizeContainer,
    ),
    volumes: (raw.spec?.template?.spec?.volumes || []).map(normalizeVolume),
    volumeClaimTemplates,
    podTemplateLabels: raw.spec?.template?.metadata?.labels || {},
    selector: raw.spec?.selector?.matchLabels || {},
  };
}

// --- Model ---

export const model = {
  type: "@swamp/kubernetes/statefulset",
  version: "2026.08.01.1",
  globalArguments: K8sGlobalArgsSchema,
  upgrades: [],
  resources: {
    statefulSet: {
      description:
        "StatefulSet spec with replicas, update strategy, pod management policy, volume claim templates, containers, and volumes",
      schema: StatefulSetSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    list: {
      description:
        "List all StatefulSets in the configured namespace with replicas, update strategy, volume claim templates, and conditions",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await appsApi.listNamespacedStatefulSet({
          namespace: ns,
          labelSelector: labels,
        });
        const statefulSets = resp.items || [];

        context.logger.info("Found {count} StatefulSets in {ns}", {
          count: statefulSets.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const sts of statefulSets) {
          const normalized = normalizeStatefulSet(sts);
          const handle = await context.writeResource(
            "statefulSet",
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
        "Get a StatefulSet's full spec including containers, volumes, volume claim templates, pod management policy, and update strategy",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const sts = await appsApi.readNamespacedStatefulSet({
          name: args.statefulSetName,
          namespace: ns,
        });
        const normalized = normalizeStatefulSet(sts);

        const handle = await context.writeResource(
          "statefulSet",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    scale: {
      description: "Scale a StatefulSet to the specified replica count",
      arguments: ScaleArgsSchema,
      execute: async (
        args: z.infer<typeof ScaleArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await appsApi.readNamespacedStatefulSet({
          name: args.statefulSetName,
          namespace: ns,
        });
        current.spec!.replicas = args.replicas;

        const replaced = await appsApi.replaceNamespacedStatefulSet({
          name: args.statefulSetName,
          namespace: ns,
          body: current,
        });
        const normalized = normalizeStatefulSet(replaced);

        context.logger.info(
          "Scaled StatefulSet {name} to {replicas} replicas",
          {
            name: args.statefulSetName,
            replicas: args.replicas,
          },
        );

        const handle = await context.writeResource(
          "statefulSet",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete a StatefulSet",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await appsApi.deleteNamespacedStatefulSet({
          name: args.statefulSetName,
          namespace: ns,
        });

        context.logger.info("Deleted StatefulSet {name} in {ns}", {
          name: args.statefulSetName,
          ns,
        });
        return { dataHandles: [] };
      },
    },

    restart: {
      description:
        "Trigger a rolling restart by setting the restartedAt annotation on the pod template",
      arguments: RestartArgsSchema,
      execute: async (
        args: z.infer<typeof RestartArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const current = await appsApi.readNamespacedStatefulSet({
          name: args.statefulSetName,
          namespace: ns,
        });

        if (!current.spec!.template!.metadata) {
          current.spec!.template!.metadata = {};
        }
        if (!current.spec!.template!.metadata.annotations) {
          current.spec!.template!.metadata.annotations = {};
        }
        current.spec!.template!.metadata
          .annotations!["kubectl.kubernetes.io/restartedAt"] = new Date()
            .toISOString();

        const replaced = await appsApi.replaceNamespacedStatefulSet({
          name: args.statefulSetName,
          namespace: ns,
          body: current,
        });
        const normalized = normalizeStatefulSet(replaced);

        context.logger.info(
          "Triggered rolling restart for StatefulSet {name}",
          {
            name: args.statefulSetName,
          },
        );

        const handle = await context.writeResource(
          "statefulSet",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
