import { z } from "npm:zod@4.6.7";
import type {
  V1Container,
  V1Deployment,
  V1LabelSelector,
  V1Pod,
  V1ReplicaSet,
  V1Volume,
} from "npm:@kubernetes/client-node@2.0.1";
import {
  buildClient,
  callForObject,
  type DataHandle,
  describeTarget,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  PatchFields,
  patchOptions,
  refinePatchArgs,
  retryOnConflict,
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

const DeploymentSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  replicas: z.number(),
  readyReplicas: z.number(),
  updatedReplicas: z.number(),
  availableReplicas: z.number(),
  strategyType: z.string(),
  maxUnavailable: z.string(),
  maxSurge: z.string(),
  conditions: z.array(z.object({
    type: z.string(),
    status: z.string(),
    reason: z.string(),
    message: z.string(),
    lastTransitionTime: z.string(),
  })),
  containers: z.array(ContainerSchema),
  volumes: z.array(VolumeSchema),
  podTemplateLabels: z.record(z.string(), z.string()),
  selector: z.record(z.string(), z.string()),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const ReplicaSetSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  replicas: z.number(),
  readyReplicas: z.number(),
  ownerDeployment: z.string(),
  revision: z.string(),
  labels: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListArgsSchema = z.object({ namespace: z.string().optional() });
const GetArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const CreateArgsSchema = z.object({
  deploymentName: z.string(),
  image: z.string().optional(),
  replicas: z.number().default(1),
  spec: z.record(z.string(), z.unknown()).optional(),
  namespace: z.string().optional(),
});
const UpdateArgsSchema = z.object({
  deploymentName: z.string(),
  image: z.string().optional(),
  replicas: z.number().optional(),
  namespace: z.string().optional(),
});
const DeleteArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const ScaleArgsSchema = z.object({
  deploymentName: z.string(),
  replicas: z.number(),
  namespace: z.string().optional(),
});
const RestartArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const PauseArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const ResumeArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const GetRolloutStatusArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});
const GetLogsArgsSchema = z.object({
  deploymentName: z.string(),
  container: z.string().optional().describe(
    "Container to read; defaults to the pod's " +
      "kubectl.kubernetes.io/default-container annotation, then its first " +
      "container",
  ),
  tailLines: z.number().int().min(1).default(100),
  previous: z.boolean().default(false).describe(
    "Read the previous (crashed) container instance's logs",
  ),
  namespace: z.string().optional(),
});
const GetReplicaSetsArgsSchema = z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
});

const PatchArgsSchema = refinePatchArgs(z.object({
  deploymentName: z.string(),
  namespace: z.string().optional(),
  ...PatchFields,
}));

// --- Helpers ---

const DEFAULT_CONTAINER_ANNOTATION = "kubectl.kubernetes.io/default-container";

/** Equality selector from a label map, as kubectl writes it: a=b,c=d. */
function labelSelector(labels: Record<string, string>): string {
  return Object.entries(labels).map(([k, v]) => `${k}=${v}`).join(",");
}

/**
 * A LabelSelector as a query string: matchLabels as k=v, matchExpressions as
 * `k in (a,b)`, `k notin (a,b)`, `k` and `!k`. Empty when it selects nothing.
 */
function selectorString(selector: V1LabelSelector | undefined): string {
  const terms = [
    labelSelector(selector?.matchLabels ?? {}),
    ...(selector?.matchExpressions ?? []).map((e) => {
      const values = (e.values ?? []).join(",");
      switch (e.operator) {
        case "In":
          return `${e.key} in (${values})`;
        case "NotIn":
          return `${e.key} notin (${values})`;
        case "Exists":
          return e.key;
        case "DoesNotExist":
          return `!${e.key}`;
        default:
          throw new Error(
            `Unsupported selector operator ${e.operator} on ${e.key}`,
          );
      }
    }),
  ];
  return terms.filter((t) => t !== "").join(",");
}

function isReady(pod: V1Pod): boolean {
  return (pod.status?.conditions ?? []).some((c) =>
    c.type === "Ready" && c.status === "True"
  );
}

/** Ready first, then Running (e.g. crash-looping), then Pending or Unknown. */
function podRank(pod: V1Pod): number {
  if (isReady(pod)) return 2;
  return pod.status?.phase === "Running" ? 1 : 0;
}

/**
 * The deployment's current pod among those still live: not terminating and
 * not finished (an evicted pod is Failed). Ranked by podRank, then newest.
 * Undefined when no pod qualifies.
 */
function pickCurrentPod(pods: V1Pod[]): V1Pod | undefined {
  const created = (p: V1Pod) =>
    p.metadata?.creationTimestamp
      ? new Date(p.metadata.creationTimestamp).getTime()
      : 0;
  return pods
    .filter((p) =>
      !p.metadata?.deletionTimestamp &&
      p.status?.phase !== "Failed" && p.status?.phase !== "Succeeded"
    )
    .sort((a, b) => podRank(b) - podRank(a) || created(b) - created(a))[0];
}

/** The uid of the object's controller (its managing owner), if any. */
function controllerUid(
  obj: {
    metadata?: {
      ownerReferences?: { controller?: boolean; uid: string }[];
    };
  },
): string | undefined {
  return obj.metadata?.ownerReferences?.find((r) => r.controller)?.uid;
}

/** kubectl's choice when no container is named. */
function defaultContainer(pod: V1Pod): string | undefined {
  return pod.metadata?.annotations?.[DEFAULT_CONTAINER_ANNOTATION] ??
    pod.spec?.containers[0]?.name;
}

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

function normalizeDeployment(raw: V1Deployment) {
  const meta = normalizeMeta(raw);

  return {
    ...meta,
    replicas: raw.spec?.replicas ?? 0,
    readyReplicas: raw.status?.readyReplicas ?? 0,
    updatedReplicas: raw.status?.updatedReplicas ?? 0,
    availableReplicas: raw.status?.availableReplicas ?? 0,
    strategyType: raw.spec?.strategy?.type || "RollingUpdate",
    maxUnavailable: String(
      raw.spec?.strategy?.rollingUpdate?.maxUnavailable ?? "25%",
    ),
    maxSurge: String(raw.spec?.strategy?.rollingUpdate?.maxSurge ?? "25%"),
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
    podTemplateLabels: raw.spec?.template?.metadata?.labels || {},
    selector: raw.spec?.selector?.matchLabels || {},
  };
}

function normalizeReplicaSet(raw: V1ReplicaSet) {
  const meta = normalizeMeta(raw);
  const ownerRefs = raw.metadata?.ownerReferences || [];
  const deployOwner = ownerRefs.find((o) => o.kind === "Deployment");

  return {
    ...meta,
    replicas: raw.status?.replicas ?? 0,
    readyReplicas: raw.status?.readyReplicas ?? 0,
    ownerDeployment: deployOwner?.name || "",
    revision: meta.annotations["deployment.kubernetes.io/revision"] || "",
  };
}

// --- Model ---

/** Kubernetes Deployment model. */
export const model = {
  type: "@swamp/kubernetes/deployment",
  version: "2026.11.10.1",
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
    {
      toVersion: "2026.06.04.2",
      description: "Version bump to publish missing upgrade entries from " +
        "2026.06.04.1. No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
      description: "Enrich TLS errors with cluster context and kubeconfig " +
        "guidance when certificate verification fails.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.10.1",
      description: "Version bump to republish with correct upgrade chain. " +
        "No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.01.1",
      description: "Bump @kubernetes/client-node from 1.0.0 to 1.4.0 and " +
        "add statefulset model type. No schema or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.07.1",
      description:
        "Add patch (merge, strategic merge or JSON patch) and getLogs (tail the logs of the deployment's current pod). " +
        "No change to global arguments or existing resources.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.10.1",
      description: "Bump @kubernetes/client-node from 1.4.0 to 2.0.1. A " +
        "kubeconfig tls-server-name may now be an IP address. " +
        "Read-modify-replace methods retry on 409 Conflict. No schema " +
        "change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    deployment: {
      description:
        "Deployment spec with replicas, strategy, containers, volumes, security contexts, and rollout conditions",
      schema: DeploymentSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    replicaSet: {
      description:
        "ReplicaSet showing replica counts, owner deployment, and revision number",
      schema: ReplicaSetSchema,
      lifetime: "1h",
      garbageCollection: 10,
    },
  },
  files: {
    logs: {
      description:
        "Raw container stdout/stderr logs of the deployment's current pod",
      contentType: "text/plain",
      lifetime: "7d",
      garbageCollection: 5,
      streaming: true,
    },
  },
  methods: {
    list: {
      description:
        "List all deployments in the configured namespace with replicas, strategy, containers, and conditions",
      arguments: ListArgsSchema,
      execute: async (
        args: z.infer<typeof ListArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await appsApi.listNamespacedDeployment({
          namespace: ns,
          labelSelector: labels,
        });
        const deployments = resp.items || [];

        context.logger.info("Found {count} deployments in {ns}", {
          count: deployments.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const dep of deployments) {
          const normalized = normalizeDeployment(dep);
          const handle = await context.writeResource(
            "deployment",
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
        "Get a deployment's full spec including containers, volumes, security contexts, and rollout conditions",
      arguments: GetArgsSchema,
      execute: async (
        args: z.infer<typeof GetArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const dep = await appsApi.readNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });
        const normalized = normalizeDeployment(dep);

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    create: {
      description:
        "Create a deployment from a container image or full spec object",
      arguments: CreateArgsSchema,
      execute: async (
        args: z.infer<typeof CreateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        let body;
        if (args.spec) {
          body = args.spec;
        } else if (args.image) {
          body = {
            metadata: { name: args.deploymentName, namespace: ns },
            spec: {
              replicas: args.replicas,
              selector: { matchLabels: { app: args.deploymentName } },
              template: {
                metadata: { labels: { app: args.deploymentName } },
                spec: {
                  containers: [{
                    name: args.deploymentName,
                    image: args.image,
                  }],
                },
              },
            },
          };
        } else {
          throw new Error("Either 'image' or 'spec' must be provided");
        }

        const created = await appsApi.createNamespacedDeployment({
          namespace: ns,
          body,
        });
        const normalized = normalizeDeployment(created);

        context.logger.info("Created deployment {name} in {ns}", {
          name: args.deploymentName,
          ns,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    update: {
      description:
        "Update a deployment's container image and/or replica count via read-then-replace",
      arguments: UpdateArgsSchema,
      execute: async (
        args: z.infer<typeof UpdateArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const replaced = await retryOnConflict(async () => {
          const current = await appsApi.readNamespacedDeployment({
            name: args.deploymentName,
            namespace: ns,
          });

          if (args.replicas !== undefined) {
            current.spec!.replicas = args.replicas;
          }
          if (
            args.image && current.spec!.template!.spec!.containers.length > 0
          ) {
            current.spec!.template!.spec!.containers[0].image = args.image;
          }

          return await appsApi.replaceNamespacedDeployment({
            name: args.deploymentName,
            namespace: ns,
            body: current,
          });
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Updated deployment {name} in {ns}", {
          name: args.deploymentName,
          ns,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    delete: {
      description: "Delete a deployment",
      arguments: DeleteArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await appsApi.deleteNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });

        context.logger.info("Deleted deployment {name} in {ns}", {
          name: args.deploymentName,
          ns,
        });
        return { dataHandles: [] };
      },
    },

    scale: {
      description: "Scale a deployment to the specified replica count",
      arguments: ScaleArgsSchema,
      execute: async (
        args: z.infer<typeof ScaleArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const replaced = await retryOnConflict(async () => {
          const current = await appsApi.readNamespacedDeployment({
            name: args.deploymentName,
            namespace: ns,
          });
          current.spec!.replicas = args.replicas;

          return await appsApi.replaceNamespacedDeployment({
            name: args.deploymentName,
            namespace: ns,
            body: current,
          });
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Scaled deployment {name} to {replicas} replicas", {
          name: args.deploymentName,
          replicas: args.replicas,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
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

        const replaced = await retryOnConflict(async () => {
          const current = await appsApi.readNamespacedDeployment({
            name: args.deploymentName,
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

          return await appsApi.replaceNamespacedDeployment({
            name: args.deploymentName,
            namespace: ns,
            body: current,
          });
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Triggered rolling restart for deployment {name}", {
          name: args.deploymentName,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    pause: {
      description: "Pause a deployment's rollout by setting spec.paused = true",
      arguments: PauseArgsSchema,
      execute: async (
        args: z.infer<typeof PauseArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const replaced = await retryOnConflict(async () => {
          const current = await appsApi.readNamespacedDeployment({
            name: args.deploymentName,
            namespace: ns,
          });
          current.spec!.paused = true;

          return await appsApi.replaceNamespacedDeployment({
            name: args.deploymentName,
            namespace: ns,
            body: current,
          });
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Paused deployment {name}", {
          name: args.deploymentName,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    resume: {
      description:
        "Resume a paused deployment's rollout by setting spec.paused = false",
      arguments: ResumeArgsSchema,
      execute: async (
        args: z.infer<typeof ResumeArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const replaced = await retryOnConflict(async () => {
          const current = await appsApi.readNamespacedDeployment({
            name: args.deploymentName,
            namespace: ns,
          });
          current.spec!.paused = false;

          return await appsApi.replaceNamespacedDeployment({
            name: args.deploymentName,
            namespace: ns,
            body: current,
          });
        });
        const normalized = normalizeDeployment(replaced);

        context.logger.info("Resumed deployment {name}", {
          name: args.deploymentName,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    getRolloutStatus: {
      description:
        "Get a deployment's rollout status with Available, Progressing, and ReplicaFailure conditions",
      arguments: GetRolloutStatusArgsSchema,
      execute: async (
        args: z.infer<typeof GetRolloutStatusArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const dep = await appsApi.readNamespacedDeployment({
          name: args.deploymentName,
          namespace: ns,
        });
        const normalized = normalizeDeployment(dep);

        context.logger.info("Rollout status for {name}: {conditions}", {
          name: args.deploymentName,
          conditions: normalized.conditions.map((c) => `${c.type}=${c.status}`)
            .join(", "),
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    getReplicaSets: {
      description:
        "List ReplicaSets owned by a deployment, showing rollout history and revisions",
      arguments: GetReplicaSetsArgsSchema,
      execute: async (
        args: z.infer<typeof GetReplicaSetsArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const resp = await appsApi.listNamespacedReplicaSet({ namespace: ns });
        const allRs = resp.items || [];

        // Filter to ReplicaSets owned by this deployment
        const owned = allRs.filter((rs) => {
          const owners = rs.metadata?.ownerReferences || [];
          return owners.some((o) =>
            o.kind === "Deployment" && o.name === args.deploymentName
          );
        });

        context.logger.info("Found {count} ReplicaSets for deployment {name}", {
          count: owned.length,
          name: args.deploymentName,
        });

        const handles: DataHandle[] = [];
        for (const rs of owned) {
          const normalized = normalizeReplicaSet(rs);
          const handle = await context.writeResource(
            "replicaSet",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    getLogs: {
      description:
        "Tail the logs of the deployment's current pod, found from its pod " +
        "template labels: Ready pods first, then the newest",
      arguments: GetLogsArgsSchema,
      execute: async (
        args: z.infer<typeof GetLogsArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi, coreApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const target = describeTarget("Deployment", args.deploymentName, ns);

        const dep = await callForObject(
          "Reading",
          target,
          () =>
            appsApi.readNamespacedDeployment({
              name: args.deploymentName,
              namespace: ns,
            }),
        );
        const templateLabels = dep.spec?.template?.metadata?.labels ?? {};
        const selector = Object.keys(templateLabels).length > 0
          ? labelSelector(templateLabels)
          : selectorString(dep.spec?.selector);
        if (selector === "") {
          throw new Error(
            `${target} has no pod template labels or selector to find its ` +
              "pods by",
          );
        }

        const pods = await callForObject(
          `Listing pods matching ${selector} for`,
          target,
          () =>
            coreApi.listNamespacedPod({
              namespace: ns,
              labelSelector: selector,
            }),
        );
        // Labels can overlap another workload's (a canary sharing app=web),
        // so keep only pods of a ReplicaSet this Deployment controls.
        const replicaSets = await callForObject(
          `Listing ReplicaSets matching ${selector} for`,
          target,
          () =>
            appsApi.listNamespacedReplicaSet({
              namespace: ns,
              labelSelector: selector,
            }),
        );
        const ownedReplicaSets = new Set(
          (replicaSets.items ?? [])
            .filter((rs) => controllerUid(rs) === dep.metadata?.uid)
            .map((rs) => rs.metadata?.uid),
        );
        const owned = (pods.items ?? []).filter((p) =>
          ownedReplicaSets.has(controllerUid(p))
        );
        const pod = pickCurrentPod(owned);
        if (!pod) {
          throw new Error(
            `${target} has no pods of its own ReplicaSets matching ` +
              `${selector} that are not terminating or finished`,
          );
        }
        const podName = pod.metadata?.name ?? "";
        const container = args.container ?? defaultContainer(pod);

        const resp = await callForObject(
          `Reading logs${container ? ` of container "${container}"` : ""} of`,
          describeTarget("Pod", podName, ns),
          () =>
            coreApi.readNamespacedPodLog({
              name: podName,
              namespace: ns,
              container,
              tailLines: args.tailLines,
              previous: args.previous,
            }),
        );
        const logText = typeof resp === "string" ? resp : String(resp);

        context.logger.info(
          "Read logs of deployment {name} from pod {pod} container {container}",
          { name: args.deploymentName, pod: podName, container },
        );

        const writer = context.createFileWriter(
          "logs",
          // "_" cannot occur in a namespace, Deployment or container name.
          sanitizeInstanceName(
            `${ns}_${args.deploymentName}${container ? `_${container}` : ""}`,
          ),
        );
        const handle = await writer.writeText(logText);
        return { dataHandles: [handle] };
      },
    },

    patch: {
      description:
        "Patch a Deployment in place with a merge, strategic merge or JSON " +
        "patch, without replacing the whole object",
      arguments: PatchArgsSchema,
      execute: async (
        args: z.infer<typeof PatchArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { appsApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const patched = await callForObject(
          "Patching",
          describeTarget("Deployment", args.deploymentName, ns),
          () =>
            appsApi.patchNamespacedDeployment({
              name: args.deploymentName,
              namespace: ns,
              body: args.patch,
            }, patchOptions(args.patchType)),
        );
        const normalized = normalizeDeployment(patched);

        context.logger.info("Patched Deployment {name} in {ns} ({type})", {
          name: args.deploymentName,
          ns,
          type: args.patchType,
        });

        const handle = await context.writeResource(
          "deployment",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
